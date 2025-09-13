import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { TileType, Position, GameState } from '../types/gameTypes';
import { generateBoard, findMatches, applyGravity, generateNewTiles } from '../utils/gameLogic';

interface GameContextProps {
  board: TileType[][];
  score: number;
  level: number;
  targetScore: number;
  movesLeft: number;
  gameState: GameState;
  selectedTile: Position | null;
  soundEnabled: boolean;
  setSelectedTile: (position: Position | null) => void;
  swapTiles: (pos1: Position, pos2: Position) => void;
  checkMatches: () => void;
  fillBoard: () => void;
  resetGame: () => void;
  startNextLevel: () => void;
  toggleSound: () => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  // Board state
  const [board, setBoard] = useState<TileType[][]>([]);
  const [selectedTile, setSelectedTile] = useState<Position | null>(null);
  
  // Game state
  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [movesLeft, setMovesLeft] = useState(15);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Game constants
  const getBoardSize = useCallback(() => {
    return Math.min(6 + Math.floor(level / 3), 8); // Increase board size as level increases
  }, [level]);
  
  const getTargetScore = useCallback(() => {
    return level * 1000; // Increase target score with level
  }, [level]);
  
  const getMaxTileTypes = useCallback(() => {
    return Math.min(3 + Math.floor(level / 2), 5); // More tile types as level increases
  }, [level]);
  
  const targetScore = getTargetScore();
  
  // Game actions
  const fillBoard = useCallback(() => {
    const boardSize = getBoardSize();
    const maxTileTypes = getMaxTileTypes();
    
    const newBoard = generateBoard(boardSize, boardSize, maxTileTypes);
    setBoard(newBoard);
    setGameState('playing');
  }, [getBoardSize, getMaxTileTypes]);
  
  const swapTiles = useCallback((pos1: Position, pos2: Position) => {
    if (gameState !== 'playing' || movesLeft <= 0) return;
    
    setBoard(prevBoard => {
      const newBoard = JSON.parse(JSON.stringify(prevBoard));
      const temp = newBoard[pos1.row][pos1.col];
      newBoard[pos1.row][pos1.col] = newBoard[pos2.row][pos2.col];
      newBoard[pos2.row][pos2.col] = temp;
      return newBoard;
    });
    
    setMovesLeft(prev => prev - 1);
  }, [gameState, movesLeft]);
  
  const checkMatches = useCallback(() => {
    const matches = findMatches(board);
    
    if (matches.length > 0) {
      // Calculate score based on matches
      const matchScore = matches.reduce((total, match) => {
        // More points for larger matches
        return total + (match.positions.length * 10);
      }, 0);
      
      setScore(prev => prev + matchScore);
      
      // Remove matched tiles
      let newBoard = [...board];
      matches.forEach(match => {
        match.positions.forEach(pos => {
          newBoard[pos.row][pos.col] = 'empty';
        });
      });
      
      // Apply gravity to make tiles fall
      newBoard = applyGravity(newBoard);
      
      // Generate new tiles to fill empty spaces
      newBoard = generateNewTiles(newBoard, getMaxTileTypes());
      
      setBoard(newBoard);
      
      // Check if level complete
      if (score + matchScore >= targetScore) {
        setGameState('levelComplete');
      }
      // Check if game over (no moves left)
      else if (movesLeft <= 0) {
        setGameState('gameOver');
      }
    }
  }, [board, movesLeft, score, targetScore, getMaxTileTypes]);
  
  const resetGame = useCallback(() => {
    setScore(0);
    setLevel(1);
    setMovesLeft(15);
    setSelectedTile(null);
    setGameState('idle');
    fillBoard();
  }, [fillBoard]);
  
  const startNextLevel = useCallback(() => {
    setLevel(prev => prev + 1);
    setMovesLeft(15 + Math.floor(level / 2)); // More moves for higher levels
    setSelectedTile(null);
    setGameState('idle');
    fillBoard();
  }, [level, fillBoard]);
  
  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);
  
  const value = {
    board,
    score,
    level,
    targetScore,
    movesLeft,
    gameState,
    selectedTile,
    soundEnabled,
    setSelectedTile,
    swapTiles,
    checkMatches,
    fillBoard,
    resetGame,
    startNextLevel,
    toggleSound
  };
  
  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  
  return context;
};