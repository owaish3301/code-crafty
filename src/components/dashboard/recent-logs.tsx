import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays } from "lucide-react"

interface Log {
  id: string
  topic: string
  date: string
}

interface RecentLogsProps {
  logs: Log[]
}

export function RecentLogs({ logs }: RecentLogsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Learning Logs</CardTitle>
      </CardHeader>
      <CardContent>        {logs.length === 0 ? (
          <p className="text-muted-foreground">You haven&apos;t logged any learning yet.</p>
        ) : (
          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log.id} className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <CalendarDays className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Learned {log.topic}</p>
                  <p className="text-sm text-muted-foreground">{log.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
