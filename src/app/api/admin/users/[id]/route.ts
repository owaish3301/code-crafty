import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isUserAdmin } from "@/lib/auth-utils";

export const dynamic = 'force-dynamic'

// PATCH /api/admin/users/:id - Update a user's role (admin only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    
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
      where: { id: userId },
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
