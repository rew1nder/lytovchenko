import { ISortStrategy } from './ISortStrategy';

/**
 * Strategy for sorting tasks by date
 * This is a concrete Strategy implementation in the Strategy pattern
 */
export class DateSortStrategy extends ISortStrategy {
  /**
   * Sort tasks by due date (earliest first)
   * @param {Array} tasks - Array of tasks to sort
   * @returns {Array} - Sorted array of tasks
   */
  sort(tasks) {
    return [...tasks].sort((a, b) => a.dueDate - b.dueDate);
  }
}