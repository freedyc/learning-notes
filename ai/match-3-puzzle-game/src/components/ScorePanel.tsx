import React from 'react';

interface ScorePanelProps {
  score: number;
  level: number;
  targetScore: number;
  movesLeft: number;
}

const ScorePanel: React.FC<ScorePanelProps> = ({ score, level, targetScore, movesLeft }) => {
  const progressPercentage = Math.min((score / targetScore) * 100, 100);

  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-lg p-3 text-white">
      <div className="flex justify-between mb-2">
        <div>
          <p className="text-xs opacity-80">LEVEL</p>
          <p className="text-xl font-bold">{level}</p>
        </div>
        <div>
          <p className="text-xs opacity-80">SCORE</p>
          <p className="text-xl font-bold">{score}</p>
        </div>
        <div>
          <p className="text-xs opacity-80">TARGET</p>
          <p className="text-xl font-bold">{targetScore}</p>
        </div>
        <div>
          <p className="text-xs opacity-80">MOVES</p>
          <p className="text-xl font-bold">{movesLeft}</p>
        </div>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ScorePanel;