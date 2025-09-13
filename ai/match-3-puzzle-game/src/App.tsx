import React from 'react';
import Game from './components/Game';
import { GameProvider } from './context/GameContext';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex items-center justify-center p-4">
      <GameProvider>
        <Game />
      </GameProvider>
    </div>
  );
}

export default App;