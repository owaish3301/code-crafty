// src/types/roadmap.ts

// Supported technology roadmaps
export type Technology = 
  | 'react'
  | 'angular'
  | 'vue'
  | 'nodejs'
  | 'frontend'
  | 'backend'
  | 'devops'
  | 'android'
  | 'python'
  | 'java'
  | 'golang'
  | 'javascript'
  | 'typescript';

// Basic roadmap structure
export interface Roadmap {
  id: string;
  name: string;
  technology: Technology;
  description?: string;
  topics: RoadmapTopic[];
}

export interface RoadmapTopic {
  id: string;
  name: string;
  description?: string;
  subtopics: RoadmapSubtopic[];
  completed?: boolean;
}

export interface RoadmapSubtopic {
  id: string;
  name: string;
  description?: string;
  resources?: Resource[];
  completed?: boolean;
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: ResourceType;
}

export type ResourceType = 'article' | 'video' | 'course' | 'documentation' | 'github' | 'other';

// User progress tracking
export interface UserRoadmapProgress {
  userId: string;
  roadmapId: string;
  completedTopics: string[]; // Array of topic IDs
  completedSubtopics: string[]; // Array of subtopic IDs
  lastUpdated: string; // ISO date string
}
