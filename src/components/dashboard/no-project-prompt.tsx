import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function NoProjectPrompt() {
  return (
    <Card className="border-dashed border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Generate Your First Project
        </CardTitle>
      </CardHeader>
      <CardContent>        <p className="mb-4 text-muted-foreground">
          Based on what you&apos;ve learned, we can generate a personalized project for you to practice your skills.
        </p>
        <Button>Generate Project</Button>
      </CardContent>
    </Card>
  )
}
