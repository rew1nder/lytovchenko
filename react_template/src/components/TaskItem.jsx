import React from 'react';
import { Priority } from '../models/types';

/**
 * Task item component for displaying a single task
 */
function TaskItem({ task, onToggle, onEdit, onDelete }) {
  // Map priority to a color class
  const priorityColors = {
    [Priority.HIGH]: "bg-red-100 border-red-300",
    [Priority.MEDIUM]: "bg-yellow-100 border-yellow-300",
    [Priority.LOW]: "bg-green-100 border-green-300"
  };

  const priorityBadges = {
    [Priority.HIGH]: "bg-red-500",
    [Priority.MEDIUM]: "bg-yellow-500",
    [Priority.LOW]: "bg-green-500"
  };

  // Format date for display
  const formatDate = (date) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div 
      className={`mb-3 p-4 border rounded-lg shadow-sm ${priorityColors[task.priority]} 
        ${task.completed ? 'opacity-70' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start flex-1">
          <div className="mr-3 mt-1 flex flex-col items-center">
            <input 
              type="checkbox" 
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <button
              onClick={() => onToggle(task.id)}
              className={`text-xs px-2 py-1 mt-2 rounded ${task.completed ? 'bg-gray-300 hover:bg-gray-400' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            >
              {task.completed ? 'Completed' : 'Complete'}
            </button>
          </div>
          <div className="flex-1">
            <h3 
              className={`font-medium text-gray-900 ${task.completed ? 'line-through' : ''}`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="mt-1 text-gray-600 text-sm whitespace-pre-wrap break-words max-h-24 overflow-y-auto">
                {task.description}
              </p>
            )}
            <div className="flex items-center mt-2 gap-3 text-xs">
              <span 
                className={`px-2 py-1 rounded-full text-white font-medium ${priorityBadges[task.priority]}`}
              >
                {task.priority.toUpperCase()}
              </span>
              <span className="text-gray-500">
                Due: {formatDate(task.dueDate)}
              </span>
            </div>
          </div>
        </div>
        <div className="ml-4 flex gap-2">
          <button 
            onClick={() => onEdit(task.id)} 
            className="text-blue-600 hover:text-blue-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button 
            onClick={() => onDelete(task.id)} 
            className="text-red-600 hover:text-red-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;