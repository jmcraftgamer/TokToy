'use client'

import { useState, useRef, useEffect } from 'react'
import { useDictation } from '../../hooks/useDictation'
import { useFileAttachments, AttachmentsBar } from '../../components/FileAttachments'

interface Message {
  role: 'user' | 'assistant' | 'system'
  type: 'text' | 'thinking' | 'video_desc' | 'generating'
  text: string
}

interface Question {
  id: string
  text: string
  options: string[]
  answer: string | null
}

type Phase = 'initial' | 'thinking' | 'responding' | 'questioning' | 'generating'

function Avatar({ name }: { name: string }) {
  return <div className="msg-avatar">{name.charAt(0).toUpperCase()}</div>
}

function ThinkingDots() {
  const [dots, setDots] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setDots((d) => (d + 1) % 4), 400)
    return () => clearInterval(t)
  }, [])
  return <span>Pensando{'.'.repeat(dots)}</span>
}

function isVideoCreation(text: string): boolean {
  const lower = text.toLowerCase()
  const videoKeywords = [
    'criar', 'vídeo', 'video', 'videos', 'vídeos',
    'fazer', 'gravar', 'produzir', 'gerar',
    'comercial', 'tiktok', 'short', 'reels',
    'anúncio', 'propaganda', 'divulgar', 'promover',
    'vender', 'produto', 'post', 'história',
    'conteúdo', 'conteudo', 'publicar',
    'animação', 'animacao', 'vinheta', 'intro',
  ]
  return videoKeywords.some((k) => lower.includes(k))
}

function missingDetails(text: string): Question[] {
  const lower = text.toLowerCase()
  const questions: Question[] = []

  if (!lower.includes('9:16') && !lower.includes('16:9') && !lower.includes('1:1') && !lower.includes('4:5') && !lower.includes('proporção') && !lower.includes('proporcao') && !lower.includes('ratio')) {
    questions.push({
      id: 'ratio',
      text: 'Qual a proporção do vídeo?',
      options: ['9:16 (TikTok/Shorts)', '16:9 (YouTube)', '1:1 (Instagram)', '4:5 (Feed)'],
      answer: null,
    })
  }

  if (!lower.includes('realista') && !lower.includes('animado') && !lower.includes('cinematográfico') && !lower.includes('cinematografico') && !lower.includes('3d') && !lower.includes('vintage') && !lower.includes('estilo') && !lower.includes('desenho') && !lower.includes('cartoon')) {
    questions.push({
      id: 'style',
      text: 'Qual o estilo visual?',
      options: ['Realista', 'Cinematográfico', 'Animado / Cartoon', '3D / CGI'],
      answer: null,
    })
  }

  if (!lower.includes('segundo') && !lower.includes('minuto') && !lower.includes('duração') && !lower.includes('duracao') && !lower.includes('curto') && !lower.includes('rápido') && !lower.includes('rapido')) {
    questions.push({
      id: 'duration',
      text: 'Qual a duração do vídeo?',
      options: ['15 segundos', '30 segundos', '45 segundos', '60 segundos'],
      answer: null,
    })
  }

  if (!lower.includes('profissional') && !lower.includes('engraçado') && !lower.includes('engracado') && !lower.includes('educativo') && !lower.includes('emocionante') && !lower.includes('tom') && !lower.includes('sério') && !lower.includes('serio') && !lower.includes('divertido') && !lower.includes('inspirador')) {
    questions.push({
      id: 'tone',
      text: 'Qual o tom do vídeo?',
      options: ['Profissional', 'Divertido / Engraçado', 'Educativo', 'Emocionante / Inspirador'],
      answer: null,
    })
  }

  return questions
}

function parseAIResponse(text: string): { chat: string; prompt: string | null } {
  const chatMatch = text.match(/CHAT:\s*([\s\S]*?)(?:\nPROMPT:|$)/)
  const promptMatch = text.match(/PROMPT:\s*([\s\S]*)$/)
  return {
    chat: chatMatch ? chatMatch[1].trim() : text,
    prompt: promptMatch ? promptMatch[1].trim() : null,
  }
}

export default function CreateVideoPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [phase, setPhase] = useState<Phase>('initial')
  const [input, setInput] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null)
  const systemPromptRef = useRef('')
  const inputRef = useRef<HTMLDivElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)
  const { files, inputRef: fileInputRef, openPicker, handleSelect, removeFile } = useFileAttachments()
  const { listening, toggle: toggleDictation } = useDictation((text) => {
    if (inputRef.current) {
      inputRef.current.textContent = text
      setInput(text)
    }
  })

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages, phase])

  useEffect(() => {
    fetch('/prompts/instrucoes-video.txt')
      .then((r) => r.text())
      .then((t) => { systemPromptRef.current = t })
      .catch(() => {})
  }, [])

  function addMessage(msg: Message) {
    setMessages((prev) => [...prev, msg])
  }

  async function handleSend() {
    const text = input.trim()
    if (!text && files.length === 0) return

    addMessage({ role: 'user', type: 'text', text: text || '[Arquivos enviados]' })
    setInput('')
    if (inputRef.current) inputRef.current.innerHTML = ''

    setPhase('thinking')

    try {
      if (isVideoCreation(text)) {
        const missing = missingDetails(text)
        setQuestions(missing)

        if (missing.length > 0) {
          addMessage({
            role: 'assistant',
            type: 'video_desc',
            text: 'Vou criar um vídeo baseado no seu pedido! Antes disso, preciso de algumas informações para deixar o resultado perfeito.',
          })
          setCurrentQuestionIdx(0)
          setPhase('questioning')
          return
        }

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            systemPrompt: systemPromptRef.current,
          }),
        })

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}))
          addMessage({ role: 'assistant', type: 'text', text: `Erro: ${errData.error || 'tente novamente.'}` })
          setPhase('responding')
          return
        }

        const data = await res.json()
        const { chat, prompt } = parseAIResponse(data.response || '')

        addMessage({ role: 'assistant', type: 'video_desc', text: chat })

        if (prompt) {
          setPhase('generating')
          addMessage({ role: 'assistant', type: 'generating', text: 'Gerando seu vídeo...' })
          generateVideoWithPrompt(prompt)
        } else {
          setPhase('responding')
        }
      } else {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            systemPrompt: systemPromptRef.current,
          }),
        })

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}))
          addMessage({ role: 'assistant', type: 'text', text: `Erro: ${errData.error || 'tente novamente.'}` })
          setPhase('responding')
          return
        }

        const data = await res.json()
        addMessage({ role: 'assistant', type: 'text', text: data.response || 'Desculpe, não entendi. Pode reformular?' })
        setPhase('responding')
      }
    } catch (err: any) {
      addMessage({ role: 'assistant', type: 'text', text: `Erro de conexão: ${err.message}` })
      setPhase('responding')
    }
  }

  async function generateVideoWithPrompt(videoPrompt: string) {
    try {
      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: videoPrompt }),
      })

      if (res.status === 503) {
        const errData = await res.json().catch(() => ({}))
        if (errData.loading) {
          addMessage({ role: 'assistant', type: 'text', text: 'O modelo de vídeo está carregando. Tentando novamente em alguns segundos...' })
          setTimeout(() => generateVideoWithPrompt(videoPrompt), 5000)
          return
        }
        addMessage({ role: 'assistant', type: 'text', text: `Erro: ${errData.error || 'Serviço indisponível'}` })
        setPhase('responding')
        return
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        addMessage({ role: 'assistant', type: 'text', text: `Falha ao gerar vídeo: ${errData.error || 'tente novamente.'}` })
        setPhase('responding')
        return
      }

      const data = await res.json()
      if (data.videoUrl) {
        setGeneratedVideo(data.videoUrl)
        setMessages((prev) => prev.map((m) =>
          m.type === 'generating' ? { ...m, text: 'Vídeo gerado com sucesso!' } : m
        ))
        setPhase('responding')
      }
    } catch (err: any) {
      addMessage({ role: 'assistant', type: 'text', text: `Erro ao gerar vídeo: ${err.message}` })
      setPhase('responding')
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  async function handleAnswer(questionId: string, option: string) {
    const updated = questions.map((q) =>
      q.id === questionId ? { ...q, answer: option } : q
    )
    setQuestions(updated)

    const answeredCount = updated.filter((q) => q.answer !== null).length

    if (answeredCount < updated.length) {
      setCurrentQuestionIdx(answeredCount)
      return
    }

    setPhase('thinking')

    const context = `PEDIDO DO USUÁRIO: ${input}\n\nDETALHES FORNECIDOS:\n${updated.map((q) => `- ${q.text}: ${q.answer}`).join('\n')}`

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: context,
          systemPrompt: systemPromptRef.current,
        }),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        addMessage({ role: 'assistant', type: 'text', text: `Erro: ${errData.error || 'tente novamente.'}` })
        setPhase('responding')
        return
      }

      const data = await res.json()
      const { chat, prompt } = parseAIResponse(data.response || '')

      addMessage({ role: 'assistant', type: 'video_desc', text: chat })

      if (prompt) {
        setPhase('generating')
        addMessage({ role: 'assistant', type: 'generating', text: 'Gerando seu vídeo...' })
        generateVideoWithPrompt(prompt)
      } else {
        setPhase('responding')
      }
    } catch (err: any) {
      addMessage({ role: 'assistant', type: 'text', text: `Erro de conexão: ${err.message}` })
      setPhase('responding')
    }
  }

  const currentQuestion = questions[currentQuestionIdx]

  return (
    <div className="cv-page">
      {phase === 'initial' ? (
        <div className="cv-initial">
          <div className="hero-section">
            <h1 className="hero-logo">TokToy</h1>
            <p className="hero-subtitle">Criar Vídeos com <span className="hero-highlight">IA</span></p>
          </div>

          <div className="cv-init-chat">
            <div className="cv-rect unified">
              <div className="cv-ref-block" onClick={openPicker}>
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
              <div className="cv-rect-body">
                <AttachmentsBar files={files} onRemove={removeFile} />
                <div
                  ref={inputRef}
                  className="cv-write-area"
                  contentEditable
                  role="textbox"
                  data-placeholder="Descreva o vídeo que deseja criar..."
                  onInput={(e) => setInput(e.currentTarget.textContent || '')}
                  onKeyDown={handleKeyDown}
                  suppressContentEditableWarning
                />
                <div className="cv-actions">
                  <div className="cv-actions-left">
                    <button className="chat-btn" title="Anexar imagem" onClick={openPicker}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    </button>
                    <button className="chat-btn" title="Anexar arquivo" onClick={openPicker}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" /></svg>
                    </button>
                  </div>
                  <div className="cv-actions-right">
                    <button className={`chat-btn ${listening ? 'listening' : ''}`} title={listening ? 'Parar ditado' : 'Ditado'} onClick={toggleDictation}>
                      {listening ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="6" y="6" width="12" height="12" rx="2" /></svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" /><path d="M19 10v2a7 7 0 01-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
                      )}
                    </button>
                    <button className="chat-send" onClick={handleSend}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                    </button>
                  </div>
                </div>
              </div>
              <input ref={fileInputRef} type="file" multiple accept="image/*,video/*,audio/*" onChange={handleSelect} style={{ display: 'none' }} />
            </div>
          </div>
        </div>
      ) : (
        <div className="cv-split" style={{ height: '100%' }}>
          <div className="cv-left">
            <div className="cv-history" ref={chatRef}>
              {messages.map((msg, i) => (
                <div key={i} className={`cv-msg ${msg.role}`}>
                  <Avatar name={
                    msg.role === 'user' ? 'Você' :
                    msg.type === 'generating' ? 'T' : 'T'
                  } />
                  <div className="cv-msg-body">
                    <span className="cv-msg-name">
                      {msg.role === 'user' ? 'Você' : 'TokToy IA'}
                    </span>
                    <span className="cv-msg-text" style={{ whiteSpace: 'pre-line' }}>
                      {msg.text}
                    </span>
                  </div>
                </div>
              ))}

              {phase === 'thinking' && (
                <div className="cv-msg assistant">
                  <Avatar name="T" />
                  <div className="cv-msg-body">
                    <span className="cv-msg-name">TokToy IA</span>
                    <span className="cv-msg-text">
                      <ThinkingDots />
                    </span>
                  </div>
                </div>
              )}

              {phase === 'questioning' && currentQuestion && (
                <div className="question-block">
                  <div className="question-text">{currentQuestion.text}</div>
                  <div className="question-options">
                    {currentQuestion.options.map((opt, i) => (
                      <button
                        key={i}
                        className="question-option"
                        onClick={() => handleAnswer(currentQuestion.id, opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {phase === 'generating' && (
                <div className="cv-generating-area">
                  <div className="vid-frame" style={{ maxWidth: 280 }}>
                    {generatedVideo ? (
                      <video src={generatedVideo} controls autoPlay loop style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
                    ) : (
                      <>
                        <div className="vid-frame-bg">
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                        </div>
                        <div className="vid-generating-overlay">
                          <div className="generating-spinner" />
                          <span className="generating-text">Gerando vídeo...</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {phase !== 'thinking' && phase !== 'questioning' && (
              <div className="cv-chat-compact">
                <div className="cv-rect unified">
                  <div className="cv-ref-block" onClick={openPicker}>
                    <div className="ref-icon-area">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                      <span className="ref-badge">+</span>
                    </div>
                    <span className="ref-label">Referências</span>
                  </div>
                  <div className="cv-rect-body">
                    <AttachmentsBar files={files} onRemove={removeFile} />
                    <div
                      ref={inputRef}
                      className="cv-write-area"
                      contentEditable
                      role="textbox"
                      data-placeholder="Descreva o vídeo que deseja criar..."
                      onInput={(e) => setInput(e.currentTarget.textContent || '')}
                      onKeyDown={handleKeyDown}
                      suppressContentEditableWarning
                    />
                    <div className="cv-actions">
                      <div className="cv-actions-left">
                        <button className="chat-btn" title="Anexar" onClick={openPicker}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        </button>
                      </div>
                      <div className="cv-actions-right">
                        <button className={`chat-btn ${listening ? 'listening' : ''}`} title={listening ? 'Parar' : 'Ditado'} onClick={toggleDictation}>
                          {listening ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="6" y="6" width="12" height="12" rx="2" /></svg>
                          ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" /><path d="M19 10v2a7 7 0 01-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
                          )}
                        </button>
                        <button className="chat-send" onClick={handleSend}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <input ref={fileInputRef} type="file" multiple accept="image/*,video/*,audio/*" onChange={handleSelect} style={{ display: 'none' }} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
