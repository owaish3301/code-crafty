// src/lib/mock-data.ts
export type Technology = 'react' | 'java' | 'python' | 'javascript' | 'typescript';

export type RoadmapTopic = {
  id: string;
  title: string;
  description: string;
  isCompleted?: boolean;
  subtopics?: RoadmapTopic[];
};

export type Roadmap = {
  id: string;
  name: string;
  description: string;
  topics: RoadmapTopic[];
};

// Mock data for roadmaps
const mockRoadmaps: Record<Technology, Roadmap> = {
  react: {
    id: '1',
    name: 'React Developer',
    description: 'Learn React and become a frontend developer',
    topics: [
      {
        id: '1-1',
        title: 'JavaScript Fundamentals',
        description: 'Learn the basics of JavaScript before diving into React',
        subtopics: [
          { id: '1-1-1', title: 'Variables and Data Types', description: 'Understanding JavaScript variables and primitive types' },
          { id: '1-1-2', title: 'Functions', description: 'Understanding JavaScript functions and scope' },
          { id: '1-1-3', title: 'Arrays and Objects', description: 'Working with JavaScript arrays and objects' },
          { id: '1-1-4', title: 'ES6+ Features', description: 'Modern JavaScript features like arrow functions, destructuring, and more' },
        ]
      },
      {
        id: '1-2',
        title: 'React Core Concepts',
        description: 'The fundamental building blocks of React',
        subtopics: [
          { id: '1-2-1', title: 'JSX', description: 'Understanding JSX syntax and limitations' },
          { id: '1-2-2', title: 'Components', description: 'Creating functional and class components' },
          { id: '1-2-3', title: 'Props', description: 'Passing data between components' },
          { id: '1-2-4', title: 'State', description: 'Managing component state' },
        ]
      },
      {
        id: '1-3',
        title: 'React Hooks',
        description: 'Using hooks for state and side effects in functional components',
        subtopics: [
          { id: '1-3-1', title: 'useState', description: 'Managing state in functional components' },
          { id: '1-3-2', title: 'useEffect', description: 'Handling side effects in functional components' },
          { id: '1-3-3', title: 'useContext', description: 'Using React Context API with hooks' },
          { id: '1-3-4', title: 'Custom Hooks', description: 'Creating reusable hooks' },
        ]
      },
      {
        id: '1-4',
        title: 'Routing with React Router',
        description: 'Creating multi-page applications with React Router',
        subtopics: [
          { id: '1-4-1', title: 'Setting up Router', description: 'Installing and configuring React Router' },
          { id: '1-4-2', title: 'Route Components', description: 'Creating routes with Route components' },
          { id: '1-4-3', title: 'Navigation', description: 'Using Link and programmatic navigation' },
          { id: '1-4-4', title: 'Route Parameters', description: 'Working with dynamic routes and parameters' },
        ]
      },
      {
        id: '1-5',
        title: 'State Management',
        description: 'Managing application state with Redux or Context API',
        subtopics: [
          { id: '1-5-1', title: 'Redux Basics', description: 'Understanding actions, reducers, and the store' },
          { id: '1-5-2', title: 'Redux Toolkit', description: 'Using Redux Toolkit to simplify Redux code' },
          { id: '1-5-3', title: 'Context API', description: 'Using React Context for simpler state management' },
          { id: '1-5-4', title: 'Performance Considerations', description: 'Optimizing state management for performance' },
        ]
      },
    ]
  },
  java: {
    id: '2',
    name: 'Java Developer',
    description: 'Learn Java programming and backend development',
    topics: [
      {
        id: '2-1',
        title: 'Java Fundamentals',
        description: 'Core Java concepts and language features',
        subtopics: [
          { id: '2-1-1', title: 'Syntax and Variables', description: 'Basic Java syntax, data types, and variables' },
          { id: '2-1-2', title: 'Control Flow', description: 'Conditionals and loops in Java' },
          { id: '2-1-3', title: 'Object-Oriented Programming', description: 'Classes, objects, inheritance, and polymorphism' },
          { id: '2-1-4', title: 'Exception Handling', description: 'Try-catch blocks and exception hierarchies' },
        ]
      },
      {
        id: '2-2',
        title: 'Java Collections',
        description: 'Working with Java Collections Framework',
        subtopics: [
          { id: '2-2-1', title: 'Lists and Sets', description: 'Using ArrayList, LinkedList, HashSet, and TreeSet' },
          { id: '2-2-2', title: 'Maps', description: 'Using HashMap, TreeMap, and LinkedHashMap' },
          { id: '2-2-3', title: 'Iterators and Streams', description: 'Iterating and processing collections' },
          { id: '2-2-4', title: 'Collections Utility Methods', description: 'Using Collections class utility methods' },
        ]
      },
      {
        id: '2-3',
        title: 'Java I/O and Files',
        description: 'Working with files and I/O streams',
        subtopics: [
          { id: '2-3-1', title: 'File Handling', description: 'Reading and writing files in Java' },
          { id: '2-3-2', title: 'Byte Streams', description: 'Using InputStream and OutputStream' },
          { id: '2-3-3', title: 'Character Streams', description: 'Using Reader and Writer' },
          { id: '2-3-4', title: 'NIO', description: 'Using Java NIO for efficient I/O operations' },
        ]
      },
      {
        id: '2-4',
        title: 'Multithreading and Concurrency',
        description: 'Working with threads and concurrent programming',
        subtopics: [
          { id: '2-4-1', title: 'Thread Basics', description: 'Creating and managing threads' },
          { id: '2-4-2', title: 'Synchronization', description: 'Thread synchronization and locks' },
          { id: '2-4-3', title: 'Concurrent Collections', description: 'Using thread-safe collections' },
          { id: '2-4-4', title: 'ExecutorService', description: 'Using thread pools and executors' },
        ]
      },
      {
        id: '2-5',
        title: 'Spring Framework',
        description: 'Building applications with Spring Framework',
        subtopics: [
          { id: '2-5-1', title: 'Spring Core', description: 'Dependency injection and inversion of control' },
          { id: '2-5-2', title: 'Spring Boot', description: 'Building applications with Spring Boot' },
          { id: '2-5-3', title: 'Spring Data', description: 'Data access with Spring Data JPA' },
          { id: '2-5-4', title: 'Spring MVC', description: 'Building web applications with Spring MVC' },
        ]
      },
    ]
  },
  python: {
    id: '3',
    name: 'Python Developer',
    description: 'Learn Python programming and data science',
    topics: [
      {
        id: '3-1',
        title: 'Python Basics',
        description: 'Fundamental Python concepts and syntax',
        subtopics: [
          { id: '3-1-1', title: 'Syntax and Variables', description: 'Basic Python syntax, data types, and variables' },
          { id: '3-1-2', title: 'Control Flow', description: 'Conditionals and loops in Python' },
          { id: '3-1-3', title: 'Functions', description: 'Defining and using functions in Python' },
          { id: '3-1-4', title: 'Data Structures', description: 'Lists, tuples, dictionaries, and sets' },
        ]
      },
      // More topics...
    ]
  },
  javascript: {
    id: '4',
    name: 'JavaScript Developer',
    description: 'Learn JavaScript for web development',
    topics: [
      {
        id: '4-1',
        title: 'JavaScript Basics',
        description: 'Core JavaScript concepts and language features',
        subtopics: [
          { id: '4-1-1', title: 'Syntax and Variables', description: 'Basic JavaScript syntax, data types, and variables' },
          { id: '4-1-2', title: 'Functions', description: 'Defining and using functions in JavaScript' },
          { id: '4-1-3', title: 'Objects and Arrays', description: 'Working with objects and arrays' },
          { id: '4-1-4', title: 'DOM Manipulation', description: 'Interacting with the Document Object Model' },
        ]
      },
      // More topics...
    ]
  },
  typescript: {
    id: '5',
    name: 'TypeScript Developer',
    description: 'Learn TypeScript for type-safe JavaScript development',
    topics: [
      {
        id: '5-1',
        title: 'TypeScript Basics',
        description: 'Core TypeScript concepts and language features',
        subtopics: [
          { id: '5-1-1', title: 'Basic Types', description: 'Using TypeScript basic types and type annotations' },
          { id: '5-1-2', title: 'Interfaces', description: 'Defining and using interfaces' },
          { id: '5-1-3', title: 'Classes', description: 'Object-oriented programming with TypeScript' },
          { id: '5-1-4', title: 'Generics', description: 'Using generics for reusable components' },
        ]
      },
      // More topics...
    ]
  }
};

// Mock function to get a roadmap
export function getRoadmap(technology: Technology): Roadmap {
  return mockRoadmaps[technology];
}

// Mock function to get all available roadmaps
export function getAllRoadmaps(): { id: string; name: string; description: string }[] {
  return Object.entries(mockRoadmaps).map(([key, roadmap]) => ({
    id: roadmap.id,
    name: roadmap.name,
    description: roadmap.description,
  }));
}

// Mock function to get a user's progress in a roadmap
export function getUserRoadmapProgress(userId: string, roadmapId: string): Roadmap {
  const roadmap = Object.values(mockRoadmaps).find(r => r.id === roadmapId);
  
  if (!roadmap) {
    throw new Error(`Roadmap with ID ${roadmapId} not found`);
  }
  
  // Deep clone the roadmap to avoid modifying the original
  const userRoadmap = JSON.parse(JSON.stringify(roadmap)) as Roadmap;
  
  // Simulate random progress
  userRoadmap.topics.forEach(topic => {
    // Random completion for top-level topics
    topic.isCompleted = Math.random() > 0.5;
    
    if (topic.subtopics) {
      topic.subtopics.forEach(subtopic => {
        // Random completion for subtopics
        subtopic.isCompleted = Math.random() > 0.6;
      });
    }
  });
  
  return userRoadmap;
}
