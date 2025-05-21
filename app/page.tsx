import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, LayoutDashboard, Ticket, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-playfair text-xl font-bold">OMS</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/auth/login" className="text-sm font-medium hover:underline underline-offset-4">
            Login
          </Link>
          <Link href="/auth/signup" className="text-sm font-medium hover:underline underline-offset-4">
            Sign Up
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="heading-1 max-w-3xl">Streamline Your Office Management with Ease</h1>
                <p className="body-large max-w-[700px] text-muted-foreground mx-auto">
                  A comprehensive solution for managing office tickets, tasks, and resources in one place.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/login">
                  <Button size="lg" className="gap-2">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="lg" variant="outline">
                    View Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="heading-2">Key Features</h2>
                <p className="body max-w-[700px] text-muted-foreground mx-auto">
                  Everything you need to manage your office efficiently
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="flex flex-col items-center space-y-2 p-6 bg-background rounded-lg shadow-sm">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Ticket className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="heading-4">Ticket Management</h3>
                  <p className="text-muted-foreground text-center">
                    Create, track, and resolve tickets with ease. Assign priorities and categories.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 p-6 bg-background rounded-lg shadow-sm">
                  <div className="p-3 rounded-full bg-primary/10">
                    <LayoutDashboard className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="heading-4">Intuitive Dashboard</h3>
                  <p className="text-muted-foreground text-center">
                    Get a comprehensive overview of all activities and pending tasks at a glance.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 p-6 bg-background rounded-lg shadow-sm">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="heading-4">User Management</h3>
                  <p className="text-muted-foreground text-center">
                    Manage user roles and permissions. Assign tasks to specific team members.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="heading-2">How It Works</h2>
                <p className="body max-w-[700px] text-muted-foreground mx-auto">
                  Simple, efficient, and effective office management in three easy steps
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    1
                  </div>
                  <h3 className="heading-4">Create Tickets</h3>
                  <p className="text-muted-foreground text-center">
                    Submit detailed tickets with all necessary information and attachments.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    2
                  </div>
                  <h3 className="heading-4">Track Progress</h3>
                  <p className="text-muted-foreground text-center">
                    Monitor the status of tickets and tasks through our intuitive dashboard.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    3
                  </div>
                  <h3 className="heading-4">Resolve Issues</h3>
                  <p className="text-muted-foreground text-center">
                    Collaborate with team members to efficiently resolve tickets and tasks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="heading-2">Testimonials</h2>
                <p className="body max-w-[700px] text-muted-foreground mx-auto">
                  See what our customers have to say about our office management system
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                <div className="flex flex-col p-6 bg-background rounded-lg shadow-sm">
                  <div className="flex items-center space-x-2 mb-4">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <div className="text-sm font-medium">Verified Customer</div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "This system has completely transformed how we manage office requests. Everything is organized and
                    trackable now."
                  </p>
                  <div className="mt-auto">
                    <div className="font-medium">Sarah Johnson</div>
                    <div className="text-sm text-muted-foreground">Office Manager, TechCorp</div>
                  </div>
                </div>
                <div className="flex flex-col p-6 bg-background rounded-lg shadow-sm">
                  <div className="flex items-center space-x-2 mb-4">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <div className="text-sm font-medium">Verified Customer</div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "The analytics feature helps us identify bottlenecks and improve our processes. Highly recommended!"
                  </p>
                  <div className="mt-auto">
                    <div className="font-medium">Michael Chen</div>
                    <div className="text-sm text-muted-foreground">IT Director, GlobalFirm</div>
                  </div>
                </div>
                <div className="flex flex-col p-6 bg-background rounded-lg shadow-sm">
                  <div className="flex items-center space-x-2 mb-4">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <div className="text-sm font-medium">Verified Customer</div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "User-friendly interface and powerful features. Our team adapted to it quickly and productivity has
                    increased."
                  </p>
                  <div className="mt-auto">
                    <div className="font-medium">Emily Rodriguez</div>
                    <div className="text-sm text-muted-foreground">Operations Lead, StartupX</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t items-center px-4 md:px-6">
        <p className="text-xs text-muted-foreground">© 2023 Office Management System. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
