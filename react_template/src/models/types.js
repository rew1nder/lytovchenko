/**
 * This file defines the types and constants used throughout the TaskSorter application
 */

// Priority enum
export const Priority = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high"
};

// Task model
export class Task {
  constructor({
    id = crypto.randomUUID(),
    title = '',
    description = '',
    dueDate = new Date(),
    priority = Priority.MEDIUM,
    completed = false,
    createdAt = new Date(),
    updatedAt = new Date()
  } = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate instanceof Date ? dueDate : new Date(dueDate);
    this.priority = priority;
    this.completed = completed;
    this.createdAt = createdAt instanceof Date ? createdAt : new Date(createdAt);
    this.updatedAt = updatedAt instanceof Date ? updatedAt : new Date(updatedAt);
  }

  toggleComplete() {
    this.completed = !this.completed;
    this.updatedAt = new Date();
    return this;
  }

  // Factory method to create Task from raw object (e.g. from localStorage)
  static fromObject(obj) {
    return new Task(obj);
  }
}

// View filter types
export const ViewFilter = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed"
};

// Sorting strategy types
export const SortType = {
  DATE: "date",
  PRIORITY: "priority",
  ALPHABETICAL: "alphabetical"
};