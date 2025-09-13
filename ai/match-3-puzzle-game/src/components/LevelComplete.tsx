import React from 'react';
import { Trophy } from 'lucide-react';
import { useGameContext } from '../context/GameContext';

const LevelComplete: React.FC = () => {
  const { score, level, startNextLevel } = useGameContext();
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-indigo-800 to-purple-900 p-8 rounded-xl text-white max-w-md w-full mx-4 shadow-2xl border border-purple-500 animate-fadeIn">
        <div className="flex justify-center mb-4">
          <div className="bg-yellow-500 p-4 rounded-full">
            <Trophy size={40} className="text-yellow-900" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-2">Level Complete!</h2>
        <p className="text-center mb-6 text-purple-200">
          You've completed level {level} with a score of {score}!
        </p>
        
        <div className="flex justify-center">
          <button
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 px-8 rounded-full font-semibold shadow-lg transform transition hover:scale-105"
            onClick={startNextLevel}
          >
            Next Level
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelComplete;