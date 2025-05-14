import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "../[...nextauth]/route";

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Get the user session
    const session = await getServerSession(authOptions);    // If no session exists, the user is not logged in
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { isAdmin: false, message: "Not authenticated" }, 
        { 
          status: 401,
          headers: {
            'Cache-Control': 'no-store, must-revalidate'
          }
        }
      );
    }

    // Look up the user in the database to check their role
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { role: true },
    });    // Check if the user has the ADMIN role
    const isAdmin = user?.role === "ADMIN";

    if (isAdmin) {
      return NextResponse.json(
        { isAdmin: true },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=3600'
          }
        }
      );
    } else {
      return NextResponse.json(
        { isAdmin: false, message: "User does not have admin privileges" }, 
        { 
          status: 403,
          headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=3600'
          }
        }
      );
    }  } catch (error) {
    console.error("Error checking admin status:", error);
    return NextResponse.json(
      { isAdmin: false, message: "Failed to check admin status" }, 
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store, must-revalidate'
        }
      }
    );
  }
}
