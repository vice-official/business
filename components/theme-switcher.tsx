"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        onClick={toggleTheme}
        variant="outline"
        size="icon"
        className="rounded-full h-10 w-10 relative overflow-hidden bg-transparent"
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === "dark" ? (
            <motion.div
              key="sun"
              initial={{ y: -30, rotate: -90, opacity: 0 }}
              animate={{ y: 0, rotate: 0, opacity: 1 }}
              exit={{ y: 30, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sun className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ y: 30, rotate: 90, opacity: 0 }}
              animate={{ y: 0, rotate: 0, opacity: 1 }}
              exit={{ y: -30, rotate: -90, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Moon className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  )
}
