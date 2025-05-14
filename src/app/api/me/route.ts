// src/app/api/me/route.ts
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET(_req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }    // Get user from database with additional info
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        projects: {
          take: 5,
          orderBy: {
            updatedAt: 'desc'
          },
          select: {
            id: true,
            name: true,
            description: true,
            status: true,
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error: unknown) {
    console.error("Error fetching user data:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch user data";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
