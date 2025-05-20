import React from 'react';
import { SortType } from '../models/types';

/**
 * SortControls component for changing the task sorting strategy
 * This is where we visually interact with the Strategy pattern
 */
function SortControls({ currentStrategy, onStrategyChange }) {
  return (
    <div className="flex space-x-2">
      <h2 className="text-sm font-medium text-gray-600 self-center mr-1">Sort by:</h2>
      <button
        className={`px-3 py-1 text-sm rounded-full ${
          currentStrategy === SortType.DATE
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
        onClick={() => onStrategyChange(SortType.DATE)}
        title="Sort by due date"
      >
        Date
      </button>
      <button
        className={`px-3 py-1 text-sm rounded-full ${
          currentStrategy === SortType.PRIORITY
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
        onClick={() => onStrategyChange(SortType.PRIORITY)}
        title="Sort by priority (high to low)"
      >
        Priority
      </button>
      <button
        className={`px-3 py-1 text-sm rounded-full ${
          currentStrategy === SortType.ALPHABETICAL
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
        onClick={() => onStrategyChange(SortType.ALPHABETICAL)}
        title="Sort alphabetically by title"
      >
        A-Z
      </button>
    </div>
  );
}

export default SortControls;