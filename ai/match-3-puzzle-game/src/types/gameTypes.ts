export type TileType = 1 | 2 | 3 | 4 | 5 | 'special' | 'empty';

export interface Position {
  row: number;
  col: number;
}

export interface Match {
  type: TileType;
  positions: Position[];
}

export type GameState = 'idle' | 'playing' | 'levelComplete' | 'gameOver';