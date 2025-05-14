import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isUserAdmin } from "@/lib/auth-utils";

export const dynamic = 'force-dynamic'

// GET /api/admin/users - List all users (admin only)
export async function GET(req: NextRequest) {
  try {
    // Check if the current user is an admin
    const isAdmin = await isUserAdmin();
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }
    
    // Get query parameters for pagination
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    
    // Get total count for pagination
    const totalUsers = await prisma.user.count();
    
    // Fetch users with pagination
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        githubUsername: true,
        // Don't include sensitive information
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
    
    return NextResponse.json({
      users,
      pagination: {
        total: totalUsers,
        page,
        limit,
        pages: Math.ceil(totalUsers / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/users/:id - Update a user's role (admin only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Check if the current user is an admin
    const isAdmin = await isUserAdmin();
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }
    
    // Get the request body
    const body = await req.json();
    const { role } = body;
    
    if (!role || !["USER", "ADMIN"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role. Must be 'USER' or 'ADMIN'." },
        { status: 400 }
      );
    }
    
    // Update the user's role
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
