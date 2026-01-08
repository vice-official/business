"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

interface Chapter {
  id: string
  title_en: string
  title_ru: string
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

export function BusinessCasesManager() {
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [cases, setCases] = useState<BusinessCase[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    chapter_id: "",
    title: "",
    description_en: "",
    description_ru: "",
    transcript_en: "",
    transcript_ru: "",
    audio_url_male: "",
    audio_url_female: "",
    order_index: 0,
  })
  const { language } = useLanguage()
  const supabase = createClient()

  const t = {
    en: {
      title: "Manage Business Cases",
      addCase: "Add Business Case",
      chapter: "Chapter",
      caseTitle: "Title",
      descEn: "Description (English)",
      descRu: "Description (Russian)",
      transcriptEn: "Transcript (English)",
      transcriptRu: "Transcript (Russian)",
      audioMale: "Audio URL (Male)",
      audioFemale: "Audio URL (Female)",
      order: "Order",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
    },
    ru: {
      title: "Управление бизнес-кейсами",
      addCase: "Добавить бизнес-кейс",
      chapter: "Глава",
      caseTitle: "Название",
      descEn: "Описание (Английский)",
      descRu: "Описание (Русский)",
      transcriptEn: "Транскрипция (Английский)",
      transcriptRu: "Транскрипция (Русский)",
      audioMale: "URL аудио (Мужской)",
      audioFemale: "URL аудио (Женский)",
      order: "Порядок",
      save: "Сохранить",
      cancel: "Отмена",
      edit: "Редактировать",
      delete: "Удалить",
    },
  }

  const text = t[language]

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: chaptersData } = await supabase.from("chapters").select("id, title_en, title_ru").order("order_index")

    const { data: casesData } = await supabase.from("business_cases").select("*").order("order_index")

    if (chaptersData) setChapters(chaptersData)
    if (casesData) setCases(casesData)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingId) {
      await supabase.from("business_cases").update(formData).eq("id", editingId)
    } else {
      await supabase.from("business_cases").insert([formData])
    }

    setFormData({
      chapter_id: "",
      title: "",
      description_en: "",
      description_ru: "",
      transcript_en: "",
      transcript_ru: "",
      audio_url_male: "",
      audio_url_female: "",
      order_index: 0,
    })
    setIsAdding(false)
    setEditingId(null)
    fetchData()
  }

  const handleEdit = (businessCase: BusinessCase) => {
    setFormData(businessCase)
    setEditingId(businessCase.id)
    setIsAdding(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await supabase.from("business_cases").delete().eq("id", id)
      fetchData()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{text.title}</h2>
        <Button onClick={() => setIsAdding(!isAdding)}>
          <Plus className="mr-2 h-4 w-4" />
          {text.addCase}
        </Button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{text.chapter}</Label>
                      <Select
                        value={formData.chapter_id}
                        onValueChange={(value) => setFormData({ ...formData, chapter_id: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {chapters.map((chapter) => (
                            <SelectItem key={chapter.id} value={chapter.id}>
                              {language === "en" ? chapter.title_en : chapter.title_ru}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>{text.caseTitle}</Label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>{text.descEn}</Label>
                    <Textarea
                      value={formData.description_en}
                      onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{text.descRu}</Label>
                    <Textarea
                      value={formData.description_ru}
                      onChange={(e) => setFormData({ ...formData, description_ru: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{text.transcriptEn}</Label>
                    <Textarea
                      value={formData.transcript_en}
                      onChange={(e) => setFormData({ ...formData, transcript_en: e.target.value })}
                      required
                      rows={5}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{text.transcriptRu}</Label>
                    <Textarea
                      value={formData.transcript_ru}
                      onChange={(e) => setFormData({ ...formData, transcript_ru: e.target.value })}
                      required
                      rows={5}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{text.audioMale}</Label>
                      <Input
                        value={formData.audio_url_male}
                        onChange={(e) => setFormData({ ...formData, audio_url_male: e.target.value })}
                        placeholder="/audio/male/chapter/case.mp3"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{text.audioFemale}</Label>
                      <Input
                        value={formData.audio_url_female}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            audio_url_female: e.target.value,
                          })
                        }
                        placeholder="/audio/female/chapter/case.mp3"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>{text.order}</Label>
                    <Input
                      type="number"
                      value={formData.order_index}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          order_index: Number.parseInt(e.target.value),
                        })
                      }
                      required
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit">{text.save}</Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsAdding(false)
                        setEditingId(null)
                      }}
                    >
                      {text.cancel}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-4">
        {cases.map((businessCase) => (
          <Card key={businessCase.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{businessCase.title}</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(businessCase)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(businessCase.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
