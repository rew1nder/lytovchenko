import React, { useState, useEffect } from 'react';
import { Task, Priority, SortType, ViewFilter } from './models/types';
import { TaskList as TaskListModel } from './models/TaskList';
import { DateSortStrategy } from './strategies/DateSortStrategy';
import { PrioritySortStrategy } from './strategies/PrioritySortStrategy';
import { AlphabeticalSortStrategy } from './strategies/AlphabeticalSortStrategy';

// Components
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SortControls from './components/SortControls';

/**
 * Main application component that demonstrates the Strategy design pattern
 */
function App() {
  // State for tasks and task management
  const [tasks, setTasks] = useState([]);
  const [taskList, setTaskList] = useState(null);
  const [currentSortType, setCurrentSortType] = useState(SortType.DATE);
  const [viewFilter, setViewFilter] = useState(ViewFilter.ALL);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  // Initialize TaskList with default strategy and load tasks from localStorage
  useEffect(() => {
    const storedTasks = loadTasksFromStorage();
    const initialTaskList = new TaskListModel(new DateSortStrategy(), storedTasks);
    setTaskList(initialTaskList);
    setTasks(initialTaskList.getSortedTasks());
  }, []);

  // Load tasks from localStorage
  const loadTasksFromStorage = () => {
    try {
      const storedTasksJson = localStorage.getItem('tasks');
      if (storedTasksJson) {
        const storedTasks = JSON.parse(storedTasksJson);
        return storedTasks.map(task => Task.fromObject(task));
      }
    } catch (error) {
      console.error('Failed to load tasks from storage:', error);
    }
    return [];
  };

  // Save tasks to localStorage
  const saveTasksToStorage = (taskArray) => {
    try {
      localStorage.setItem('tasks', JSON.stringify(taskArray));
    } catch (error) {
      console.error('Failed to save tasks to storage:', error);
    }
  };

  // Apply the selected sorting strategy
  const changeSortStrategy = (sortType) => {
    if (!taskList) return;
    
    let strategy;
    switch (sortType) {
      case SortType.PRIORITY:
        strategy = new PrioritySortStrategy();
        break;
      case SortType.ALPHABETICAL:
        strategy = new AlphabeticalSortStrategy();
        break;
      case SortType.DATE:
      default:
        strategy = new DateSortStrategy();
        break;
    }
    
    // Change the strategy in the TaskList object - core of Strategy pattern
    taskList.setSortStrategy(strategy);
    setCurrentSortType(sortType);
    
    // Get sorted tasks using the new strategy
    const sortedFilteredTasks = taskList.getFilteredSortedTasks(viewFilter);
    setTasks(sortedFilteredTasks);
  };

  // Filter tasks by complete/incomplete status
  const changeViewFilter = (filter) => {
    setViewFilter(filter);
    if (taskList) {
      const filteredSortedTasks = taskList.getFilteredSortedTasks(filter);
      setTasks(filteredSortedTasks);
    }
  };

  // Add a new task
  const handleAddTask = (taskData) => {
    if (!taskList) return;
    
    const newTask = new Task(taskData);
    taskList.addTask(newTask);
    
    // Update tasks state and save to storage
    const allTasks = [...taskList.tasks];
    saveTasksToStorage(allTasks);
    
    // Apply current filter and sorting
    const filteredSortedTasks = taskList.getFilteredSortedTasks(viewFilter);
    setTasks(filteredSortedTasks);
    setShowAddForm(false);
  };

  // Edit an existing task
  const handleEditTask = (taskData) => {
    if (!taskList) return;
    
    taskList.updateTask(taskData.id, new Task(taskData));
    
    // Update tasks state and save to storage
    const allTasks = [...taskList.tasks];
    saveTasksToStorage(allTasks);
    
    // Apply current filter and sorting
    const filteredSortedTasks = taskList.getFilteredSortedTasks(viewFilter);
    setTasks(filteredSortedTasks);
    setEditingTask(null);
  };

  // Toggle task completion status
  const handleToggleTask = (taskId) => {
    if (!taskList) return;
    
    const task = taskList.getTaskById(taskId);
    if (task) {
      task.toggleComplete();
      taskList.updateTask(taskId, task);
      
      // Update tasks state and save to storage
      const allTasks = [...taskList.tasks];
      saveTasksToStorage(allTasks);
      
      // Apply current filter and sorting
      const filteredSortedTasks = taskList.getFilteredSortedTasks(viewFilter);
      setTasks(filteredSortedTasks);
    }
  };

  // Delete a task
  const handleDeleteTask = (taskId) => {
    if (!taskList) return;
    
    if (window.confirm('Are you sure you want to delete this task?')) {
      taskList.removeTask(taskId);
      
      // Update tasks state and save to storage
      const allTasks = [...taskList.tasks];
      saveTasksToStorage(allTasks);
      
      // Apply current filter and sorting
      const filteredSortedTasks = taskList.getFilteredSortedTasks(viewFilter);
      setTasks(filteredSortedTasks);
    }
  };

  // Start editing a task
  const startEditTask = (taskId) => {
    if (!taskList) return;
    
    const taskToEdit = taskList.getTaskById(taskId);
    if (taskToEdit) {
      setEditingTask(taskToEdit);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">TaskSorter</h1>
              <p className="text-gray-500">Sort your tasks using different strategies</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 sm:mt-0 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Task
            </button>
          </div>
          
          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <SortControls 
              currentStrategy={currentSortType}
              onStrategyChange={changeSortStrategy}
            />
          </div>
          
          {/* Task List */}
          <TaskList 
            tasks={tasks}
            viewFilter={viewFilter}
            onFilterChange={changeViewFilter}
            onToggleTask={handleToggleTask}
            onEditTask={startEditTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
        
        {/* Add/Edit Task Form Modal */}
        {(showAddForm || editingTask) && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
            <div className="relative bg-white rounded-lg w-full max-w-md p-6 mx-4">
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingTask(null);
                }}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <TaskForm 
                task={editingTask}
                onSubmit={editingTask ? handleEditTask : handleAddTask}
                onCancel={() => {
                  setShowAddForm(false);
                  setEditingTask(null);
                }}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Footer with Strategy Pattern Info */}
      <footer className="max-w-5xl mx-auto px-4 pb-8 mt-8">
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-semibold text-gray-700">About TaskSorter</h3>
          <p className="text-gray-600 mt-2">
            TaskSorter demonstrates the <span className="font-semibold">Strategy Design Pattern</span>, allowing for different 
            sorting algorithms (strategies) to be selected and swapped at runtime. The pattern is clearly visible in the task 
            sorting mechanisms, where each sorting strategy implements a common interface and can be interchanged dynamically.
          </p>
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-700">Currently Using:</h4>
            <p className="text-gray-600 text-sm">
              {currentSortType === SortType.DATE && "DateSortStrategy - Sorts tasks by their due dates"}
              {currentSortType === SortType.PRIORITY && "PrioritySortStrategy - Sorts tasks by priority level (High to Low)"}
              {currentSortType === SortType.ALPHABETICAL && "AlphabeticalSortStrategy - Sorts tasks alphabetically by title"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;