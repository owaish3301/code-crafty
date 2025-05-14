// src/app/api/auth/test/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import prisma from "@/lib/prisma";

// A test route to verify authentication and Prisma connection
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    // Check Prisma connection with a simple query
    const userCount = await prisma.user.count();
    
    return NextResponse.json({ 
      success: true, 
      message: "Auth and database connection success",
      session: session,
      userCount: userCount
    });
  } catch (error) {
    console.error("Auth test error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
