import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const templates = [
  { id: "1", name: "Calculator App", difficulty: "Beginner" },
  { id: "2", name: "Portfolio Website", difficulty: "Intermediate" },
  { id: "3", name: "Quiz App", difficulty: "Beginner" },
  { id: "4", name: "Weather App", difficulty: "Intermediate" },
]

export function ProjectTemplates() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <Card key={template.id} className="border border-border">
              <CardContent className="p-4">
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">Difficulty: {template.difficulty}</p>
                  <Button size="sm" className="mt-2">
                    Start →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
