"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Upload, X, ImageIcon } from "lucide-react"

interface ImageUploadProps {
  value?: string
  onChange: (value: string) => void
  onRemove: () => void
  disabled?: boolean
}

export default function ImageUpload({ value, onChange, onRemove, disabled }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    try {
      // Simular upload - em produção, implementar upload real
      const formData = new FormData()
      formData.append("file", file)

      // Simular delay do upload
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simular URL retornada
      const mockUrl = `/placeholder.svg?height=300&width=300&text=${file.name}`
      onChange(mockUrl)
    } catch (error) {
      console.error("Erro no upload:", error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative">
          <div className="relative aspect-square w-full max-w-sm mx-auto">
            <Image src={value || "/placeholder.svg"} alt="Upload" fill className="object-cover rounded-lg" />
          </div>
          <Button
            type="button"
            onClick={onRemove}
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            disabled={disabled}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div className="text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <label htmlFor="image-upload" className="cursor-pointer">
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  {isUploading ? "Enviando..." : "Clique para fazer upload"}
                </span>
                <input
                  id="image-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleUpload}
                  disabled={disabled || isUploading}
                />
              </label>
              <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
            </div>
          </div>
        </div>
      )}

      {!value && (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          disabled={disabled || isUploading}
          onClick={() => document.getElementById("image-upload")?.click()}
        >
          <Upload className="w-4 h-4 mr-2" />
          {isUploading ? "Enviando..." : "Selecionar Imagem"}
        </Button>
      )}
    </div>
  )
}
