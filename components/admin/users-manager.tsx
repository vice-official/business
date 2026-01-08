"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"

interface UserProfile {
  id: string
  email: string
  full_name: string
  role: string
  created_at: string
}

export function UsersManager() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const { language } = useLanguage()
  const supabase = createClient()

  const t = {
    en: {
      title: "Users",
      email: "Email",
      name: "Name",
      role: "Role",
      joined: "Joined",
    },
    ru: {
      title: "Пользователи",
      email: "Email",
      name: "Имя",
      role: "Роль",
      joined: "Присоединился",
    },
  }

  const text = t[language]

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const { data } = await supabase.from("user_profiles").select("*").order("created_at", { ascending: false })

    if (data) setUsers(data)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{text.title}</h2>

      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{user.full_name || user.email}</span>
                <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  {text.email}: {user.email}
                </p>
                <p>
                  {text.joined}: {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
