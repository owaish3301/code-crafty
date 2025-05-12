"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { RoadmapProgress } from "@/components/dashboard/roadmap-progress"
import { RecentLogs } from "@/components/dashboard/recent-logs"
import { ProjectsSection } from "@/components/dashboard/projects-section"
import { FinishedProjects } from "@/components/dashboard/finished-projects"
import { ProjectTemplates } from "@/components/dashboard/project-templates"
import { NoRoadmapPrompt } from "@/components/dashboard/no-roadmap-prompt"
import { NoLogsPrompt } from "@/components/dashboard/no-logs-prompt"
import { NoProjectPrompt } from "@/components/dashboard/no-project-prompt"
import { redirect } from "next/navigation"

// Mock data - in a real app, this would come from an API
const mockUserData = {
  name: "Owaish",
  hasRoadmap: true,
  roadmaps: [
    {
      id: "java-roadmap",
      name: "Java Roadmap",
      progress: 43,
      topics: [
        { id: "1", name: "Variables", completed: true },
        { id: "2", name: "Control Flow", completed: true },
        { id: "3", name: "Functions", completed: true },
        { id: "4", name: "OOP Basics", completed: false },
        { id: "5", name: "Inheritance", completed: false },
        { id: "6", name: "Interfaces", completed: false },
        { id: "7", name: "Collections", completed: false },
      ],
    },
  ],
  logs: [
    { id: "1", topic: "Functions", date: "May 12, 2025" },
    { id: "2", topic: "Control Flow", date: "May 10, 2025" },
    { id: "3", topic: "Variables", date: "May 8, 2025" },
  ],
  activeProjects: [
    { id: "1", name: "Blog CMS App", modules: 5, currentModule: 2 },
    { id: "2", name: "Task Tracker", modules: 3, currentModule: 1 },
  ],
  finishedProjects: [{ id: "1", name: "Weather App", score: 85 }],
}

export function UserDashboard() {
  const { data: session, status } = useSession()
  const [userData, setUserData] = useState(mockUserData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if the user is authenticated
    if (status === "unauthenticated") {
      redirect("/login")
    }

    // Fetch user data from API
    if (status === "authenticated" && session) {
      setLoading(true)
      
      // Get user data from the API
      fetch("/api/me")
        .then(response => {
          if (!response.ok) {
            throw new Error("Failed to fetch user data")
          }
          return response.json()
        })
        .then(data => {
          // Update the user name with the real data
          setUserData(prevData => ({
            ...prevData,
            name: data.name || session.user?.name || "User",
            // Keep mock data for other fields for now
          }))
        })
        .catch(error => {
          console.error("Error fetching user data:", error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [session, status])

  if (status === "loading" || loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col gap-8 p-6">
          <div className="h-24 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"></div>
          <div className="h-64 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 p-6">
        <DashboardHeader name={userData.name} />

        {userData.hasRoadmap ? (
          <>
            <RoadmapProgress roadmaps={userData.roadmaps} />
            <RecentLogs logs={userData.logs} />
          </>
        ) : (
          <NoRoadmapPrompt />
        )}

        {userData.hasRoadmap && userData.logs.length === 0 && <NoLogsPrompt />}

        {userData.hasRoadmap && userData.logs.length > 0 && userData.activeProjects.length === 0 && <NoProjectPrompt />}

        {userData.activeProjects.length > 0 && <ProjectsSection projects={userData.activeProjects} />}

        {userData.finishedProjects.length > 0 && <FinishedProjects projects={userData.finishedProjects} />}

        <ProjectTemplates />
      </div>
    </DashboardLayout>
  )
}
