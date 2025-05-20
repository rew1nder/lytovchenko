import React from 'react';
import TaskItem from './TaskItem';
import { ViewFilter } from '../models/types';

/**
 * TaskList component for displaying the list of tasks with filters
 */
function TaskList({ tasks, viewFilter, onFilterChange, onToggleTask, onEditTask, onDeleteTask }) {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Tasks</h2>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded-full ${
              viewFilter === ViewFilter.ALL
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => onFilterChange(ViewFilter.ALL)}
          >
            All
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-full ${
              viewFilter === ViewFilter.ACTIVE
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => onFilterChange(ViewFilter.ACTIVE)}
          >
            Active
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-full ${
              viewFilter === ViewFilter.COMPLETED
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => onFilterChange(ViewFilter.COMPLETED)}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="bg-gray-50 p-6 text-center rounded-lg">
            <p className="text-gray-500">No tasks found. 
              {viewFilter !== ViewFilter.ALL && " Try changing the filter or adding a new task."}
            </p>
          </div>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TaskList;