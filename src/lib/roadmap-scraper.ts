// src/lib/roadmap-scraper.ts
import { Technology } from "@/types/roadmap";

interface RoadmapNode {
  id: string;
  title: string;
  description?: string;
  children?: RoadmapNode[];
}

interface ScrapedRoadmap {
  id: string;
  title: string;
  description: string;
  nodes: RoadmapNode[];
}

/**
 * Fetches roadmap data from roadmap.sh API
 * @param technology The technology to fetch the roadmap for
 * @returns Parsed roadmap data
 */
export async function scrapeRoadmap(technology: Technology): Promise<ScrapedRoadmap | null> {
  try {
    // Roadmap.sh provides a GitHub repository with JSON data for each roadmap
    // Example URL: https://raw.githubusercontent.com/kamranahmedse/developer-roadmap/master/public/jsons/react.json
    const roadmapUrl = `https://raw.githubusercontent.com/kamranahmedse/developer-roadmap/master/public/jsons/${technology}.json`;
    
    const response = await fetch(roadmapUrl, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 86400 } // Cache for 24 hours
    });

    if (!response.ok) {
      console.error(`Failed to fetch roadmap for ${technology}: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    
    // Transform the data into our application's format
    return {
      id: data.id || technology,
      title: data.title || capitalizeFirstLetter(technology),
      description: data.description || `Complete roadmap for ${capitalizeFirstLetter(technology)} development`,
      nodes: parseRoadmapNodes(data.nodes || [])
    };
  } catch (error) {
    console.error(`Error scraping roadmap for ${technology}:`, error);
    return null;
  }
}

/**
 * Parse roadmap nodes from roadmap.sh format to our application's format
 */
type RoadmapNodeInput = { 
  id?: string; 
  name?: string; 
  title?: string; 
  description?: string; 
  children?: RoadmapNodeInput[] 
};

function parseRoadmapNodes(nodes: RoadmapNodeInput[]): RoadmapNode[] {  return nodes.map(node => ({
    id: node.id || generateId(),
    title: node.name || node.title || "Untitled Node", // Provide a default value
    description: node.description,
    children: node.children ? parseRoadmapNodes(node.children) : undefined
  }));
}

/**
 * Generate a random ID for a roadmap node
 */
function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Capitalize the first letter of a string
 */
function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
