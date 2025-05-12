// src/app/api/roadmaps/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAllRoadmaps } from "@/lib/mock-data";

export async function GET(req: NextRequest) {
  try {
    // Get all available roadmaps
    const roadmaps = getAllRoadmaps();
    
    return NextResponse.json(roadmaps);
  } catch (error: any) {
    console.error("Error fetching roadmaps:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch roadmaps" },
      { status: 500 }
    );
  }
}
