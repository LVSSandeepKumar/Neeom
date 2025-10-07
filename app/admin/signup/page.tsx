"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"

export default function AdminSignupPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const { isAuthenticated, signup } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      setError("You are already logged in")
      router.push("/admin")
    }
  }, [isAuthenticated, router])

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    const success = await signup(username, password)
    if (success) {
      router.push("/admin")
    } else {
      setError("Signup failed")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              Signup
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full mt-2"
              onClick={() => router.push("/admin/login")}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
