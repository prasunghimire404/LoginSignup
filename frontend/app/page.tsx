"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Shield, User, Mail, Lock, CheckCircle, AlertCircle } from "lucide-react"
import UserProfile from "@/components/user-profile"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error">("error")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      fetchUserProfile(token)
    }
  }, [])

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch("http://localhost:3030/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const result = await response.json()
        setUser(result.data.user)
        setIsAuthenticated(true)
      } else {
        localStorage.removeItem("token")
      }
    } catch (error) {
      localStorage.removeItem("token")
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, type: "login" | "signup") => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string

    try {
      const response = await fetch(`http://localhost:3030/auth/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          ...(type === "signup" && { firstName, lastName }),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(`${type === "login" ? "Login" : "Account creation"} successful!`)
        setMessageType("success")
        if (data.data.token) {
          localStorage.setItem("token", data.data.token)
          await fetchUserProfile(data.data.token)
        }
      } else {
        setMessage(data.message || `${type} failed`)
        setMessageType("error")
      }
    } catch (error) {
      setMessage("Connection error. Make sure your backend is running on port 3030.")
      setMessageType("error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false)
    setUser(null)
    setMessage("")
  }

  if (isAuthenticated && user) {
    return <UserProfile user={user} onLogout={handleLogout} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/50 to-background">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center  min-w-full min-h-screen">
          <div className="flex items-center justify-center">
            <Card className="w-md shadow-xl border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center space-y-2">
                <div className="mx-auto p-3 bg-primary/10 rounded-xl w-fit">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold text-balance">Welcome</CardTitle>
                <CardDescription className="text-pretty">
                  Sign in to your account or create a new one to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Create Account</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="space-y-4">
                    <form onSubmit={(e) => handleSubmit(e, "login")} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="login-email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="login-password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            className="pl-10"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Signing in..." : "Sign In"}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-4">
                    <form onSubmit={(e) => handleSubmit(e, "signup")} className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" name="firstName" placeholder="John" disabled={isLoading} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" name="lastName" placeholder="Doe" disabled={isLoading} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-password"
                            name="password"
                            type="password"
                            placeholder="Create a password"
                            className="pl-10"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating account..." : "Create Account"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                {message && (
                  <Alert
                    className={
                      messageType === "success"
                        ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
                        : ""
                    }
                  >
                    {messageType === "success" ? (
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <AlertDescription className={messageType === "success" ? "text-green-800 dark:text-green-200" : ""}>
                      {message}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
