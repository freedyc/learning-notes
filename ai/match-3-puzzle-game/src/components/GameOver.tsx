import React from 'react';
import { Frown } from 'lucide-react';
import { useGameContext } from '../context/GameContext';

const GameOver: React.FC = () => {
  const { score, level, resetGame } = useGameContext();
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl text-white max-w-md w-full mx-4 shadow-2xl border border-gray-700 animate-fadeIn">
        <div className="flex justify-center mb-4">
          <div className="bg-red-500 p-4 rounded-full">
            <Frown size={40} className="text-red-900" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-2">Game Over</h2>
        <p className="text-center mb-6 text-gray-300">
          You reached level {level} with a final score of {score}.
        </p>
        
        <div className="flex justify-center">
          <button
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-8 rounded-full font-semibold shadow-lg transform transition hover:scale-105"
            onClick={resetGame}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;