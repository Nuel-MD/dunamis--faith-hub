"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Sun, Lock } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // In a real application, you would validate credentials against your backend
    // This is a mock implementation for demonstration purposes
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock validation - in a real app, this would be handled by your authentication system
      if (email === "admin@example.com" && password === "password") {
        router.push("/admin/dashboard")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-2 bg-primary/20 rounded-full mb-4">
            <Sun className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">Dunamis Faith Hub</h1>
          <p className="text-muted-foreground">Admin Portal</p>
        </div>

        <Card className="border-2">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-primary/10 rounded-full">
                <Lock className="h-5 w-5 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="p-3 text-sm bg-destructive/10 text-destructive rounded-md">{error}</div>}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-2"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-2"
                />
              </div>

              <Button type="submit" className="w-full relative overflow-hidden group" disabled={isLoading}>
                <span className="relative z-10">{isLoading ? "Signing in..." : "Sign in"}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-yellow-600 group-hover:opacity-90 transition-opacity"></span>
              </Button>

              <div className="text-center text-sm text-muted-foreground mt-4 p-3 bg-muted rounded-md">
                <p>For demo purposes, use:</p>
                <p className="font-medium">Email: admin@example.com</p>
                <p className="font-medium">Password: password</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

