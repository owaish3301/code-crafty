import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

export function NoRoadmapPrompt() {
  return (
    <Card className="border-dashed border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Select a Roadmap
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">
          Choose a learning roadmap to start tracking your progress. We have roadmaps for Java, React, Python, and more.
        </p>
        <Button>Explore Roadmaps</Button>
      </CardContent>
    </Card>
  )
}
