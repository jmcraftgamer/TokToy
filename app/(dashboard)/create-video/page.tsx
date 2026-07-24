'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  text: string
}

const mockVideos = [
  { name: 'Comercial Produto X', duration: '0:30', date: 'Hoje' },
  { name: 'Promoção TikTok Shop', duration: '0:15', date: 'Ontem' },
  { name: 'Vídeo Viral - Verão', duration: '0:45', date: 'Ontem' },
  { name: 'Unboxing Produto Y', duration: '1:00', date: '3 dias' },
]

function RefBlock() {
  return (
    <div className="cv-ref-block">
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

function Avatar({ name }: { name: string }) {
  return (
    <div className="msg-avatar">{name.charAt(0).toUpperCase()}</div>
  )
}

export default function CreateVideoPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [showChat, setShowChat] = useState(false)
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLDivElement>(null)
  const inputRef2 = useRef<HTMLDivElement>(null)
  const historyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight
    }
  }, [messages])

  function handleSend(source: 'initial' | 'split') {
    const ref = source === 'initial' ? inputRef : inputRef2
    const text = input.trim()
    if (!text) return

    setShowChat(true)
    setMessages((prev) => [...prev, { role: 'user', text }])

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `Ótimo! Recebi sua solicitação: "${text}". Estou processando e em breve gerarei seu vídeo.`,
        },
      ])
    }, 800)

    setInput('')
    if (ref.current) ref.current.innerHTML = ''
  }

  function handleInput(e: React.FormEvent<HTMLDivElement>) {
    setInput(e.currentTarget.textContent || '')
  }

  function handleKeyDown(source: 'initial' | 'split', e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend(source)
    }
  }

  const inputArea = (ref: React.RefObject<HTMLDivElement>, source: 'initial' | 'split') => (
    <div className="cv-chat-row">
      <RefBlock />
      <div className="cv-rect">
        <div
          ref={ref}
          className="cv-write-area"
          contentEditable
          role="textbox"
          data-placeholder="Descreva o vídeo que deseja criar..."
          onInput={handleInput}
          onKeyDown={(e) => handleKeyDown(source, e)}
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
            <button className="chat-send" onClick={() => handleSend(source)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="cv-page">
      {!showChat ? (
        <div className="cv-initial">
          <div className="hero-section">
            <h1 className="hero-logo">TokToy</h1>
            <p className="hero-subtitle">Criar Vídeos com <span className="hero-highlight">IA</span></p>
          </div>

          <div className="cv-init-chat">
            {inputArea(inputRef, 'initial')}
          </div>
        </div>
      ) : (
        <div className="cv-split">
          <div className="cv-left">
            <div className="cv-history" ref={historyRef}>
              {messages.map((msg, i) => (
                <div key={i} className={`cv-msg ${msg.role}`}>
                  <Avatar name={msg.role === 'user' ? 'Você' : 'T'} />
                  <div className="cv-msg-body">
                    <span className="cv-msg-name">{msg.role === 'user' ? 'Você' : 'TokToy IA'}</span>
                    <span className="cv-msg-text">{msg.text}</span>
                  </div>
                </div>
              ))}
            </div>

            {inputArea(inputRef2, 'split')}
          </div>

          <div className="cv-right">
            <div className="cv-video-list">
              <h3 className="cv-vlist-title">Histórico de vídeos</h3>
              {mockVideos.map((v, i) => (
                <div key={i} className="vid-item">
                  <div className="vid-frame">
                    <div className="vid-frame-bg">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                    <span className="vid-frame-dur">{v.duration}</span>
                  </div>
                  <span className="vid-name">{v.name}</span>
                  <span className="vid-meta">{v.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
