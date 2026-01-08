"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, FileText, X, Gauge, AlertCircle } from 'lucide-react'
import { useLanguage } from "@/lib/language-context"

interface AudioPlayerProps {
  audioUrl: string
  transcript: string
}

const PLAYBACK_RATES = [1, 1.5, 2, 3, 4]

export function AudioPlayer({ audioUrl, transcript }: AudioPlayerProps) {
  const { t } = useLanguage()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showTranscript, setShowTranscript] = useState(false)
  const [showSpeedMenu, setShowSpeedMenu] = useState(false)
  const [audioError, setAudioError] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)
    const handleError = () => {
      setAudioError(true)
      setIsPlaying(false)
    }
    const handleCanPlay = () => {
      setAudioError(false)
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)
    audio.addEventListener("canplay", handleCanPlay)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("canplay", handleCanPlay)
    }
  }, [])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (audioError) {
      return
    }

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch (error) {
        console.error("Audio playback failed:", error)
        setAudioError(true)
        setIsPlaying(false)
      }
    }
  }

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = value[0]
    setCurrentTime(value[0])
  }

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    const newVolume = value[0]
    audio.volume = newVolume
    setVolume(newVolume)
  }

  const setSpeed = (rate: number) => {
    const audio = audioRef.current
    if (audio) {
      audio.playbackRate = rate
    }
    setPlaybackRate(rate)
    setShowSpeedMenu(false)
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-4">
      <Card className="p-6 bg-card border-border shadow-lg">
        <audio ref={audioRef} src={audioUrl} preload="metadata" />

        {audioError && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <div className="text-sm text-destructive">
              <p className="font-semibold">{t.audioError}</p>
              <p className="text-xs mt-1">{t.audioErrorDescription}</p>
            </div>
          </div>
        )}

        <div className="space-y-2 mb-6">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="cursor-pointer"
            disabled={audioError}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={togglePlay}
              size="lg"
              className="rounded-full h-14 w-14 bg-primary hover:bg-primary/90 shadow-lg"
              disabled={audioError}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" fill="currentColor" />
              ) : (
                <Play className="h-6 w-6 ml-0.5" fill="currentColor" />
              )}
            </Button>
          </motion.div>

          <div className="relative">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                variant="outline"
                size="lg"
                className="min-w-[110px] font-semibold"
                disabled={audioError}
              >
                <Gauge className="h-4 w-4 mr-2" />
                {playbackRate}x
              </Button>
            </motion.div>

            <AnimatePresence>
              {showSpeedMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowSpeedMenu(false)} />

                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 left-0 bg-card border border-border rounded-lg shadow-xl overflow-hidden z-50 min-w-[110px]"
                  >
                    {PLAYBACK_RATES.map((rate) => (
                      <button
                        key={rate}
                        onClick={() => setSpeed(rate)}
                        className={`w-full px-4 py-2.5 text-left hover:bg-accent transition-colors ${
                          rate === playbackRate ? "bg-accent text-accent-foreground font-semibold" : "text-foreground"
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2 flex-1 max-w-xs min-w-[150px]">
            <Volume2 className="h-5 w-5 text-muted-foreground shrink-0" />
            <Slider
              value={[volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="cursor-pointer"
              disabled={audioError}
            />
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setShowTranscript(!showTranscript)}
              variant={showTranscript ? "default" : "outline"}
              size="lg"
            >
              <FileText className="h-5 w-5 mr-2" />
              {t.transcript}
            </Button>
          </motion.div>
        </div>
      </Card>

      {showTranscript && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 bg-muted/50 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {t.transcriptText}
              </h3>
              <Button onClick={() => setShowTranscript(false)} variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
              <p className="whitespace-pre-wrap">{transcript}</p>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
