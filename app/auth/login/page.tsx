"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/lib/store/auth-store"
import { Eye, EyeOff, LogIn } from "lucide-react"

export default function Page() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const login = useAuthStore((state) => state.login)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(email, password)
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col items-center justify-center px-2 py-4 sm:px-4 sm:py-6 lg:flex-none lg:px-8 xl:px-12 w-full lg:w-[30%] min-h-screen overflow-auto overflow-x-hidden">
        <div className="mx-auto w-full max-w-sm">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">Enter your credentials to sign in to your account</p>
          </div>
          <div className="mt-10">
            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-11 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                </div>
                {error && <div className="text-sm text-destructive">{error}</div>}
                <Button type="submit" className="w-full h-11 gap-2" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                  <LogIn className="h-4 w-4" />
                </Button>
              </form>
              <div className="mt-6 text-center text-sm">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
              <div className="mt-8 border-t pt-6">
                <div className="text-center text-xs text-muted-foreground">
                  <p className="font-medium mb-1">Demo Accounts:</p>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="border rounded-md p-2">
                      <p className="font-medium">User</p>
                      <p>user@office.com</p>
                      <p>user123</p>
                    </div>
                    <div className="border rounded-md p-2">
                      <p className="font-medium">Admin</p>
                      <p>admin@office.com</p>
                      <p>admin123</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block w-[70%] min-h-screen bg-gray-200 bg-[url('/OMS-image-1.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 z-10" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="max-w-md text-center bg-black/40 p-8 rounded-xl">
            <h2 className="heading-2 text-white mb-4">Streamline Your Office Management</h2>
            <p className="text-white/80">
              Manage tickets, track progress, and improve productivity with our comprehensive office management system.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
