import { Card, CardContent } from "@/components/ui/card"

interface DashboardHeaderProps {
  name: string
}

export function DashboardHeader({ name }: DashboardHeaderProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome, {name} 👋</h1>
        <p className="text-muted-foreground">
          Track your progress, manage your projects, and continue your learning journey.
        </p>
      </CardContent>
    </Card>
  )
}
