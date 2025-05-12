import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface Project {
  id: string
  name: string
  modules: number
  currentModule: number
}

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => {
            const progress = (project.currentModule / project.modules) * 100

            return (
              <div key={project.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{project.name}</h3>
                  <span className="text-sm text-muted-foreground">
                    Module {project.currentModule}/{project.modules}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex justify-end mt-2">
                  <Button size="sm">Continue →</Button>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
