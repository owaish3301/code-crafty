"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminRoadmapsPage() {
  // This is a placeholder component for now
  // It will be expanded in the future to include roadmap management functionality
  
  return (
    <div className="container py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Roadmap Management</h1>
        <Link href="/admin">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Roadmaps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center">
            <h3 className="text-lg font-medium">Roadmap Management Coming Soon</h3>
            <p className="mt-2 text-muted-foreground">
              This page will allow you to create, edit, and manage learning roadmaps for different technologies.
            </p>
            <div className="mt-4">
              <Button disabled>Create New Roadmap</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
