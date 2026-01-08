"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Mail, Lock } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()
  const { language } = useLanguage()

  const t = {
    en: {
      title: "Welcome Back",
      description: "Sign in to your account to continue",
      email: "Email",
      password: "Password",
      signIn: "Sign In",
      noAccount: "Don't have an account?",
      signUp: "Sign up",
      signingIn: "Signing in...",
    },
    ru: {
      title: "С возвращением",
      description: "Войдите в свой аккаунт, чтобы продолжить",
      email: "Email",
      password: "Пароль",
      signIn: "Войти",
      noAccount: "Нет аккаунта?",
      signUp: "Зарегистрироваться",
      signingIn: "Вход...",
    },
  }

  const text = t[language]

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    console.log("[v0] Login attempt for:", email)

    if (!email || !email.includes("@")) {
      setError(language === "en" ? "Please enter a valid email address" : "Введите корректный email адрес")
      setLoading(false)
      return
    }

    if (!password) {
      setError(language === "en" ? "Please enter your password" : "Введите ваш пароль")
      setLoading(false)
      return
    }

    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log("[v0] Login response:", { error: error?.message, hasSession: !!data.session, hasUser: !!data.user })

      if (error) throw error

      if (!data.session || !data.user) {
        throw new Error("No session created")
      }

      const { data: profile, error: profileError } = await supabase
        .from("user_profiles")
        .select("role")
        .eq("id", data.user.id)
        .single()

      console.log("[v0] User profile:", profile)

      if (profileError) {
        console.error("[v0] Profile error:", profileError)
      }

      await new Promise((resolve) => setTimeout(resolve, 100))

      if (profile?.role === "admin") {
        console.log("[v0] Redirecting to admin panel")
        router.push("/admin")
      } else {
        console.log("[v0] Redirecting to home")
        router.push("/")
      }

      router.refresh()
    } catch (err: any) {
      console.error("[v0] Login error:", err)
      let errorMessage = err.message

      if (err.message.includes("Invalid") || err.message.includes("invalid")) {
        errorMessage =
          language === "en"
            ? "Invalid credentials. Please check your email and password."
            : "Неверные данные. Проверьте email и пароль."
      } else if (err.message.includes("Email not confirmed")) {
        errorMessage =
          language === "en"
            ? "Please verify your email address before signing in."
            : "Пожалуйста, подтвердите ваш email перед входом."
      }

      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-border/50 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {text.title}
            </CardTitle>
            <CardDescription>{text.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{text.email}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{text.password}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg"
                >
                  {error}
                </motion.div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? text.signingIn : text.signIn}
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              {text.noAccount}{" "}
              <Link href="/auth/signup" className="text-primary hover:underline font-medium">
                {text.signUp}
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
