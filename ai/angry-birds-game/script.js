// Matter.js module aliases
const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Composites = Matter.Composites,
      Common = Matter.Common,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      Composite = Matter.Composite,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Events = Matter.Events,
      Vector = Matter.Vector,
      Constraint = Matter.Constraint;

// Create engine
const engine = Engine.create();
const world = engine.world;

// Create renderer
const container = document.getElementById('game-container');
const render = Render.create({
    element: container,
    engine: engine,
    options: {
        width: container.clientWidth,
        height: container.clientHeight,
        wireframes: false,
        background: '#87CEEB',
        pixelRatio: window.devicePixelRatio // For sharper rendering on high DPI screens
    }
});

Render.run(render);

// Create runner
const runner = Runner.create();
Runner.run(runner, engine);

// Game variables
let bird;
let slingshot;
let isFiring = false;

// Add bodies
function init() {
    Composite.clear(world);
    engine.events = {}; // Clear events

    const width = render.options.width;
    const height = render.options.height;

    // Ground
    const ground = Bodies.rectangle(width / 2, height - 20, width, 40, { 
        isStatic: true,
        render: { fillStyle: '#2E8B57' }
    });
    
    // Platform for pigs
    const platformX = width * 0.75;
    const platformY = height - 150;
    const platform = Bodies.rectangle(platformX, platformY, 300, 20, { 
        isStatic: true,
        render: { fillStyle: '#8B4513' }
    });

    // Bird
    const birdX = width * 0.2;
    const birdY = height - 200;
    bird = Bodies.circle(birdX, birdY, 20, { 
        density: 0.004,
        render: { fillStyle: '#FF0000' }
    });

    // Slingshot (Constraint)
    const anchor = { x: birdX, y: birdY };
    slingshot = Constraint.create({
        pointA: anchor,
        bodyB: bird,
        stiffness: 0.05,
        damping: 0.03,
        length: 1, // Keep it tight initially
        render: {
            visible: true,
            strokeStyle: '#555',
            lineWidth: 5
        }
    });

    // Pyramid of boxes/pigs
    const boxSize = 40;
    const pyramid = Composites.pyramid(platformX - 100, platformY - 200, 5, 5, 0, 0, function(x, y) {
        // Randomly choose between a "pig" (green circle) or "wood" (brown rect)
        if (Math.random() > 0.7) {
            return Bodies.circle(x, y, boxSize / 2, {
                render: { fillStyle: '#32CD32' }, // Green pig
                label: 'pig' // Tag for collision logic if we wanted it
            });
        } else {
            return Bodies.rectangle(x, y, boxSize, boxSize, {
                render: { fillStyle: '#DEB887', strokeStyle: '#8B4513', lineWidth: 2 } // Wood box
            });
        }
    });

    Composite.add(world, [ground, platform, bird, slingshot, pyramid]);

    // Input handling
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: { visible: false }
        }
    });

    // Fix mouse offset for responsive canvas
    render.mouse = mouse;

    Composite.add(world, mouseConstraint);

    // Firing logic
    Events.on(mouseConstraint, 'enddrag', function(event) {
        if (event.body === bird) {
            isFiring = true;
        }
    });

    Events.on(engine, 'afterUpdate', function() {
        if (isFiring && bird.position.x > anchor.x + 20) {
            // Release the bird from the slingshot
            bird = null;
            Composite.remove(world, slingshot);
            slingshot = null;
            isFiring = false;

            // Optional: Respawn bird after a delay
            setTimeout(() => {
                // Check if all pigs are gone or just reset for fun
                 // In a real game, we'd check win condition here.
                 // For now, let's just create a new bird.
                 createNewBird(anchor);
            }, 3000);
        }
    });
}

function createNewBird(anchor) {
    if (bird) return; // Bird already exists

    bird = Bodies.circle(anchor.x, anchor.y, 20, { 
        density: 0.004,
        render: { fillStyle: '#FF0000' }
    });

    slingshot = Constraint.create({
        pointA: anchor,
        bodyB: bird,
        stiffness: 0.05,
        damping: 0.03,
        length: 1,
        render: {
            visible: true,
            strokeStyle: '#555',
            lineWidth: 5
        }
    });

    Composite.add(world, [bird, slingshot]);
}

// Handle window resize
window.addEventListener('resize', function() {
    render.canvas.width = container.clientWidth;
    render.canvas.height = container.clientHeight;
    render.options.width = container.clientWidth;
    render.options.height = container.clientHeight;
    
    // We might want to re-init the world or adjust bodies on resize, 
    // but for a simple clone, just ensuring canvas fits is good enough for now.
    // A full reload ensures positions are relative to new size.
    // location.reload(); 
    // Alternatively, just re-center the view or update ground.
    
    // For this demo, let's just update the ground position and size
    // Note: Better to write a proper resize handler that scales positions, but that's complex.
    // Simpler approach: reload page for new layout logic to run
    // location.reload();
});

// Start the game
init();
