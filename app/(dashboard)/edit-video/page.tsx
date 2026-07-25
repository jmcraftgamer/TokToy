'use client'

import { useState, useRef } from 'react'

const mockHistory = [
  { name: 'Review Produto Final', date: '24/07/2026', dur: '1:32' },
  { name: 'Unboxing Editado', date: '22/07/2026', dur: '2:15' },
  { name: 'Tutorial Corte', date: '20/07/2026', dur: '0:48' },
  { name: 'Antes e Depois', date: '18/07/2026', dur: '1:05' },
]

const toolGroups = [
  [
    { id: 'cursor', label: 'Selecionar', icon: 'M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z' },
    { id: 'cut', label: 'Cortar', icon: 'M23 1l-6 6M11 19l-6 6M21 5l-9.5 9.5M5 21l4-4' },
    { id: 'text', label: 'Texto', icon: 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7' },
  ],
  [
    { id: 'bgremove', label: 'Remover Fundo', icon: 'M13 17V9M13 9a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2zM5 17V9a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2z' },
    { id: 'captions', label: 'Legendas', icon: 'M7 8h10M7 12h7M7 16h4' },
    { id: 'image', label: 'Imagens', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
  ],
  [
    { id: 'undo', label: 'Desfazer', icon: 'M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6' },
    { id: 'redo', label: 'Refazer', icon: 'M21 10H11a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6' },
  ],
  [
    { id: 'audio', label: 'Áudio', icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3' },
    { id: 'transitions', label: 'Transições', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
    { id: 'speed', label: 'Velocidade', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'crop', label: 'Cortar', icon: 'M5 5h14v14H5V5zm0 9l4-4 3 3 3-3 4 4' },
  ],
]

export default function EditVideoPage() {
  const [step, setStep] = useState<'list' | 'editor'>('list')
  const [showHistory, setShowHistory] = useState(false)
  const [hasVideo, setHasVideo] = useState(false)
  const [activeTool, setActiveTool] = useState<string>('cursor')
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([])
  const chatInputRef = useRef<HTMLDivElement>(null)

  function handleChatSend() {
    const text = chatInput.trim()
    if (!text) return
    setMessages((prev) => [...prev, { role: 'user', text }])
    setChatInput('')
    if (chatInputRef.current) chatInputRef.current.innerHTML = ''
  }

  function handleChatKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleChatSend()
    }
  }

  return (
    <div className="ev-page">
      {step === 'list' && (
        !showHistory ? (
          <div className="ev-container">
            <div className="ci-hero">
              <h1 className="ev-hero-title">Edite seus vídeos com IA</h1>
              <p className="ev-hero-sub">
                Edite um vídeo inteiro com IA — cortes, legendas automáticas, remoção de fundo,
                transições, textos e muito mais usando comandos de texto.
              </p>
            </div>

            <div className="ev-features">
              <span className="ev-feature-badge">✂ Cortes inteligentes</span>
              <span className="ev-feature-badge">🎯 Remoção de fundo</span>
              <span className="ev-feature-badge">💬 Legendas automáticas</span>
              <span className="ev-feature-badge">🎵 Música e áudio</span>
              <span className="ev-feature-badge">🔄 Transições</span>
              <span className="ev-feature-badge">📝 Textos</span>
            </div>

            <button className="ev-start-btn" onClick={() => setStep('editor')}>
              Edite seu primeiro vídeo
            </button>

            <button
              onClick={() => setShowHistory(true)}
              style={{ fontSize: '0.75rem', color: '#555', cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'inherit', textDecoration: 'underline' }}
            >
              Ver vídeos editados anteriormente
            </button>
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="ev-history-header">
              <h1 className="ev-history-title">Vídeos Editados</h1>
              <button className="ev-history-new" onClick={() => setStep('editor')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                <span>Editar novo vídeo</span>
              </button>
            </div>
            <div className="ev-history-grid">
              {mockHistory.map((item, i) => (
                <button key={i} className="ev-history-card" onClick={() => setStep('editor')}>
                  <div className="ev-history-thumb">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                  </div>
                  <span className="ev-history-name">{item.name}</span>
                  <span className="ev-history-meta">{item.date} • {item.dur}</span>
                </button>
              ))}
            </div>
          </div>
        )
      )}

      {step === 'editor' && (
        <div className="ev-editor">
          {/* Left chat panel */}
          <div className="ev-editor-left">
            <span className="ev-editor-chat-title">Comandos de IA</span>

            <div className="ev-chat-history">
              {messages.length === 0 && (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: '0.8125rem' }}>
                  Peça à IA para editar seu vídeo
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`ev-chat-msg ${msg.role}`}>
                  <div className="ev-chat-bubble">{msg.text}</div>
                </div>
              ))}
            </div>

            <div className="ev-chat-input-area">
              <div className="ev-chat-input-box">
                <div
                  ref={chatInputRef}
                  className="ev-chat-field"
                  contentEditable
                  role="textbox"
                  data-placeholder="Digite um comando..."
                  onInput={(e) => setChatInput(e.currentTarget.textContent || '')}
                  onKeyDown={handleChatKeyDown}
                  suppressContentEditableWarning
                />
                <button className="ev-chat-send" onClick={handleChatSend}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Main editor area */}
          <div className="ev-editor-main">
            {/* Preview */}
            <div className="ev-preview-area">
              <div className="ev-preview-top-bar">
                {!hasVideo && (
                  <button className="ev-add-video-btn" onClick={() => setHasVideo(true)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    <span>Adicionar vídeo</span>
                  </button>
                )}
                {hasVideo && (
                  <>
                    <button className="ev-add-video-btn" onClick={() => setHasVideo(false)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                      <span>Adicionar mais</span>
                    </button>
                    <span className="ev-preview-time">00:05 / 01:32</span>
                  </>
                )}
                <button className="ev-export-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                  <span>Exportar</span>
                </button>
              </div>

              <div className="ev-preview-frame">
                {!hasVideo ? (
                  <div className="ev-preview-add" onClick={() => setHasVideo(true)}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span className="ev-preview-add-text">Clique para adicionar um vídeo</span>
                  </div>
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Player controls */}
            {hasVideo && (
              <div className="ev-preview-controls">
                <button className="ev-ctrl-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="11 17 6 12 11 7" /><polyline points="18 17 13 12 18 7" /></svg>
                </button>
                <button className="ev-ctrl-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                </button>
                <button className="ev-ctrl-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="6 4 6 20" /><polyline points="18 4 18 20" /></svg>
                </button>
                <button className="ev-ctrl-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                </button>
                <button className="ev-ctrl-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" /></svg>
                </button>
                <div className="ev-scrubber">
                  <div className="ev-scrubber-fill" />
                </div>
              </div>
            )}

            {/* Toolbar */}
            <div className="ev-toolbar">
              {toolGroups.map((group, gi) => (
                <span key={gi} style={{ display: 'contents' }}>
                  {gi > 0 && <div className="ev-toolbar-divider" />}
                  {group.map((tool) => (
                    <button
                      key={tool.id}
                      className={`ev-tool-btn ${activeTool === tool.id ? 'active' : ''}`}
                      onClick={() => setActiveTool(tool.id)}
                      title={tool.label}
                    >
                      <div className="ev-tool-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d={tool.icon} />
                        </svg>
                      </div>
                      <span className="ev-tool-label">{tool.label}</span>
                    </button>
                  ))}
                </span>
              ))}
            </div>

            {/* Timeline */}
            <div className="ev-timeline-area">
              <div className="ev-timeline-header">
                <span className="ev-timeline-label">Timeline</span>
                <span className="ev-timeline-time">00:05 / 01:32</span>
              </div>
              <div className="ev-timeline-track">
                <div className="ev-timeline-clip" style={{ left: '5%', width: '35%' }}>
                  Vídeo 1
                </div>
                <div className="ev-timeline-clip" style={{ left: '42%', width: '20%', background: '#151515' }}>
                  Texto
                </div>
                <div className="ev-timeline-clip" style={{ left: '64%', width: '30%' }}>
                  Vídeo 2
                </div>
                <div className="ev-playhead" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
