import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Circle } from "lucide-react"

interface Roadmap {
  id: string
  name: string
  progress: number
  topics: {
    id: string
    name: string
    completed: boolean
  }[]
}

interface RoadmapProgressProps {
  roadmaps: Roadmap[]
}

export function RoadmapProgress({ roadmaps }: RoadmapProgressProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Roadmaps</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {roadmaps.map((roadmap) => (
            <div key={roadmap.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{roadmap.name}</h3>
                <span className="text-sm text-muted-foreground">{roadmap.progress}% complete</span>
              </div>
              <Progress value={roadmap.progress} className="h-2" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                {roadmap.topics.map((topic) => (
                  <div key={topic.id} className="flex items-center gap-2">
                    {topic.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className={topic.completed ? "text-primary font-medium" : "text-muted-foreground"}>
                      {topic.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
