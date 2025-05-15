"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Edit, Trash2, ArrowLeft } from "lucide-react"
import RoadmapEditor from "@/components/admin/RoadmapEditor"
import { getAllRoadmaps } from "@/lib/mock-data"

export default function AdminRoadmapsPage() {
  const [view, setView] = useState<"list" | "editor">("list")
  const [selectedRoadmap, setSelectedRoadmap] = useState<string | null>(null)
  const roadmaps = getAllRoadmaps()

  const handleCreateNew = () => {
    setSelectedRoadmap(null)
    setView("editor")
  }

  const handleEditRoadmap = (id: string) => {
    setSelectedRoadmap(id)
    setView("editor")
  }

  return (
    <div className="container py-10 mx-auto">
      {view === "list" ? (
        <>
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Roadmap Management</h1>
            <Button onClick={handleCreateNew}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Roadmap
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {roadmaps.map((roadmap) => (
              <Card key={roadmap.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{roadmap.name}</CardTitle>
                  <CardDescription>{roadmap.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">ID: {roadmap.id}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleEditRoadmap(roadmap.id)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={() => setView("list")} className="mr-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to List
              </Button>
              <h1 className="text-3xl font-bold">{selectedRoadmap ? "Edit Roadmap" : "Create New Roadmap"}</h1>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Visual Roadmap Editor</CardTitle>
              <CardDescription>
                Design your learning roadmap by adding topics and connecting them together.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RoadmapEditor roadmapId={selectedRoadmap} />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
