import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"

export function NoLogsPrompt() {
  return (
    <Card className="border-dashed border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Log Your Learning
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">
          Start logging what you've learned to track your progress and generate personalized projects.
        </p>
        <Button>Log Learning</Button>
      </CardContent>
    </Card>
  )
}
