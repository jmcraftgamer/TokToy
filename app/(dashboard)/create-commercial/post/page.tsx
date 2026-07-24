'use client'

import { useState, useRef } from 'react'

function RefBlock() {
  return (
    <div className="cv-ref-block" style={{ width: 100, minHeight: 140 }}>
      <div className="ref-icon-area">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <span className="ref-badge">+</span>
      </div>
      <span className="ref-label">Referências</span>
    </div>
  )
}

export default function PostCommercialPage() {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLDivElement>(null)

  function handleSend() {
    const text = input.trim()
    if (!text) return
    setInput('')
    if (inputRef.current) inputRef.current.innerHTML = ''
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="cv-page">
      <div className="cv-initial">
        <div className="hero-section">
          <h1 className="hero-logo">TokToy</h1>
          <p className="hero-subtitle">Criar Post com <span className="hero-highlight">IA</span></p>
        </div>

        <div className="cv-init-chat">
          <div className="cv-chat-row">
            <RefBlock />
            <div className="cv-rect">
              <div
                ref={inputRef}
                className="cv-write-area"
                contentEditable
                role="textbox"
                data-placeholder="Descreva o post que deseja criar..."
                onInput={(e) => setInput(e.currentTarget.textContent || '')}
                onKeyDown={handleKeyDown}
                suppressContentEditableWarning
              />
              <div className="cv-actions">
                <div className="cv-actions-left">
                  <button className="chat-btn" title="Anexar imagem">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                  <button className="chat-btn" title="Anexar arquivo">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                    </svg>
                  </button>
                </div>
                <div className="cv-actions-right">
                  <button className="chat-btn" title="Ditado">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" /><path d="M19 10v2a7 7 0 01-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                  </button>
                  <button className="chat-send" onClick={handleSend}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
