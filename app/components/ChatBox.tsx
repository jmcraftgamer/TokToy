'use client'

import { useState, useRef } from 'react'

const presetQuestions = [
  'Como criar um vídeo com IA?',
  'Quanto custa o plano Premium?',
  'Como conectar minha conta TikTok?',
  'Quais formatos de vídeo são suportados?',
]

export default function ChatBox({ onSend }: { onSend: (text: string) => void }) {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLDivElement>(null)

  function handleSend() {
    const text = input.trim()
    if (!text) return
    onSend(text)
    setInput('')
    if (inputRef.current) {
      inputRef.current.innerHTML = ''
    }
    inputRef.current?.focus()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function handlePresetClick(q: string) {
    setInput(q)
    if (inputRef.current) {
      inputRef.current.innerHTML = q
      const range = document.createRange()
      const sel = window.getSelection()
      range.selectNodeContents(inputRef.current)
      range.collapse(false)
      sel?.removeAllRanges()
      sel?.addRange(range)
    }
    inputRef.current?.focus()
  }

  return (
    <div className="chat-wrapper">
      <div className="chat-box">
        <div
          ref={inputRef}
          className="chat-input"
          contentEditable
          role="textbox"
          data-placeholder="Você tem uma dúvida?"
          onInput={(e) => setInput(e.currentTarget.textContent || '')}
          onKeyDown={handleKeyDown}
          suppressContentEditableWarning
        />
        <div className="chat-controls">
          <div className="chat-ctrl-left">
            <button className="chat-btn" title="Anexar imagem">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <button className="chat-btn" title="Anexar arquivo">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
              </svg>
            </button>
          </div>
          <div className="chat-ctrl-right">
            <button className="chat-btn" title="Ditado">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                <path d="M19 10v2a7 7 0 01-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </button>
            <button className="chat-send" onClick={handleSend}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="chat-presets">
        {presetQuestions.map((q, i) => (
          <button key={i} className="preset-btn" onClick={() => handlePresetClick(q)}>
            {q}
          </button>
        ))}
      </div>
    </div>
  )
}
