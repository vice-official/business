"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

interface UserProfile {
  email: string
  full_name: string
  role: string
}

export function UserMenu() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()
  const { language } = useLanguage()

  const t = {
    en: {
      signIn: "Sign In",
      signUp: "Sign Up",
      profile: "Profile",
      admin: "Admin Dashboard",
      settings: "Settings",
      logout: "Logout",
    },
    ru: {
      signIn: "Войти",
      signUp: "Регистрация",
      profile: "Профиль",
      admin: "Админ-панель",
      settings: "Настройки",
      logout: "Выйти",
    },
  }

  const text = t[language]

  useEffect(() => {
    checkUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[v0] Auth state changed:", event, session?.user?.email)

      if (event === "SIGNED_IN" && session) {
        const { data: profile } = await supabase
          .from("user_profiles")
          .select("email, full_name, role")
          .eq("id", session.user.id)
          .single()

        if (profile) {
          console.log("[v0] User profile loaded:", profile)
          setUser(profile)
        }
        setLoading(false)
      } else if (event === "SIGNED_OUT") {
        console.log("[v0] User signed out")
        setUser(null)
        setLoading(false)
      } else if (event === "INITIAL_SESSION") {
        if (session) {
          const { data: profile } = await supabase
            .from("user_profiles")
            .select("email, full_name, role")
            .eq("id", session.user.id)
            .single()

          if (profile) {
            setUser(profile)
          }
        }
        setLoading(false)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const checkUser = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      console.log("[v0] Current session:", session?.user?.email)

      if (session?.user) {
        const { data: profile } = await supabase
          .from("user_profiles")
          .select("email, full_name, role")
          .eq("id", session.user.id)
          .single()

        if (profile) {
          console.log("[v0] Initial user profile:", profile)
          setUser(profile)
        }
      }
    } catch (error) {
      console.error("[v0] Error checking user:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    console.log("[v0] Logging out...")
    await supabase.auth.signOut()

    setUser(null)
    router.push("/")
    router.refresh()
  }

  if (loading) {
    return null
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/auth/login">
          <Button variant="ghost" size="sm">
            {text.signIn}
          </Button>
        </Link>
        <Link href="/auth/signup">
          <Button size="sm">{text.signUp}</Button>
        </Link>
      </div>
    )
  }

  const initials = user.full_name
    ? user.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.email[0].toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.full_name || "User"}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            {user.role === "admin" && <p className="text-xs leading-none text-primary font-semibold mt-1">Admin</p>}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user.role === "admin" && (
          <DropdownMenuItem asChild>
            <Link href="/admin" className="cursor-pointer">
              <Shield className="mr-2 h-4 w-4" />
              {text.admin}
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          {text.logout}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
