"use client"

import { Button } from "@/components/ui/button"
import { User, Users } from 'lucide-react'
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

export type VoiceType = "male" | "female"

interface VoiceSelectorProps {
  value: VoiceType
  onChange: (voice: VoiceType) => void
}

export function VoiceSelector({ value, onChange }: VoiceSelectorProps) {
  const { t } = useLanguage()

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">{t.voice}:</span>
      <div className="flex gap-1 bg-muted rounded-lg p-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange("male")}
          className="relative overflow-hidden"
        >
          {value === "male" && (
            <motion.div
              layoutId="voice-indicator"
              className="absolute inset-0 bg-blue-500 rounded-md"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <User className="h-4 w-4 mr-1 relative z-10" />
          <span className="relative z-10">{t.voiceMale}</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange("female")}
          className="relative overflow-hidden"
        >
          {value === "female" && (
            <motion.div
              layoutId="voice-indicator"
              className="absolute inset-0 bg-pink-500 rounded-md"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <Users className="h-4 w-4 mr-1 relative z-10" />
          <span className="relative z-10">{t.voiceFemale}</span>
        </Button>
      </div>
    </div>
  )
}
