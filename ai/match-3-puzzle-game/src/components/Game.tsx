import React, { useEffect } from 'react';
import Board from './Board';
import ScorePanel from './ScorePanel';
import GameControls from './GameControls';
import LevelComplete from './LevelComplete';
import GameOver from './GameOver';
import { useGameContext } from '../context/GameContext';

const Game: React.FC = () => {
  const { gameState, score, level, targetScore, movesLeft, resetGame } = useGameContext();

  useEffect(() => {
    // Initialize game when component mounts
    resetGame();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden border border-white border-opacity-20">
      <div className="p-5">
        <h1 className="text-3xl font-bold text-center text-white mb-2">Match-3 Game</h1>
        <ScorePanel score={score} level={level} targetScore={targetScore} movesLeft={movesLeft} />
        
        <div className="my-4">
          <Board />
        </div>
        
        <GameControls />
        
        {gameState === 'levelComplete' && <LevelComplete />}
        {gameState === 'gameOver' && <GameOver />}
      </div>
    </div>
  );
};

export default Game;