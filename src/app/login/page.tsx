"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { signIn, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter, useSearchParams } from "next/navigation"
import { Github, Code } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const [animateCard, setAnimateCard] = useState(false)

  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl)
    }
    // Trigger animation after component mounts
    setAnimateCard(true)
  }, [status, router, callbackUrl])

  const handleSignIn = async () => {
    setIsLoading(true)
    await signIn("github", { callbackUrl })
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted/30">
      {/* Navigation */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CodeCrafted</span>
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center p-4">
        <div className="grid w-full max-w-6xl gap-8 md:grid-cols-2">
          <div
            className={`flex flex-col justify-center transition-all duration-700 ${animateCard ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
          >
            <h1 className="mb-4 text-4xl font-bold tracking-tight">Welcome to CodeCrafted</h1>
            <p className="mb-6 text-xl text-muted-foreground">
              Your AI-powered coding companion for structured learning and project-based mastery.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckIcon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Expert Roadmaps</h3>
                  <p className="text-sm text-muted-foreground">
                    Follow structured learning paths for various technologies
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckIcon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">AI-Generated Projects</h3>
                  <p className="text-sm text-muted-foreground">
                    Get personalized projects based on your learning progress
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckIcon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Smart Feedback</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive detailed AI analysis of your code with suggestions
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`flex items-center justify-center transition-all duration-700 delay-300 ${animateCard ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
          >
            <Card className="w-full max-w-md">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Sign in to CodeCrafted</CardTitle>
                <CardDescription className="text-center">
                  Continue your coding journey with personalized learning
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Sign in with</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={handleSignIn}
                  disabled={isLoading || status === "loading"}
                  className="w-full py-6 transition-all hover:bg-muted/50 hover:border-primary"
                >
                  <Github className="mr-2 h-5 w-5" />
                  {isLoading ? "Signing in..." : "Sign in with GitHub"}
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or</span>
                  </div>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Create one with GitHub
                  </Link>
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-center text-xs text-muted-foreground w-full">
                  By signing in, you agree to our{" "}
                  <Link href="/terms" className="hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t bg-background py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} CodeCrafted. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
