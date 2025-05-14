// src/app/api/roadmaps/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAllRoadmaps } from "@/lib/mock-data";

export async function GET(req: NextRequest) {
  try {
    // Get all available roadmaps
    const roadmaps = getAllRoadmaps();
    
    return NextResponse.json(roadmaps);
  } catch (error: unknown) {
    console.error("Error fetching roadmaps:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch roadmaps";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
