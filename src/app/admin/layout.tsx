import type React from "react"
import { redirect } from "next/navigation"
import { isUserAdmin } from "@/lib/auth-utils"
import { ThemeToggle } from "@/components/theme-toggle"

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if user is admin
  const isAdmin = await isUserAdmin()

  // If not admin, redirect to dashboard
  if (!isAdmin) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
