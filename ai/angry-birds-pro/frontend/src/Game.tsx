import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

interface GameProps {
  onScoreUpdate: (score: number) => void;
  onLevelComplete: () => void;
  onGameOver: () => void;
  level: number;
}

const Game = ({ onScoreUpdate, onLevelComplete, onGameOver, level }: GameProps) => {
  const sceneRef = useRef<HTMLDivElement>(null);

  const gameState = useRef({
    birdsLeft: 3,
    pigsLeft: 0,
    isFired: false,
    isActive: true
  });

  useEffect(() => {
    const initTimeout = setTimeout(() => {
        if (!sceneRef.current) return;

        const { Engine, Render, Runner, Bodies, Composite, Constraint, MouseConstraint, Mouse, Events, Vector } = Matter;

        const engine = Engine.create();
        engine.gravity.y = 1.0;

        const width = sceneRef.current.clientWidth || window.innerWidth;
        const height = sceneRef.current.clientHeight || window.innerHeight;

        const render = Render.create({
          element: sceneRef.current,
          engine: engine,
          options: {
            width,
            height,
            wireframes: false,
            background: '#87CEEB'
          }
        });

        const BIRD_IMG = 'https://cdn-icons-png.flaticon.com/512/528/528076.png'; 
        const PIG_IMG = 'https://cdn-icons-png.flaticon.com/512/2632/2632839.png';

        // 1. World
        const ground = Bodies.rectangle(width / 2, height + 50, width * 2, 200, { 
            isStatic: true, 
            render: { fillStyle: '#2ecc71' }
        });

        const slingX = width * 0.2;
        const slingY = height - 150;

        // 2. DYNAMIC LEVEL GENERATOR
        const structure = [];
        gameState.current.pigsLeft = 0;

        const createPig = (x: number, y: number) => {
            gameState.current.pigsLeft++;
            return Bodies.circle(x, y, 22, {
                label: 'Pig',
                render: { 
                    fillStyle: '#4CAF50',
                    sprite: { texture: PIG_IMG, xScale: 0.09, yScale: 0.09 }
                },
                restitution: 0.2
            });
        };

        const createBlock = (x: number, y: number, w: number, h: number) => {
            return Bodies.rectangle(x, y, w, h, { 
                render: { fillStyle: '#d35400', strokeStyle: '#5D4037', lineWidth: 1 }, 
                label: 'Block',
                friction: 0.5 
            });
        };

        const buildLevel = (lvl: number) => {
            const startX = width * 0.75;
            const startY = height - 50;

            if (lvl === 1) {
                // House 1
                structure.push(createBlock(startX - 40, startY - 40, 20, 80));
                structure.push(createBlock(startX + 40, startY - 40, 20, 80));
                structure.push(createBlock(startX, startY - 90, 120, 20));
                structure.push(createPig(startX, startY - 30));
            } else if (lvl === 2) {
                // High Tower
                structure.push(createBlock(startX, startY - 40, 100, 20));
                structure.push(createBlock(startX - 30, startY - 100, 20, 100));
                structure.push(createBlock(startX + 30, startY - 100, 20, 100));
                structure.push(createBlock(startX, startY - 160, 100, 20));
                structure.push(createPig(startX, startY - 130));
            } else {
                // Castle/Pyramid for Level 3+
                const rows = Math.min(lvl, 5);
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < rows - i; j++) {
                        const x = startX + (j * 60) - ((rows - i) * 30);
                        const y = startY - (i * 60);
                        structure.push(createBlock(x, y, 50, 50));
                        if (i === rows - 1) structure.push(createPig(x, y - 50));
                    }
                }
            }
        };
        buildLevel(level);

        // 3. Bird
        const bird = Bodies.circle(slingX, slingY, 22, {
          density: 0.005,
          restitution: 0.5,
          label: 'Bird',
          render: { 
              fillStyle: '#f44336',
              sprite: { texture: BIRD_IMG, xScale: 0.09, yScale: 0.09 }
          }
        });

        const launcher = Constraint.create({
          pointA: { x: slingX, y: slingY },
          bodyB: bird,
          stiffness: 0.1,
          length: 1,
          render: { strokeStyle: '#3e2723', lineWidth: 5 }
        });

        Composite.add(engine.world, [ground, bird, launcher, ...structure]);

        // 4. Interaction
        const mouse = Mouse.create(render.canvas);
        const mConst = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: { stiffness: 0.1, render: { visible: false } }
        });
        Composite.add(engine.world, mConst);
        render.mouse = mouse;

        Events.on(mConst, 'enddrag', (event: any) => {
            if (event.body === bird && !gameState.current.isFired) {
                const dist = Vector.magnitude(Vector.sub(bird.position, { x: slingX, y: slingY }));
                if (dist > 30) {
                    gameState.current.isFired = true;
                    setTimeout(() => {
                        Composite.remove(engine.world, launcher);
                    }, 20);
                }
            }
        });

        Events.on(engine, 'collisionStart', (event) => {
          if (!gameState.current.isFired || !gameState.current.isActive) return;
          event.pairs.forEach((pair) => {
            const { bodyA, bodyB } = pair;
            [bodyA, bodyB].forEach(b => {
              if (b.label === 'Pig') {
                const impact = Math.max(bodyA.speed || 0, bodyB.speed || 0);
                if (impact > 4.0) {
                  Composite.remove(engine.world, b);
                  gameState.current.pigsLeft--;
                  onScoreUpdate(500);
                  if (gameState.current.pigsLeft <= 0) {
                      gameState.current.isActive = false;
                      setTimeout(onLevelComplete, 1200);
                  }
                }
              }
            });
          });
        });

        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

    }, 200);

    return () => clearTimeout(initTimeout);
  }, [level]);

  return (
    <div ref={sceneRef} style={{ width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#87CEEB' }} />
  );
};

export default Game;
