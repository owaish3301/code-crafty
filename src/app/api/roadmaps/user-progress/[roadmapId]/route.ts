// src/app/api/roadmaps/user-progress/[roadmapId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserRoadmapProgress } from "@/lib/mock-data";

interface RouteParams {
  params: {
    roadmapId: string;
  };
}

export async function GET(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }
    
    const { roadmapId } = params;
    
    // Get the user's progress on this roadmap
    // In a real implementation, this would come from the database
    const userProgress = getUserRoadmapProgress(
      // Use a mock user ID since we're using mock data
      "mock-user-id", 
      roadmapId
    );
    
    return NextResponse.json(userProgress);
  } catch (error: unknown) {
    console.error(`Error fetching user progress for roadmap ${params.roadmapId}:`, error);
    const message = error instanceof Error ? error.message : "Failed to fetch user progress";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
