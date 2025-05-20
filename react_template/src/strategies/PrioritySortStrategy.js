import { ISortStrategy } from './ISortStrategy';
import { Priority } from '../models/types';

/**
 * Strategy for sorting tasks by priority
 * This is a concrete Strategy implementation in the Strategy pattern
 */
export class PrioritySortStrategy extends ISortStrategy {
  /**
   * Sort tasks by priority (high to low)
   * @param {Array} tasks - Array of tasks to sort
   * @returns {Array} - Sorted array of tasks
   */
  sort(tasks) {
    const priorityValues = { 
      [Priority.HIGH]: 3, 
      [Priority.MEDIUM]: 2, 
      [Priority.LOW]: 1 
    };
    
    return [...tasks].sort((a, b) => 
      priorityValues[b.priority] - priorityValues[a.priority]
    );
  }
}