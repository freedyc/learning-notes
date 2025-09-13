import React from 'react';
import { RefreshCw, Info, Volume2, VolumeX } from 'lucide-react';
import { useGameContext } from '../context/GameContext';

const GameControls: React.FC = () => {
  const { resetGame, gameState, soundEnabled, toggleSound } = useGameContext();
  
  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button 
        className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-full transition-colors"
        onClick={resetGame}
        title="Restart Game"
      >
        <RefreshCw size={20} />
      </button>
      
      <button 
        className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-colors"
        onClick={toggleSound}
        title={soundEnabled ? "Mute Sound" : "Enable Sound"}
      >
        {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
      
      <button 
        className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-colors"
        title="How to Play"
      >
        <Info size={20} />
      </button>
    </div>
  );
};

export default GameControls;