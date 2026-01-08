"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

interface Chapter {
  id: string
  title_en: string
  title_ru: string
  slug: string
  description_en: string
  description_ru: string
  order_index: number
}

export function ChaptersManager() {
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title_en: "",
    title_ru: "",
    slug: "",
    description_en: "",
    description_ru: "",
    order_index: 0,
  })
  const { language } = useLanguage()
  const supabase = createClient()

  const t = {
    en: {
      title: "Manage Chapters",
      addChapter: "Add Chapter",
      titleEn: "Title (English)",
      titleRu: "Title (Russian)",
      slug: "Slug",
      descEn: "Description (English)",
      descRu: "Description (Russian)",
      order: "Order",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
    },
    ru: {
      title: "Управление главами",
      addChapter: "Добавить главу",
      titleEn: "Название (Английский)",
      titleRu: "Название (Русский)",
      slug: "Слаг",
      descEn: "Описание (Английский)",
      descRu: "Описание (Русский)",
      order: "Порядок",
      save: "Сохранить",
      cancel: "Отмена",
      edit: "Редактировать",
      delete: "Удалить",
    },
  }

  const text = t[language]

  useEffect(() => {
    fetchChapters()
  }, [])

  const fetchChapters = async () => {
    const { data } = await supabase.from("chapters").select("*").order("order_index")

    if (data) setChapters(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingId) {
      await supabase.from("chapters").update(formData).eq("id", editingId)
    } else {
      await supabase.from("chapters").insert([formData])
    }

    setFormData({
      title_en: "",
      title_ru: "",
      slug: "",
      description_en: "",
      description_ru: "",
      order_index: 0,
    })
    setIsAdding(false)
    setEditingId(null)
    fetchChapters()
  }

  const handleEdit = (chapter: Chapter) => {
    setFormData(chapter)
    setEditingId(chapter.id)
    setIsAdding(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await supabase.from("chapters").delete().eq("id", id)
      fetchChapters()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{text.title}</h2>
        <Button onClick={() => setIsAdding(!isAdding)}>
          <Plus className="mr-2 h-4 w-4" />
          {text.addChapter}
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
                      <Label>{text.titleEn}</Label>
                      <Input
                        value={formData.title_en}
                        onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{text.titleRu}</Label>
                      <Input
                        value={formData.title_ru}
                        onChange={(e) => setFormData({ ...formData, title_ru: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{text.slug}</Label>
                      <Input
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        required
                      />
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
                  </div>

                  <div className="space-y-2">
                    <Label>{text.descEn}</Label>
                    <Textarea
                      value={formData.description_en}
                      onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{text.descRu}</Label>
                    <Textarea
                      value={formData.description_ru}
                      onChange={(e) => setFormData({ ...formData, description_ru: e.target.value })}
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
        {chapters.map((chapter) => (
          <Card key={chapter.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{language === "en" ? chapter.title_en : chapter.title_ru}</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(chapter)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(chapter.id)}>
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
