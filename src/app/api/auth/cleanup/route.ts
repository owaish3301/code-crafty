// src/app/api/auth/cleanup/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// SECURITY WARNING: This route should be disabled in production
// and is only meant for development and debugging

export async function GET(req: NextRequest) {
  // Only allow this in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This route is not available in production" },
      { status: 403 }
    );
  }

  const key = req.nextUrl.searchParams.get("key");
  // Simple security check
  if (key !== "debug-auth-issues") {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const action = req.nextUrl.searchParams.get("action");

    if (action === "list-users") {
      const users = await prisma.user.findMany({
        include: {
          accounts: true,
        },
      });
        return NextResponse.json({
        users: users.map(user => ({
          id: user.id,
          email: user.email,
          name: user.name,
          accountsCount: user.accounts.length,
          accountProviders: user.accounts.map(acc => acc.provider),
        })),
      });
    }
    
    if (action === "delete-user") {
      const email = req.nextUrl.searchParams.get("email");
      if (!email) {
        return NextResponse.json(
          { error: "Email parameter is required" },
          { status: 400 }
        );
      }
      
      const user = await prisma.user.findUnique({
        where: { email },
      });
      
      if (!user) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }
      
      // Delete all related data
      await prisma.account.deleteMany({
        where: { userId: user.id },
      });
      
      await prisma.session.deleteMany({
        where: { userId: user.id },
      });
      
      await prisma.user.delete({
        where: { id: user.id },
      });
      
      return NextResponse.json({
        success: true,
        message: `User with email ${email} has been deleted`,
      });
    }
    
    if (action === "clear-all") {
      // DANGER: This will delete all auth data
      await prisma.account.deleteMany({});
      await prisma.session.deleteMany({});
      await prisma.user.deleteMany({});
      
      return NextResponse.json({
        success: true,
        message: "All authentication data has been cleared",
      });
    }

    return NextResponse.json(
      { error: "Invalid action. Valid actions: list-users, delete-user, clear-all" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Auth cleanup error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
