"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChaptersManager } from "./chapters-manager"
import { BusinessCasesManager } from "./business-cases-manager"
import { UsersManager } from "./users-manager"
import { useLanguage } from "@/lib/language-context"
import { BookOpen, Briefcase, Users } from "lucide-react"
import { motion } from "framer-motion"

export function AdminDashboard() {
  const { language } = useLanguage()

  const t = {
    en: {
      title: "Admin Dashboard",
      overview: "Overview",
      chapters: "Chapters",
      cases: "Business Cases",
      users: "Users",
    },
    ru: {
      title: "Админ-панель",
      overview: "Обзор",
      chapters: "Главы",
      cases: "Бизнес-кейсы",
      users: "Пользователи",
    },
  }

  const text = t[language]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
            {text.title}
          </h1>
        </motion.div>

        <Tabs defaultValue="chapters" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="chapters" className="gap-2">
              <BookOpen className="h-4 w-4" />
              {text.chapters}
            </TabsTrigger>
            <TabsTrigger value="cases" className="gap-2">
              <Briefcase className="h-4 w-4" />
              {text.cases}
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users className="h-4 w-4" />
              {text.users}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chapters" className="mt-6">
            <ChaptersManager />
          </TabsContent>

          <TabsContent value="cases" className="mt-6">
            <BusinessCasesManager />
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <UsersManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
