"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BusinessCaseCard } from "@/components/business-case-card"
import { sections } from "@/lib/business-cases-data"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { LanguageSwitcher } from "@/components/language-switcher"
import { VoiceSelector, type VoiceType } from "@/components/voice-selector"
import { Headphones, BookOpen, ArrowLeft } from 'lucide-react'
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import { notFound } from 'next/navigation'

export default function ChapterPage({ params }: { params: { id: string } }) {
  const [selectedCase, setSelectedCase] = useState<string | null>(null)
  const [voiceType, setVoiceType] = useState<VoiceType>("male")
  const { t, language } = useLanguage()

  const section = sections.find(s => s.id === params.id)

  if (!section) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Link 
                  href="/" 
                  className="bg-card hover:bg-muted p-2 rounded-xl transition-colors border border-border"
                >
                  <ArrowLeft className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                </Link>
                <div className="bg-primary/10 p-2 rounded-xl">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{section.title[language]}</h1>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {section.cases.length} {language === "en" ? "cases" : "кейсов"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <VoiceSelector value={voiceType} onChange={setVoiceType} />
                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {section.cases.map((businessCase, caseIndex) => (
            <motion.div
              key={businessCase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: caseIndex * 0.1 }}
            >
              <BusinessCaseCard
                businessCase={businessCase}
                isExpanded={selectedCase === businessCase.id}
                onToggle={() => setSelectedCase(selectedCase === businessCase.id ? null : businessCase.id)}
                voiceType={voiceType}
              />
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>{t.footer}</p>
        </div>
      </footer>
    </div>
  )
}
