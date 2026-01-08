"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button onClick={() => setIsOpen(!isOpen)} variant="outline" size="icon" className="rounded-full h-10 w-10">
          <Languages className="h-5 w-5" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 right-0 bg-card border border-border rounded-lg shadow-xl overflow-hidden z-50 min-w-[140px]"
            >
              <button
                onClick={() => {
                  setLanguage("en")
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-2.5 text-left hover:bg-accent transition-colors ${
                  language === "en" ? "bg-accent text-accent-foreground font-semibold" : "text-foreground"
                }`}
              >
                {t.languages.en}
              </button>
              <button
                onClick={() => {
                  setLanguage("ru")
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-2.5 text-left hover:bg-accent transition-colors ${
                  language === "ru" ? "bg-accent text-accent-foreground font-semibold" : "text-foreground"
                }`}
              >
                {t.languages.ru}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
