"use client"

import { motion } from "framer-motion"
import { AlertCircle, Home } from 'lucide-react'
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export default function NotFound() {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-6">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {language === "en" ? "Chapter Not Found" : "Глава не найдена"}
        </h1>
        
        <p className="text-muted-foreground mb-8">
          {language === "en" 
            ? "The chapter you're looking for doesn't exist or has been moved." 
            : "Глава, которую вы ищете, не существует или была перемещена."}
        </p>
        
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
        >
          <Home className="h-5 w-5" />
          {language === "en" ? "Back to Home" : "На главную"}
        </Link>
      </motion.div>
    </div>
  )
}
