"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AudioPlayer } from "@/components/audio-player"
import { Button } from "@/components/ui/button"
import { ChevronDown } from 'lucide-react'
import type { BusinessCase } from "@/lib/business-cases-data"
import type { VoiceType } from "@/components/voice-selector"
import { useLanguage } from "@/lib/language-context"

interface BusinessCaseCardProps {
  businessCase: BusinessCase
  voice: VoiceType
}

export function BusinessCaseCard({ businessCase, voice }: BusinessCaseCardProps) {
  const { t, language } = useLanguage()
  const [isExpanded, setIsExpanded] = useState(false)
  
  const audioUrl = voice === "male" ? businessCase.audioUrlMale : businessCase.audioUrlFemale

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-2xl">{businessCase.title}</CardTitle>
            <CardDescription className="mt-2 text-base">{businessCase.description}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsExpanded(!isExpanded)} className="shrink-0">
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </Button>
        </div>
      </CardHeader>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="space-y-6">
              <AudioPlayer 
                audioUrl={audioUrl} 
                transcript={businessCase.transcript[language]} 
              />

              {/* Key Points */}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{t.keyPoints}</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {businessCase.keyPoints[language].map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
