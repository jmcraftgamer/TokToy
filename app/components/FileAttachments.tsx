'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

export interface AttachedFile {
  id: string
  file: File
  url: string
  type: 'image' | 'video' | 'audio' | 'other'
}

export function useFileAttachments() {
  const [files, setFiles] = useState<AttachedFile[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const openPicker = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const handleSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || [])
    const newFiles: AttachedFile[] = selected.map((f) => ({
      id: Math.random().toString(36).slice(2),
      file: f,
      url: URL.createObjectURL(f),
      type: f.type.startsWith('image/') ? 'image' : f.type.startsWith('video/') ? 'video' : f.type.startsWith('audio/') ? 'audio' : 'other',
    }))
    setFiles((prev) => [...prev, ...newFiles])
    e.target.value = ''
  }, [])

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const f = prev.find((x) => x.id === id)
      if (f) URL.revokeObjectURL(f.url)
      return prev.filter((x) => x.id !== id)
    })
  }, [])

  const clearFiles = useCallback(() => {
    files.forEach((f) => URL.revokeObjectURL(f.url))
    setFiles([])
  }, [files])

  return { files, inputRef, openPicker, handleSelect, removeFile, clearFiles }
}

export function AttachmentsBar({
  files,
  onRemove,
}: {
  files: AttachedFile[]
  onRemove: (id: string) => void
}) {
  if (files.length === 0) return null

  return (
    <div className="attachments-bar">
      {files.map((f) => (
        <div key={f.id} className="attachment-item">
          <div className="attachment-thumb">
            {f.type === 'image' ? (
              <img src={f.url} alt="" className="attachment-img" />
            ) : f.type === 'video' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><polygon points="5 3 19 12 5 21 5 3" /></svg>
            ) : f.type === 'audio' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
            )}
          </div>
          <span className="attachment-name">{f.file.name}</span>
          <button className="attachment-remove" onClick={() => onRemove(f.id)}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
      ))}
    </div>
  )
}
