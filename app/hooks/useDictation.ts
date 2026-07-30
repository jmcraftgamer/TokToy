'use client'

import { useState, useRef, useCallback } from 'react'

export function useDictation(onTranscript: (text: string) => void) {
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef<any>(null)

  const toggle = useCallback(() => {
    if (listening) {
      recognitionRef.current?.stop()
      setListening(false)
    } else {
      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (!SR) return
      const recognition = new SR()
      recognition.lang = 'pt-BR'
      recognition.interimResults = true
      recognition.continuous = true
      recognition.onresult = (e: any) => {
        const transcript = Array.from(e.results)
          .map((r: any) => r[0].transcript)
          .join('')
        onTranscript(transcript)
      }
      recognition.onerror = () => setListening(false)
      recognition.onend = () => setListening(false)
      recognition.start()
      recognitionRef.current = recognition
      setListening(true)
    }
  }, [listening, onTranscript])

  return { listening, toggle }
}
