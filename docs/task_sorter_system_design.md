# TaskSorter System Design

## Implementation Approach

For the TaskSorter application, we will create a web-based task management system that clearly demonstrates the Strategy design pattern. The Strategy pattern allows us to define a family of algorithms (sorting strategies), encapsulate each one, and make them interchangeable.

### Technology Stack
- **Frontend**: React with TypeScript, Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: MongoDB for data persistence
- **State Management**: React Context API

### Key Challenges and Solutions

1. **Implementing the Strategy Pattern Effectively**
   - Create a clear interface for all sorting strategies
   - Ensure strategies are truly interchangeable at runtime
   - Make the pattern visible in both frontend and backend implementations

2. **Responsive UI Across Devices**
   - Use Tailwind CSS for responsive design
   - Implement mobile-first approach with adaptive components

3. **Data Persistence**
   - Use MongoDB for scalable storage of tasks
   - Implement local storage as fallback for offline functionality

4. **Performant Sorting with Large Task Lists**
   - Implement efficient sorting algorithms
   - Consider pagination and lazy loading for large datasets

### Open Source Libraries

- **axios** for HTTP requests
- **date-fns** for date manipulation and sorting
- **react-beautiful-dnd** for drag-and-drop functionality
- **mongoose** for MongoDB object modeling
- **jest** for testing

## Data Structures and Interfaces

The core of our application will revolve around the Strategy design pattern for task sorting. Here's the detailed class diagram:

```mermaid
classDiagram
    %% Strategy Pattern Implementation
    class ISortStrategy {
        <<interface>>
        +sort(tasks: Task[]): Task[]
    }
    
    class DateSortStrategy {
        +sort(tasks: Task[]): Task[]
    }
    
    class PrioritySortStrategy {
        +sort(tasks: Task[]): Task[]
    }
    
    class AlphabeticalSortStrategy {
        +sort(tasks: Task[]): Task[]
    }
    
    ISortStrategy <|.. DateSortStrategy
    ISortStrategy <|.. PrioritySortStrategy
    ISortStrategy <|.. AlphabeticalSortStrategy
    
    %% Core Data Models
    class Task {
        +id: string
        +title: string
        +description: string
        +dueDate: Date
        +priority: Priority
        +completed: boolean
        +createdAt: Date
        +updatedAt: Date
        +toggleComplete(): void
    }
    
    class Priority {
        <<enumeration>>
        LOW
        MEDIUM
        HIGH
    }
    
    %% Context Class that uses the Strategy
    class TaskList {
        -tasks: Task[]
        -sortStrategy: ISortStrategy
        +constructor(sortStrategy: ISortStrategy)
        +setSortStrategy(strategy: ISortStrategy): void
        +addTask(task: Task): void
        +removeTask(taskId: string): void
        +updateTask(taskId: string, updatedTask: Task): void
        +getSortedTasks(): Task[]
        +getTaskById(id: string): Task
        +getCompletedTasks(): Task[]
        +getActiveTasks(): Task[]
    }
    
    %% Service Classes
    class TaskService {
        -taskRepository: TaskRepository
        +constructor(taskRepository: TaskRepository)
        +getAllTasks(): Promise<Task[]>
        +createTask(task: Task): Promise<Task>
        +updateTask(id: string, task: Task): Promise<Task>
        +deleteTask(id: string): Promise<void>
        +markTaskComplete(id: string): Promise<Task>
    }
    
    class TaskRepository {
        +findAll(): Promise<Task[]>
        +findById(id: string): Promise<Task>
        +create(task: Task): Promise<Task>
        +update(id: string, task: Task): Promise<Task>
        +delete(id: string): Promise<void>
    }
    
    %% Frontend Components
    class TaskSorterApp {
        -taskList: TaskList
        -currentStrategy: ISortStrategy
        +constructor()
        +changeStrategy(strategy: ISortStrategy): void
        +render(): JSX.Element
    }
    
    class TaskForm {
        -task: Task
        -onSubmit: function
        +handleSubmit(event): void
        +render(): JSX.Element
    }
    
    class TaskItem {
        -task: Task
        -onToggle: function
        -onEdit: function
        -onDelete: function
        +handleToggle(): void
        +render(): JSX.Element
    }
    
    class SortControls {
        -currentStrategy: string
        -onStrategyChange: function
        +handleStrategyChange(strategy: string): void
        +render(): JSX.Element
    }
    
    %% Relationships
    TaskList o-- Task : contains
    TaskList --> ISortStrategy : uses
    Task --> Priority : has
    TaskService --> TaskRepository : uses
    TaskSorterApp o-- TaskList : manages
    TaskSorterApp o-- TaskForm : contains
    TaskSorterApp o-- TaskItem : contains
    TaskSorterApp o-- SortControls : contains
```

## Program Call Flow

The sequence diagram below demonstrates how the TaskSorter application will handle task creation, retrieval, and sorting using the Strategy pattern:

```mermaid
sequenceDiagram
    participant User
    participant App as TaskSorterApp
    participant Form as TaskForm
    participant List as TaskList
    participant Strategy as ISortStrategy
    participant Service as TaskService
    participant Repo as TaskRepository
    participant DB as MongoDB
    
    %% Application Initialization
    User->>App: Open application
    App->>Service: getAllTasks()
    Service->>Repo: findAll()
    Repo->>DB: Query tasks
    DB-->>Repo: Return tasks data
    Repo-->>Service: Return task objects
    Service-->>App: Return tasks array
    App->>List: Create TaskList
    App->>Strategy: Create DateSortStrategy (default)
    App->>List: setSortStrategy(DateSortStrategy)
    App->>List: getSortedTasks()
    List->>Strategy: sort(tasks)
    Strategy-->>List: Return sorted tasks
    List-->>App: Return sorted tasks
    App-->>User: Display sorted tasks
    
    %% Adding a new task
    User->>App: Click "Add Task"
    App->>Form: Show task form
    Form-->>User: Display task input form
    User->>Form: Fill in task details
    User->>Form: Submit form
    Form->>Service: createTask(taskData)
    Service->>Repo: create(task)
    Repo->>DB: Insert task
    DB-->>Repo: Confirm insertion
    Repo-->>Service: Return created task
    Service-->>App: Return new task
    App->>List: addTask(newTask)
    App->>List: getSortedTasks()
    List->>Strategy: sort(tasks)
    Strategy-->>List: Return sorted tasks
    List-->>App: Return sorted tasks
    App-->>User: Display updated task list
    
    %% Changing sort strategy
    User->>App: Click "Sort by Priority"
    App->>Strategy: Create PrioritySortStrategy
    App->>List: setSortStrategy(PrioritySortStrategy)
    App->>List: getSortedTasks()
    List->>Strategy: sort(tasks)
    Strategy-->>List: Return sorted tasks
    List-->>App: Return sorted tasks
    App-->>User: Display tasks sorted by priority
    
    %% Completing a task
    User->>App: Click checkbox to complete task
    App->>Service: markTaskComplete(taskId)
    Service->>Repo: update(taskId, {completed: true})
    Repo->>DB: Update task
    DB-->>Repo: Confirm update
    Repo-->>Service: Return updated task
    Service-->>App: Return updated task
    App->>List: updateTask(taskId, updatedTask)
    App->>List: getSortedTasks()
    List->>Strategy: sort(tasks)
    Strategy-->>List: Return sorted tasks
    List-->>App: Return sorted tasks
    App-->>User: Display updated task list
    
    %% Filtering completed tasks
    User->>App: Select "Show Completed"
    App->>List: getCompletedTasks()
    List-->>App: Return completed tasks
    App->>List: setSortStrategy(currentStrategy)
    App->>List: getSortedTasks()
    List->>Strategy: sort(completedTasks)
    Strategy-->>List: Return sorted tasks
    List-->>App: Return sorted completed tasks
    App-->>User: Display sorted completed tasks
```

## Anything UNCLEAR

1. **User Authentication**: The PRD doesn't specify if user authentication is required. For the initial implementation, we assume a single-user system without authentication.

2. **Multiple Task Lists**: It's unclear if users should be able to create multiple separate lists. We've designed the system to support this in the future but focused on a single list for the MVP.

3. **Custom Sorting Strategies**: While listed as a P2 requirement, the implementation details for allowing users to create custom sorting strategies need further clarification. We've designed the system to be easily extensible for this feature in the future.

4. **Offline Functionality**: The extent of offline functionality required is not specified. We've included local storage as a fallback, but detailed offline/online synchronization would need additional specification.

5. **Task Recurrence**: The P2 requirement for recurring tasks would need further specification to determine how the recurrence patterns should be defined and managed.