import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Project {
  id: string
  name: string
  score: number
}

interface FinishedProjectsProps {
  projects: Project[]
}

export function FinishedProjects({ projects }: FinishedProjectsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Finished Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="font-semibold">{project.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">Score: {project.score}%</Badge>
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Retry →
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
