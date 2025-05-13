import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  
  return (
    <div className="container px-4 py-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      </div>
      
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Welcome, {session?.user?.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Hello Administrator! This is your admin dashboard where you can manage users, roadmaps, and other aspects of the application.
          </p>
        </div>
        
        <Link 
          href="/admin/users" 
          className="flex flex-col items-center justify-center rounded-lg border bg-card p-6 shadow-sm hover:bg-muted/50 transition-colors"
        >
          <h3 className="text-lg font-semibold">User Management</h3>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            View and manage users, assign roles, and track user activity
          </p>
        </Link>
        
        <Link 
          href="/admin/roadmaps" 
          className="flex flex-col items-center justify-center rounded-lg border bg-card p-6 shadow-sm hover:bg-muted/50 transition-colors"
        >
          <h3 className="text-lg font-semibold">Roadmap Management</h3>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Create, edit, and manage learning roadmaps for different technologies
          </p>
        </Link>
      </div>
    </div>
  );
}
