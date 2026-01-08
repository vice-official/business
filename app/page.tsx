"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { LanguageSwitcher } from "@/components/language-switcher"
import { UserMenu } from "@/components/user-menu"
import { VoiceSelector, type VoiceType } from "@/components/voice-selector"
import { BusinessCaseCard } from "@/components/business-case-card"
import { Headphones, BookOpen, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"

interface Chapter {
  id: string
  title_en: string
  title_ru: string
  slug: string
  description_en: string
  description_ru: string
  order_index: number
}

interface BusinessCase {
  id: string
  chapter_id: string
  title: string
  description_en: string
  description_ru: string
  transcript_en: string
  transcript_ru: string
  audio_url_male: string
  audio_url_female: string
  order_index: number
}

export default function HomePage() {
  const { t, language } = useLanguage()
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null)
  const [voice, setVoice] = useState<VoiceType>("male")
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [businessCases, setBusinessCases] = useState<BusinessCase[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: chaptersData } = await supabase.from("chapters").select("*").order("order_index")

    const { data: casesData } = await supabase.from("business_cases").select("*").order("order_index")

    if (chaptersData) setChapters(chaptersData)
    if (casesData) setBusinessCases(casesData)
    setLoading(false)
  }

  const currentChapter = chapters.find((c) => c.id === selectedChapter)
  const currentCases = businessCases.filter((bc) => bc.chapter_id === selectedChapter)

  const handleBackToChapters = () => {
    setSelectedChapter(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                {selectedChapter && (
                  <Button variant="ghost" size="icon" onClick={handleBackToChapters} className="mr-2">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                )}
                <div className="bg-primary/10 p-2 rounded-xl">
                  <Headphones className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-foreground">{t.title}</h1>
                  <p className="text-muted-foreground mt-1 text-base">{t.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedChapter && <VoiceSelector value={voice} onChange={setVoice} />}
                <LanguageSwitcher />
                <ThemeSwitcher />
                <UserMenu />
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">{language === "en" ? "Loading..." : "Загрузка..."}</p>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {!selectedChapter ? (
              <motion.div
                key="chapters"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="max-w-5xl mx-auto"
              >
                {/* Page Title */}
                <div className="text-center mb-12">
                  <h2 className="text-5xl font-bold text-foreground mb-4 text-balance">
                    {language === "en" ? "Select a Chapter" : "Выберите главу"}
                  </h2>
                  <p className="text-xl text-muted-foreground text-pretty">
                    {language === "en"
                      ? "Explore business cases organized by topic"
                      : "Изучайте бизнес-кейсы, организованные по темам"}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {chapters.map((chapter, index) => {
                    const caseCount = businessCases.filter((bc) => bc.chapter_id === chapter.id).length
                    return (
                      <motion.div
                        key={chapter.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="h-full"
                      >
                        <div
                          onClick={() => setSelectedChapter(chapter.id)}
                          className="group relative bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer overflow-hidden h-full flex flex-col"
                        >
                          {/* Background gradient effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Content */}
                          <div className="relative flex-1 flex flex-col">
                            <div className="flex items-start justify-between mb-4">
                              <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary/20 transition-colors">
                                <BookOpen className="h-6 w-6 text-primary" />
                              </div>
                              <div className="text-sm font-semibold text-primary/60 group-hover:text-primary transition-colors">
                                {caseCount} {language === "en" ? "cases" : "кейсов"}
                              </div>
                            </div>

                            <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors flex-1">
                              {language === "en" ? chapter.title_en : chapter.title_ru}
                            </h3>

                            <div className="flex items-center text-muted-foreground group-hover:text-foreground transition-colors mt-auto">
                              <span className="text-sm">
                                {language === "en" ? "Explore chapter" : "Перейти к главе"}
                              </span>
                              <svg
                                className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="cases"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="max-w-6xl mx-auto"
              >
                {currentChapter && (
                  <>
                    {/* Chapter Header */}
                    <div className="text-center mb-12">
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-bold text-foreground mb-4 text-balance"
                      >
                        {language === "en" ? currentChapter.title_en : currentChapter.title_ru}
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground"
                      >
                        {currentCases.length} {language === "en" ? "business cases" : "бизнес-кейсов"}
                      </motion.p>
                    </div>

                    {/* Cases Grid */}
                    <div className="grid grid-cols-1 gap-8">
                      {currentCases.map((businessCase, index) => (
                        <motion.div
                          key={businessCase.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <BusinessCaseCard
                            businessCase={{
                              id: businessCase.id,
                              title: businessCase.title,
                              description:
                                language === "en" ? businessCase.description_en : businessCase.description_ru,
                              audioUrlMale: businessCase.audio_url_male || "",
                              audioUrlFemale: businessCase.audio_url_female || "",
                              transcript: {
                                en: businessCase.transcript_en,
                                ru: businessCase.transcript_ru,
                              },
                              keyPoints: {
                                en: [],
                                ru: [],
                              },
                            }}
                            voice={voice}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
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
