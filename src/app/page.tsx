import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, BookOpen, Sparkles, CheckCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CodeCrafted</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/roadmaps" className="text-sm text-muted-foreground hover:text-foreground">
              Roadmaps
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div className="flex flex-col gap-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Master Coding with <span className="text-primary">AI-Guided</span> Projects
                </h1>
                <p className="text-xl text-muted-foreground">
                  Learn programming through personalized projects, expert roadmaps, and AI-powered feedback that adapts
                  to your learning journey.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href="/login">
                    <Button size="lg" className="w-full sm:w-auto">
                      Start Learning Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/roadmaps">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Explore Roadmaps
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] w-full rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 p-1 shadow-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full max-w-md rounded-md bg-card p-4 shadow-lg">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-xs font-medium">Project: Weather App</div>
                    </div>
                    <div className="rounded-md bg-black p-4 font-mono text-xs text-green-400">
                      <div className="mb-2 text-white">// Module 1: Setting up the API client</div>
                      <div>class WeatherApiClient {"{"}</div>
                      <div className="ml-4">private final String apiKey;</div>
                      <div className="ml-4">private final String baseUrl;</div>
                      <div className="ml-4"></div>
                      <div className="ml-4">public WeatherApiClient(String apiKey) {"{"}</div>
                      <div className="ml-8">this.apiKey = apiKey;</div>
                      <div className="ml-8">this.baseUrl = "https://api.weather.com";</div>
                      <div className="ml-4">{"}"}</div>
                      <div className="ml-4"></div>
                      <div className="ml-4">public WeatherData getWeather(String city) {"{"}</div>
                      <div className="ml-8">// Implementation here</div>
                      <div className="ml-4">{"}"}</div>
                      <div>{"}"}</div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">Module 1/5 - API Integration</div>
                      <Button size="sm" variant="outline">
                        Submit for Review
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Our platform guides you through a structured learning journey, from selecting a roadmap to building
                real-world projects with AI assistance.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center rounded-lg border bg-card p-6 text-center shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Choose Your Path</h3>
                <p className="text-muted-foreground">
                  Select from various technology roadmaps like Java, React, Python, and more to guide your learning
                  journey.
                </p>
              </div>

              <div className="flex flex-col items-center rounded-lg border bg-card p-6 text-center shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">AI-Generated Projects</h3>
                <p className="text-muted-foreground">
                  Our AI creates personalized projects based on what you've learned, with step-by-step guidance for
                  implementation.
                </p>
              </div>

              <div className="flex flex-col items-center rounded-lg border bg-card p-6 text-center shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Smart Feedback</h3>
                <p className="text-muted-foreground">
                  Get detailed AI feedback on your code, track your progress, and improve based on personalized
                  suggestions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Platform Features</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Our comprehensive platform is designed to provide you with everything you need to master programming
                skills.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Expert Roadmaps",
                  description:
                    "Follow structured learning paths for various technologies, sourced from industry experts at roadmap.sh.",
                },
                {
                  title: "Learning Logs",
                  description: "Track what you've learned and see your progress over time with detailed learning logs.",
                },
                {
                  title: "AI Project Generator",
                  description:
                    "Get personalized project ideas based on your skills and learning progress, tailored to your level.",
                },
                {
                  title: "Modular Learning",
                  description:
                    "Break down complex projects into manageable modules, sections, and sub-sections for easier learning.",
                },
                {
                  title: "Web Code Editor",
                  description:
                    "Code directly in your browser with our integrated code editor, no setup or installation required.",
                },
                {
                  title: "Intelligent Feedback",
                  description:
                    "Receive detailed AI analysis of your code with suggestions for improvement and best practices.",
                },
              ].map((feature, index) => (
                <div key={index} className="rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">What Our Users Say</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Hear from developers who have accelerated their learning journey with our platform.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  name: "Alex Johnson",
                  role: "Junior Developer",
                  content:
                    "The AI-generated projects helped me apply what I learned in a practical way. The feedback system is like having a mentor available 24/7.",
                  image: "/placeholder.svg?height=80&width=80",
                },
                {
                  name: "Sarah Chen",
                  role: "Computer Science Student",
                  content:
                    "I've tried many platforms, but the structured roadmaps and project-based learning approach here made a huge difference in my understanding.",
                  image: "/placeholder.svg?height=80&width=80",
                },
                {
                  name: "Michael Rodriguez",
                  role: "Career Switcher",
                  content:
                    "As someone transitioning to tech, this platform gave me the guidance I needed. The personalized projects helped me build a portfolio while learning.",
                  image: "/placeholder.svg?height=80&width=80",
                },
              ].map((testimonial, index) => (
                <div key={index} className="rounded-lg border bg-card p-6 shadow-sm">
                  <p className="mb-4 italic text-muted-foreground">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Ready to Start Your Coding Journey?</h2>
            <p className="mx-auto mb-8 max-w-2xl">
              Join thousands of developers who are mastering programming through our AI-guided platform.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/login">
                <Button size="lg" variant="secondary">
                  Sign Up Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/roadmaps">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
                >
                  Explore Roadmaps
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <Code className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">CodeCrafted</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Your AI-powered coding companion for structured learning and project-based mastery.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/roadmaps" className="text-muted-foreground hover:text-foreground">
                    Roadmaps
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/documentation" className="text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} CodeCrafted. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
