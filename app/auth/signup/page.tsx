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
import { Mail, Lock, User } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()
  const { language } = useLanguage()

  const t = {
    en: {
      title: "Create Account",
      description: "Sign up to start learning business cases",
      fullName: "Full Name",
      email: "Email",
      password: "Password",
      signUp: "Sign Up",
      haveAccount: "Already have an account?",
      signIn: "Sign in",
      signingUp: "Creating account...",
      checkEmail: "Check your email to verify your account!",
    },
    ru: {
      title: "Создать аккаунт",
      description: "Зарегистрируйтесь, чтобы начать изучение бизнес-кейсов",
      fullName: "Полное имя",
      email: "Email",
      password: "Пароль",
      signUp: "Зарегистрироваться",
      haveAccount: "Уже есть аккаунт?",
      signIn: "Войти",
      signingUp: "Создание аккаунта...",
      checkEmail: "Проверьте email для подтверждения аккаунта!",
    },
  }

  const text = t[language]

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    console.log("[v0] Signup attempt for:", email)

    if (!email || !email.includes("@")) {
      setError(language === "en" ? "Please enter a valid email address" : "Введите корректный email адрес")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError(language === "en" ? "Password must be at least 6 characters" : "Пароль должен быть не менее 6 символов")
      setLoading(false)
      return
    }

    if (!fullName.trim()) {
      setError(language === "en" ? "Please enter your full name" : "Введите ваше полное имя")
      setLoading(false)
      return
    }

    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/callback`,
          data: {
            full_name: fullName,
          },
        },
      })

      console.log("[v0] Signup response:", { error: error?.message, hasSession: !!data.session, hasUser: !!data.user })

      if (error) throw error

      if (data.session) {
        // User was logged in immediately (no email confirmation required)
        console.log("[v0] User logged in after signup, redirecting to home")

        // Wait a bit for the session to be fully saved
        await new Promise((resolve) => setTimeout(resolve, 100))

        router.push("/")
        router.refresh()
      } else {
        // Show success message if email confirmation is required
        console.log("[v0] Email confirmation required")
        setSuccess(true)
      }
    } catch (err: any) {
      console.error("[v0] Signup error:", err)
      const errorMessage = err.message.includes("invalid")
        ? language === "en"
          ? "Invalid email format. Please check your email address."
          : "Неверный формат email. Проверьте правильность адреса."
        : err.message
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card className="border-border/50 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-primary">{text.checkEmail}</CardTitle>
            </CardHeader>
          </Card>
        </motion.div>
      </div>
    )
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
            <form onSubmit={handleEmailSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">{text.fullName}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

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
                    minLength={6}
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
                {loading ? text.signingUp : text.signUp}
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              {text.haveAccount}{" "}
              <Link href="/auth/login" className="text-primary hover:underline font-medium">
                {text.signIn}
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
