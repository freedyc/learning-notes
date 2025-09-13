import { TileType, Position, Match } from '../types/gameTypes';

// Generate a random board with no matches
export const generateBoard = (rows: number, cols: number, maxTileType: number): TileType[][] => {
  const board: TileType[][] = [];
  
  for (let i = 0; i < rows; i++) {
    const row: TileType[] = [];
    
    for (let j = 0; j < cols; j++) {
      let newTile: TileType;
      
      // Keep generating tiles until we find one that doesn't create a match
      do {
        // Generate a random tile type from 1 to maxTileType
        newTile = (Math.floor(Math.random() * maxTileType) + 1) as TileType;
      } while (
        // Check for horizontal matches (need at least 2 existing tiles to form a match)
        (j >= 2 && row[j - 1] === newTile && row[j - 2] === newTile) ||
        // Check for vertical matches (need at least 2 existing tiles to form a match)
        (i >= 2 && board[i - 1][j] === newTile && board[i - 2][j] === newTile)
      );
      
      row.push(newTile);
    }
    
    board.push(row);
  }
  
  return board;
};

// Find all matches in the current board
export const findMatches = (board: TileType[][]): Match[] => {
  if (!board.length) return [];
  
  const matches: Match[] = [];
  const rows = board.length;
  const cols = board[0].length;
  
  // Check for horizontal matches
  for (let i = 0; i < rows; i++) {
    let currentType: TileType | null = null;
    let currentRun: Position[] = [];
    
    for (let j = 0; j < cols; j++) {
      const tile = board[i][j];
      
      if (tile === 'empty') {
        // Handle empty tiles - end current run
        if (currentRun.length >= 3) {
          matches.push({
            type: currentType as TileType,
            positions: [...currentRun]
          });
        }
        currentType = null;
        currentRun = [];
      } else if (tile === currentType) {
        // Continue the current run
        currentRun.push({ row: i, col: j });
      } else {
        // End current run and start a new one
        if (currentRun.length >= 3) {
          matches.push({
            type: currentType as TileType,
            positions: [...currentRun]
          });
        }
        currentType = tile;
        currentRun = [{ row: i, col: j }];
      }
    }
    
    // Check for match at the end of the row
    if (currentRun.length >= 3) {
      matches.push({
        type: currentType as TileType,
        positions: [...currentRun]
      });
    }
  }
  
  // Check for vertical matches
  for (let j = 0; j < cols; j++) {
    let currentType: TileType | null = null;
    let currentRun: Position[] = [];
    
    for (let i = 0; i < rows; i++) {
      const tile = board[i][j];
      
      if (tile === 'empty') {
        // Handle empty tiles - end current run
        if (currentRun.length >= 3) {
          matches.push({
            type: currentType as TileType,
            positions: [...currentRun]
          });
        }
        currentType = null;
        currentRun = [];
      } else if (tile === currentType) {
        // Continue the current run
        currentRun.push({ row: i, col: j });
      } else {
        // End current run and start a new one
        if (currentRun.length >= 3) {
          matches.push({
            type: currentType as TileType,
            positions: [...currentRun]
          });
        }
        currentType = tile;
        currentRun = [{ row: i, col: j }];
      }
    }
    
    // Check for match at the end of the column
    if (currentRun.length >= 3) {
      matches.push({
        type: currentType as TileType,
        positions: [...currentRun]
      });
    }
  }
  
  return matches;
};

// Apply gravity to make tiles fall down
export const applyGravity = (board: TileType[][]): TileType[][] => {
  const newBoard = JSON.parse(JSON.stringify(board));
  const rows = newBoard.length;
  const cols = newBoard[0].length;
  
  // For each column
  for (let j = 0; j < cols; j++) {
    // Start from the bottom and move up
    let emptySpaces = 0;
    
    for (let i = rows - 1; i >= 0; i--) {
      if (newBoard[i][j] === 'empty') {
        emptySpaces++;
      } else if (emptySpaces > 0) {
        // Move tile down by the number of empty spaces
        newBoard[i + emptySpaces][j] = newBoard[i][j];
        newBoard[i][j] = 'empty';
      }
    }
  }
  
  return newBoard;
};

// Generate new tiles to fill empty spaces at the top
export const generateNewTiles = (board: TileType[][], maxTileType: number): TileType[][] => {
  const newBoard = JSON.parse(JSON.stringify(board));
  const rows = newBoard.length;
  const cols = newBoard[0].length;
  
  // For each column
  for (let j = 0; j < cols; j++) {
    // Check each cell from top to bottom
    for (let i = 0; i < rows; i++) {
      if (newBoard[i][j] === 'empty') {
        // Randomly decide if this should be a special tile (5% chance)
        const isSpecial = Math.random() < 0.05;
        
        if (isSpecial) {
          newBoard[i][j] = 'special';
        } else {
          // Generate a random tile type
          const tileType = (Math.floor(Math.random() * maxTileType) + 1) as TileType;
          newBoard[i][j] = tileType;
        }
      }
    }
  }
  
  return newBoard;
};