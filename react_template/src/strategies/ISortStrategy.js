/**
 * Interface for the sorting strategy
 * This represents the Strategy interface in the Strategy pattern
 */
export class ISortStrategy {
  /**
   * Sort the tasks array according to specific criteria
   * @param {Array} tasks - The array of tasks to be sorted
   * @returns {Array} - The sorted array of tasks
   */
  sort(tasks) {
    throw new Error("sort() method must be implemented by concrete strategies");
  }
}