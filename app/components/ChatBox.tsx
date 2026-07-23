'use client'

import { useState, useRef, useEffect } from 'react'

const presetQuestions = [
  'Como criar um vídeo com IA?',
  'Quanto custa o plano Premium?',
  'Como conectar minha conta TikTok?',
  'Quais formatos de vídeo são suportados?',
]

interface Message {
  role: 'user' | 'assistant'
  text: string
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [showChat, setShowChat] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  function handleSend(text?: string) {
    const msg = (text || input).trim()
    if (!msg) return

    setShowChat(true)
    setMessages((prev) => [...prev, { role: 'user', text: msg }])

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `Recebi sua mensagem! Em breve implementaremos a resposta da IA para: "${msg}"`,
        },
      ])
    }, 800)

    setInput('')
    inputRef.current?.focus()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="chat-container">
      {!showChat ? (
        <div className="chat-title-area">
          <p className="chat-title">Você tem uma dúvida sobre nosso aplicativo?</p>
        </div>
      ) : (
        <div className="chat-messages" ref={chatRef}>
          {messages.map((msg, i) => (
            <div key={i} className={`chat-message ${msg.role}`}>
              <div className="message-bubble">{msg.text}</div>
            </div>
          ))}
        </div>
      )}

      <div className="chat-input-area">
        <div className="chat-input-left">
          <button className="chat-action-btn" title="Anexar imagem">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <button className="chat-action-btn" title="Anexar arquivo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
            </svg>
          </button>
        </div>
        <input
          ref={inputRef}
          type="text"
          className="chat-input"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="chat-input-right">
          <button className="chat-action-btn" title="Ditado">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
              <path d="M19 10v2a7 7 0 01-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>
          <button className="chat-send-btn" onClick={() => handleSend()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      {!showChat && (
        <div className="chat-presets">
          {presetQuestions.map((q, i) => (
            <button key={i} className="preset-btn" onClick={() => handleSend(q)}>
              {q}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
