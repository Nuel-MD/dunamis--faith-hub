"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Sun, Lock } from "lucide-react";
import Cookies from "js-cookie";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Send login request to backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      const { token, refreshToken } = data;

      // Store tokens in cookies
      Cookies.set("token", token, { secure: true, sameSite: "strict" });
      Cookies.set("refreshToken", refreshToken, {
        secure: true,
        sameSite: "strict",
      });

      // Verify user is an admin
      const profileResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!profileResponse.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const profileData = await profileResponse.json();
      if (profileData.role !== "admin") {
        throw new Error("Access denied: Admins only");
      }

      // Redirect to admin dashboard
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
      // Clear any invalid tokens
      Cookies.remove("token");
      Cookies.remove("refreshToken");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-2 bg-primary/20 rounded-full mb-4">
            <Sun className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">
            Dunamis Faith Hub
          </h1>
          <p className="text-muted-foreground">Admin Portal</p>
        </div>

        <Card className="border-2">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-primary/10 rounded-full">
                <Lock className="h-5 w-5 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Admin Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm bg-destructive/10 text-destructive rounded-md">
                  {error}
                </div>
              )}

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
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full relative overflow-hidden group"
                disabled={isLoading}
              >
                <span className="relative z-10">
                  {isLoading ? "Signing in..." : "Sign in"}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-yellow-600 group-hover:opacity-90 transition-opacity"></span>
              </Button>

   
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
