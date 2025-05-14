"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: string;
  createdAt?: string;
  githubUsername?: string | null;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  });

  // Fetch users data
  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await fetch(`/api/admin/users?page=${pagination.page}&limit=${pagination.limit}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        
        const data = await response.json();
        setUsers(data.users);
        setPagination(data.pagination);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }
    
    fetchUsers();
  }, [pagination.page, pagination.limit]);

  // Function to toggle user role
  async function toggleUserRole(user: User) {
    try {
      const newRole = user.role === "ADMIN" ? "USER" : "ADMIN";
      
      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update user role");
      }
      
      // Update the user in the state
      setUsers(users.map(u => 
        u.id === user.id ? { ...u, role: newRole } : u
      ));
      
    } catch (error) {
      console.error("Error updating user role:", error);
      alert("Failed to update user role");
    }
  }

  // Function to handle pagination
  function goToPage(page: number) {
    if (page >= 1 && page <= pagination.pages) {
      setPagination(prev => ({ ...prev, page }));
    }
  }

  return (
    <div className="container py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Link href="/admin">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="py-4 text-center text-red-500">{error}</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 text-left font-medium">User</th>
                      <th className="pb-2 text-left font-medium">Email</th>
                      <th className="pb-2 text-left font-medium">GitHub</th>
                      <th className="pb-2 text-left font-medium">Role</th>
                      <th className="pb-2 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b">
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            {user.image && (
                              <Image
                                src={user.image}
                                alt={user.name || "User"}
                                width={32}
                                height={32}
                                className="h-8 w-8 rounded-full"
                              />
                            )}
                            <span>{user.name || "No name"}</span>
                          </div>
                        </td>
                        <td className="py-3">{user.email || "No email"}</td>
                        <td className="py-3">{user.githubUsername || "N/A"}</td>
                        <td className="py-3">
                          <span className={`rounded px-2 py-1 text-xs ${
                            user.role === "ADMIN" 
                              ? "bg-blue-100 text-blue-800" 
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <Button
                            size="sm"
                            variant={user.role === "ADMIN" ? "destructive" : "outline"}
                            onClick={() => toggleUserRole(user)}
                          >
                            {user.role === "ADMIN" ? "Remove Admin" : "Make Admin"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="mt-4 flex justify-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(pagination.page - 1)}
                    disabled={pagination.page === 1}
                  >
                    Previous
                  </Button>
                  
                  {[...Array(pagination.pages)].map((_, i) => (
                    <Button
                      key={i}
                      variant={pagination.page === i + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => goToPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(pagination.page + 1)}
                    disabled={pagination.page === pagination.pages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
