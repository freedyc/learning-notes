import React from 'react';
import { TileType, Position } from '../types/gameTypes';
import { Candy, Cherry, Cookie, Diamond as Lemon, Gem } from 'lucide-react';

interface TileProps {
  type: TileType;
  position: Position;
  isSelected: boolean;
  onClick: () => void;
}

const Tile: React.FC<TileProps> = ({ type, isSelected, onClick }) => {
  const tileColors = {
    1: 'bg-red-500 hover:bg-red-400',
    2: 'bg-blue-500 hover:bg-blue-400',
    3: 'bg-green-500 hover:bg-green-400',
    4: 'bg-yellow-500 hover:bg-yellow-400',
    5: 'bg-purple-500 hover:bg-purple-400',
    special: 'bg-gradient-to-br from-pink-500 to-orange-400',
    empty: 'bg-transparent'
  };

  const getTileIcon = () => {
    switch (type) {
      case 1:
        return <Candy className="w-6 h-6 text-white" />;
      case 2:
        return <Cherry className="w-6 h-6 text-white" />;
      case 3:
        return <Cookie className="w-6 h-6 text-white" />;
      case 4:
        return <Lemon className="w-6 h-6 text-white" />;
      case 5:
        return <Gem className="w-6 h-6 text-white" />;
      case 'special':
        return (
          <div className="animate-pulse">
            <Gem className="w-6 h-6 text-white" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <button
      className={`
        w-12 h-12 rounded-md flex items-center justify-center
        transition-all duration-200 transform
        ${tileColors[type] || 'bg-gray-300'}
        ${isSelected ? 'ring-4 ring-white scale-110' : ''}
        ${type === 'empty' ? 'cursor-default opacity-0' : 'cursor-pointer shadow-md hover:scale-105'}
      `}
      onClick={onClick}
      disabled={type === 'empty'}
    >
      {getTileIcon()}
    </button>
  );
};

export default Tile;