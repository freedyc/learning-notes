import React, { useEffect } from 'react';
import Tile from './Tile';
import { useGameContext } from '../context/GameContext';
import { Position } from '../types/gameTypes';

const Board: React.FC = () => {
  const { 
    board, 
    selectedTile, 
    setSelectedTile, 
    swapTiles, 
    gameState,
    checkMatches,
    fillBoard 
  } = useGameContext();

  useEffect(() => {
    // Initial board setup
    fillBoard();
  }, []);

  useEffect(() => {
    // Check for matches after board changes
    if (gameState === 'playing') {
      const timer = setTimeout(() => {
        checkMatches();
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [board, gameState]);

  const handleTileClick = (position: Position) => {
    if (gameState !== 'playing') return;
    
    if (!selectedTile) {
      setSelectedTile(position);
    } else {
      // Check if clicked tile is adjacent to selected tile
      const rowDiff = Math.abs(selectedTile.row - position.row);
      const colDiff = Math.abs(selectedTile.col - position.col);
      
      if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
        swapTiles(selectedTile, position);
      }
      
      // Deselect tile
      setSelectedTile(null);
    }
  };

  return (
    <div 
      className="grid gap-1 bg-gray-800 bg-opacity-50 p-2 rounded-lg"
      style={{ 
        gridTemplateColumns: `repeat(${board[0]?.length || 0}, 1fr)`,
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((tile, colIndex) => (
          <Tile
            key={`${rowIndex}-${colIndex}`}
            type={tile}
            position={{ row: rowIndex, col: colIndex }}
            isSelected={selectedTile?.row === rowIndex && selectedTile?.col === colIndex}
            onClick={() => handleTileClick({ row: rowIndex, col: colIndex })}
          />
        ))
      )}
    </div>
  );
};

export default Board;