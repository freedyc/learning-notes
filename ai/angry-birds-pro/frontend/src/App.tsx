import { useState, useEffect } from 'react';
import Game from './Game';
import { loadProgress, saveProgress, isBackendAvailable } from './api';

function App() {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState('playing'); // playing, won, lost
  const [gameKey, setGameKey] = useState(0); // Stable key for resetting game
  const [backendMode, setBackendMode] = useState(false); // false = pure frontend mode
  const [backendStatus, setBackendStatus] = useState<'checking' | 'available' | 'unavailable'>('checking');

  useEffect(() => {
    async function init() {
      // Check backend availability
      const hasBackend = await isBackendAvailable();
      setBackendStatus(hasBackend ? 'available' : 'unavailable');
      setBackendMode(hasBackend); // Auto-enable backend if available
      
      try {
        const data = await loadProgress(hasBackend);
        if (data) {
          setLevel(data.level || 1);
          setScore(data.score || 0);
        }
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    init();
  }, []);

  const handleScoreUpdate = (points: number) => {
    const newScore = score + points;
    setScore(newScore);
    saveProgress(level, newScore); 
  };

  const handleLevelComplete = () => {
      setGameState('won');
  };
  
  const handleGameOver = () => {
      setGameState('lost');
  };

  const nextLevel = () => {
    const nextLvl = level + 1;
    setLevel(nextLvl);
    setGameState('playing');
    setGameKey(prev => prev + 1); // Reset game
    saveProgress(nextLvl, score);
  };
  
  const restartLevel = () => {
      setGameState('playing');
      setGameKey(prev => prev + 1); // Reset game
  };

  const resetProgress = () => {
      if (confirm('Are you sure you want to reset to Level 1?')) {
          setLevel(1);
          setScore(0);
          setGameState('playing');
          setGameKey(prev => prev + 1); // Reset game
          saveProgress(1, 0, backendMode);
      }
  };

  const toggleBackendMode = () => {
      const newMode = !backendMode;
      setBackendMode(newMode);
      // Save current progress with new mode
      saveProgress(level, score, newMode);
  };

  if (loading) return <div style={{ color: 'white', padding: 20 }}>Loading Game...</div>;

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      
      {/* HUD */}
      <div style={{ 
        position: 'absolute', top: 0, left: 0, width: '100%', padding: '20px', 
        boxSizing: 'border-box', // Fix layout overflow
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, pointerEvents: 'none',
        color: 'white', textShadow: '2px 2px 4px black', fontSize: '24px', fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', pointerEvents: 'auto' }}>
            <span>Level {level}</span>
            <button onClick={resetProgress} style={resetBtnStyle}>Reset</button>
            <button onClick={toggleBackendMode} style={modeBtnStyle}>
                {backendMode ? '🌐 Backend Mode' : '💾 Local Mode'}
            </button>
            {backendStatus === 'checking' && <span style={statusStyle}>🔄 Checking...</span>}
            {backendStatus === 'available' && backendMode && <span style={statusStyle}>✅ Backend Connected</span>}
            {backendStatus === 'unavailable' && !backendMode && <span style={statusStyle}>✓ Local Only</span>}
        </div>
        <span style={{ marginRight: '20px' }}>Score: {score}</span>
      </div>

      {/* Game Overlay (Win/Loss) */}
      {gameState !== 'playing' && (
          <div style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              background: 'rgba(0,0,0,0.8)', zIndex: 20,
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
              color: 'white', fontFamily: 'Arial, sans-serif'
          }}>
              <h1 style={{ fontSize: '60px', marginBottom: '20px', textShadow: '0 0 10px gold' }}>
                  {gameState === 'won' ? 'LEVEL CLEARED! 🎉' : 'GAME OVER 😢'}
              </h1>
              <div style={{ display: 'flex', gap: '20px' }}>
                  {gameState === 'won' ? (
                      <button onClick={nextLevel} style={{ ...btnStyle, background: '#2ecc71' }}>Next Level ▶</button>
                  ) : (
                      <button onClick={restartLevel} style={{ ...btnStyle, background: '#e74c3c' }}>Restart ↺</button>
                  )}
              </div>
          </div>
      )}

      {/* Game Engine */}
      {/* Only recreate game when gameKey changes (manual reset or level change) */}
      {gameState === 'playing' && (
        <Game 
            key={gameKey} 
            level={level} 
            onScoreUpdate={handleScoreUpdate}
            onLevelComplete={handleLevelComplete}
            onGameOver={handleGameOver}
        />
      )}
      
    </div>
  );
}

const btnStyle = {
    padding: '15px 30px', 
    color: 'white', 
    border: 'none', 
    borderRadius: '8px', 
    fontSize: '24px', 
    cursor: 'pointer',
    pointerEvents: 'auto',
    fontWeight: 'bold',
    boxShadow: '0 4px 0 rgba(0,0,0,0.3)'
};

const resetBtnStyle = {
    padding: '5px 10px', 
    fontSize: '14px', 
    background: 'rgba(255,255,255,0.2)', 
    border: '1px solid white', 
    borderRadius: '4px', 
    color: 'white', 
    cursor: 'pointer',
    pointerEvents: 'auto',
    marginLeft: '10px'
};

const modeBtnStyle = {
    padding: '5px 10px', 
    fontSize: '12px', 
    background: 'rgba(52, 152, 219, 0.6)', 
    border: '1px solid rgba(255,255,255,0.5)', 
    borderRadius: '4px', 
    color: 'white', 
    cursor: 'pointer',
    pointerEvents: 'auto',
    marginLeft: '10px',
    fontWeight: 'normal'
};

const statusStyle = {
    fontSize: '12px',
    fontWeight: 'normal',
    opacity: 0.8,
    marginLeft: '10px'
};

export default App;
