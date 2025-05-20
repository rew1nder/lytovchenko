import { ISortStrategy } from './ISortStrategy';

/**
 * Strategy for sorting tasks alphabetically by title
 * This is a concrete Strategy implementation in the Strategy pattern
 */
export class AlphabeticalSortStrategy extends ISortStrategy {
  /**
   * Sort tasks alphabetically by title
   * @param {Array} tasks - Array of tasks to sort
   * @returns {Array} - Sorted array of tasks
   */
  sort(tasks) {
    return [...tasks].sort((a, b) => 
      a.title.localeCompare(b.title)
    );
  }
}