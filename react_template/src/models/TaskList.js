import { DateSortStrategy } from '../strategies/DateSortStrategy';
import { ViewFilter } from './types';

/**
 * TaskList class represents the Context in the Strategy pattern
 * It maintains a collection of tasks and uses a sorting strategy to order them
 */
export class TaskList {
  /**
   * Create a new TaskList
   * @param {Object} sortStrategy - Initial sort strategy to use
   * @param {Array} initialTasks - Initial tasks to populate the list
   */
  constructor(sortStrategy = new DateSortStrategy(), initialTasks = []) {
    this.tasks = [...initialTasks];
    this.sortStrategy = sortStrategy;
  }

  /**
   * Set a new sorting strategy
   * @param {Object} strategy - The new strategy to use for sorting
   */
  setSortStrategy(strategy) {
    this.sortStrategy = strategy;
  }

  /**
   * Add a new task to the list
   * @param {Object} task - The task to add
   */
  addTask(task) {
    this.tasks.push(task);
  }

  /**
   * Remove a task from the list by ID
   * @param {string} taskId - ID of the task to remove
   * @returns {boolean} - True if task was found and removed, false otherwise
   */
  removeTask(taskId) {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    return this.tasks.length !== initialLength;
  }

  /**
   * Update an existing task
   * @param {string} taskId - ID of the task to update
   * @param {Object} updatedTask - Updated task data
   * @returns {boolean} - True if task was found and updated, false otherwise
   */
  updateTask(taskId, updatedTask) {
    const index = this.tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      return true;
    }
    return false;
  }

  /**
   * Get tasks sorted according to the current strategy
   * @returns {Array} - Sorted array of tasks
   */
  getSortedTasks() {
    return this.sortStrategy.sort(this.tasks);
  }

  /**
   * Get a task by its ID
   * @param {string} id - ID of the task to get
   * @returns {Object|undefined} - The task or undefined if not found
   */
  getTaskById(id) {
    return this.tasks.find(task => task.id === id);
  }

  /**
   * Get only completed tasks
   * @returns {Array} - Array of completed tasks
   */
  getCompletedTasks() {
    return this.tasks.filter(task => task.completed);
  }

  /**
   * Get only active (not completed) tasks
   * @returns {Array} - Array of active tasks
   */
  getActiveTasks() {
    return this.tasks.filter(task => !task.completed);
  }

  /**
   * Get tasks filtered by the provided view filter
   * @param {string} filter - Filter to apply (all, active, completed)
   * @returns {Array} - Filtered array of tasks
   */
  getFilteredTasks(filter) {
    switch (filter) {
      case ViewFilter.COMPLETED:
        return this.getCompletedTasks();
      case ViewFilter.ACTIVE:
        return this.getActiveTasks();
      case ViewFilter.ALL:
      default:
        return this.tasks;
    }
  }
  
  /**
   * Get tasks filtered and sorted
   * @param {string} filter - Filter to apply
   * @returns {Array} - Filtered and sorted array of tasks
   */
  getFilteredSortedTasks(filter) {
    const filteredTasks = this.getFilteredTasks(filter);
    return this.sortStrategy.sort(filteredTasks);
  }
}