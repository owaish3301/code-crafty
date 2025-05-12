// src/app/api/roadmaps/[technology]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getRoadmap, Technology } from "@/lib/mock-data";

interface RouteParams {
  params: {
    technology: Technology;
  };
}

export async function GET(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    const { technology } = params;
    
    // Validate technology
    if (!['react', 'java', 'python', 'javascript', 'typescript'].includes(technology)) {
      return NextResponse.json(
        { error: `Invalid technology: ${technology}` },
        { status: 400 }
      );
    }
    
    // Get the roadmap
    const roadmap = getRoadmap(technology as Technology);
    
    return NextResponse.json(roadmap);
  } catch (error: any) {
    console.error(`Error fetching ${params.technology} roadmap:`, error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch roadmap" },
      { status: 500 }
    );
  }
}
