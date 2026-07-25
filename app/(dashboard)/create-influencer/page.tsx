'use client'

import { useState, useRef } from 'react'

const mockInfluencers = [
  { name: 'Natália A.', desc: 'Estilo de vida e moda • 23 anos • SP', color: '#1a1a2e', age: 23 },
  { name: 'Lucas M.', desc: 'Tecnologia e games • 28 anos • RJ', color: '#1a2e1a', age: 28 },
  { name: 'Sofia R.', desc: 'Beleza e skincare • 21 anos • SP', color: '#2e1a1a', age: 21 },
  { name: 'Pedro H.', desc: 'Fitness e saúde • 30 anos • MG', color: '#2e2e1a', age: 30 },
]

const exampleVideos = [
  { name: 'Vídeo 1', dur: '0:32' },
  { name: 'Vídeo 2', dur: '0:45' },
  { name: 'Vídeo 3', dur: '1:02' },
  { name: 'Vídeo 4', dur: '0:28' },
  { name: 'Vídeo 5', dur: '0:55' },
  { name: 'Vídeo 6', dur: '0:38' },
  { name: 'Vídeo 7', dur: '1:10' },
  { name: 'Vídeo 8', dur: '0:42' },
]

const statsData = [
  { value: '12.4k', label: 'Visualizações' },
  { value: '8', label: 'Vídeos Publicados' },
  { value: '1.2k', label: 'Seguidores' },
]

const influencerCategories = [
  {
    name: 'Eletrônicos',
    items: [
      { name: 'Fone Bluetooth X', price: 'R$ 89,90', sales: '1.2k' },
      { name: 'Smartwatch Ultra', price: 'R$ 459,90', sales: '1.8k' },
    ],
  },
  {
    name: 'Beleza & Saúde',
    items: [
      { name: 'Kit Skincare Glow', price: 'R$ 129,90', sales: '3.4k' },
      { name: 'Perfume Importado', price: 'R$ 249,90', sales: '4.2k' },
      { name: 'Creatina Pure 300g', price: 'R$ 79,90', sales: '2.3k' },
    ],
  },
  {
    name: 'Casa & Fitness',
    items: [
      { name: 'Cadeira Gamer Pro', price: 'R$ 899,90', sales: '634' },
      { name: 'Relógio Esportivo', price: 'R$ 199,90', sales: '856' },
    ],
  },
]

type Step = 'list' | 'configure' | 'train' | 'dashboard'
type DashTab = 'chat' | 'training' | 'tiktok' | 'products' | 'stats'

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

function ChatInput({ onSend }: { onSend: (text: string) => void }) {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLDivElement>(null)

  function handleSend() {
    const text = input.trim()
    if (!text) return
    onSend(text)
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
    <div className="cv-chat-row">
      <RefBlock />
      <div className="cv-rect">
        <div
          ref={inputRef}
          className="cv-write-area"
          contentEditable
          role="textbox"
          data-placeholder="Digite o que você quer que a influencer faça..."
          onInput={(e) => setInput(e.currentTarget.textContent || '')}
          onKeyDown={handleKeyDown}
          suppressContentEditableWarning
        />
        <div className="cv-actions">
          <div className="cv-actions-left">
            <button className="chat-btn" title="Anexar imagem">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            </button>
            <button className="chat-btn" title="Anexar arquivo">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" /></svg>
            </button>
          </div>
          <div className="cv-actions-right">
            <button className="chat-btn" title="Ditado">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" /><path d="M19 10v2a7 7 0 01-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
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
  )
}

function DashChat() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([])
  const [hasSent, setHasSent] = useState(false)

  function handleSend(text: string) {
    setMessages((prev) => [...prev, { role: 'user', text }])
    setHasSent(true)
  }

  return (
    <div className="ci-dash-chat">
      {!hasSent ? (
        <div className="cv-initial" style={{ flex: 1, width: '100%' }}>
          <div className="hero-section" style={{ padding: '12px 0 16px' }}>
            <h1 className="hero-logo" style={{ fontSize: '4rem' }}>TokToy</h1>
            <p className="hero-subtitle">Converse com sua <span className="hero-highlight">Influencer IA</span></p>
          </div>
          <div className="cv-init-chat" style={{ maxWidth: 700 }}>
            <ChatInput onSend={handleSend} />
          </div>
        </div>
      ) : (
        <div className="cv-split" style={{ height: '100%' }}>
          <div className="cv-left">
            <div className="cv-history">
              {messages.map((msg, i) => (
                <div key={i} className={`cv-msg ${msg.role}`}>
                  <div className="msg-avatar">{msg.role === 'user' ? 'V' : 'N'}</div>
                  <div className="cv-msg-body">
                    <span className="cv-msg-name">{msg.role === 'user' ? 'Você' : 'Natália A.'}</span>
                    <span className="cv-msg-text">{msg.text}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="cv-chat-compact">
              <ChatInput onSend={handleSend} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function CreateInfluencerPage() {
  const [step, setStep] = useState<Step>('list')
  const [dashTab, setDashTab] = useState<DashTab>('chat')
  const [dashSideExpanded, setDashSideExpanded] = useState(false)
  const [progress, setProgress] = useState(0)
  const [autoMode, setAutoMode] = useState(false)

  const [showList, setShowList] = useState(false)

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [description, setDescription] = useState('')

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

  function handleGenerate() {
    setStep('train')
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          return 100
        }
        return p + 5
      })
    }, 200)
  }

  function handleSave() {
    setStep('dashboard')
  }

  const tabs: { key: DashTab; label: string; icon: string }[] = [
    { key: 'chat', label: 'Bate-papo', icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z' },
    { key: 'training', label: 'Treinamento', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
    { key: 'tiktok', label: 'TikTok', icon: 'M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' },
    { key: 'products', label: 'Produtos', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
    { key: 'stats', label: 'Estatísticas', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  ]

  return (
    <div className="ci-page">
      {/* Step: list */}
      {step === 'list' && (
        !showList ? (
          <div className="ci-container">
            <div className="ci-hero">
              <h1 className="ci-hero-title">Crie seu próprio influencer<br />e deixe ele trabalhando por você</h1>
              <p className="ci-hero-sub">Ensine a IA a criar um influenciador virtual com a personalidade, aparência e estilo que você quiser. Depois é só dar ordens e ele cria os vídeos para você.</p>
            </div>

            <div className="cm-carousel-section" style={{ width: '100%', maxWidth: 700 }}>
              <span className="cm-carousel-title">Vídeos de exemplo</span>
              <div className="cm-carousel-wrapper">
                <div className="cm-carousel">
                  {exampleVideos.map((v, i) => (
                    <div key={i} className="cm-carousel-item" style={{ width: 140 }}>
                      <div className="cm-carousel-frame">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <span className="cm-carousel-dur">{v.dur}</span>
                      </div>
                      <span className="cm-carousel-name">{v.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button className="ci-create-btn" onClick={() => setStep('configure')}>
              Criar seu primeiro influencer
            </button>

            <button
              onClick={() => setShowList(true)}
              style={{ fontSize: '0.75rem', color: '#555', cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'inherit', textDecoration: 'underline' }}
            >
              Já tenho influencers cadastrados
            </button>
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="ci-list-header">
              <h1 className="ci-list-title">Seus Influencers</h1>
              <button className="ci-list-new" onClick={() => setStep('configure')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                <span>Criar Novo</span>
              </button>
            </div>
            <div className="ci-list-grid">
              {mockInfluencers.map((inf, i) => (
                <div key={i} className="ci-list-card">
                  <div className="ci-list-avatar" style={{ background: inf.color }}>
                    {inf.name.charAt(0)}
                  </div>
                  <span className="ci-list-card-name">{inf.name}</span>
                  <span className="ci-list-card-desc">{inf.desc}</span>
                  <div className="ci-list-card-actions">
                    <button className="ci-panel-btn" onClick={() => setStep('dashboard')}>Painel</button>
                    <button className="ci-panel-btn" onClick={() => setStep('configure')}>Editar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      )}

      {/* Step: configure */}
      {step === 'configure' && (
        <div className="ci-config">
          <div className="ci-config-header">
            <h1 className="ci-config-title">Configurar Influencer</h1>
            <p className="ci-config-sub">Defina as características do seu influenciador virtual</p>
          </div>

          <div className="ci-config-form">
            <div className="ci-photo-area">
              <div className="ci-photo-upload">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <span className="ci-photo-label">Foto de perfil</span>
            </div>

            <div className="ci-field-row">
              <div className="ci-field-group">
                <label className="ci-field-label">Nome</label>
                <input className="ci-field-input" placeholder="Ex: Natália" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="ci-field-group">
                <label className="ci-field-label">Sobrenome</label>
                <input className="ci-field-input" placeholder="Ex: Alves" value={surname} onChange={(e) => setSurname(e.target.value)} />
              </div>
            </div>

            <div className="ci-field-row">
              <div className="ci-field-group">
                <label className="ci-field-label">Idade</label>
                <input className="ci-field-input" type="number" placeholder="Ex: 23" value={age} onChange={(e) => setAge(e.target.value)} />
              </div>
              <div className="ci-field-group">
                <label className="ci-field-label">Gênero</label>
                <select className="ci-field-select" value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="" disabled>Selecione</option>
                  <option value="feminino">Feminino</option>
                  <option value="masculino">Masculino</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div className="ci-field-group">
                <label className="ci-field-label">Data de Nascimento</label>
                <input className="ci-field-input" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
              </div>
            </div>

            <div className="ci-field-group">
              <label className="ci-field-label">Descrição / Personalidade</label>
              <textarea className="ci-field-textarea" placeholder="Descreva a personalidade, estilo, tom de voz e características marcantes do seu influencer..." value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div className="ci-config-actions">
              <button className="ci-back-btn" onClick={() => setStep('list')}>Voltar</button>
              <button className="ci-generate-btn" onClick={handleGenerate}>Gerar</button>
            </div>
          </div>
        </div>
      )}

      {/* Step: train */}
      {step === 'train' && (
        <div className="ci-train">
          <div className="ci-progress-section">
            <div className="ci-progress-header">
              <span className="ci-progress-label">Aprendizado da IA</span>
              <span className="ci-progress-pct">{progress}%</span>
            </div>
            <div className="ci-progress-bar">
              <div className="ci-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="ci-train-layout">
            <div className="ci-train-left">
              <span className="ci-train-section-title">Imagens</span>
              <div className="ci-image-grid">
                <div className="ci-image-add" title="Adicionar imagem">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                </div>
                <div className="ci-image-thumb">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                </div>
                <div className="ci-image-thumb">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                </div>
                <div className="ci-image-thumb">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                </div>
              </div>

              <span className="ci-train-section-title">Informações Adicionais</span>
              <textarea className="ci-train-textarea" placeholder="Descreva características físicas, ângulos, expressões, iluminação das fotos para ajudar a IA..." />
            </div>

            <div className="ci-train-right">
              <span className="ci-train-section-title">Respostas da IA</span>
              <div className="ci-train-responses">
                <div className="ci-train-empty">
                  {progress > 0 ? (
                    <span>A IA está aprendendo... Envie mais imagens e informações para melhorar o reconhecimento.</span>
                  ) : (
                    <span>Adicione imagens e informações para começar o treinamento.</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="ci-train-actions">
            <button className="ci-back-btn" onClick={() => setStep('configure')}>Voltar</button>
            <button className="ci-save-btn" onClick={handleSave}>Salvar Influencer</button>
          </div>
        </div>
      )}

      {/* Step: dashboard */}
      {step === 'dashboard' && (
        <div className="ci-dashboard-layout">
          <div className="ci-dash-content">
            {/* Chat tab */}
            {dashTab === 'chat' && <DashChat />}

            {/* Training tab */}
            {dashTab === 'training' && (
              <div className="ci-dash-training">
                <div className="ci-train" style={{ flex: 1 }}>
                  <div className="ci-progress-section">
                    <div className="ci-progress-header">
                      <span className="ci-progress-label">Aprendizado da IA</span>
                      <span className="ci-progress-pct">{progress}%</span>
                    </div>
                    <div className="ci-progress-bar">
                      <div className="ci-progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                  <div className="ci-train-layout" style={{ flex: 1 }}>
                    <div className="ci-train-left">
                      <span className="ci-train-section-title">Imagens</span>
                      <div className="ci-image-grid">
                        <div className="ci-image-add">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        </div>
                        <div className="ci-image-thumb">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                        </div>
                        <div className="ci-image-thumb">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                        </div>
                        <div className="ci-image-thumb">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                        </div>
                      </div>
                      <span className="ci-train-section-title">Informações Adicionais</span>
                      <textarea className="ci-train-textarea" placeholder="Descreva características físicas, ângulos, expressões..." />
                    </div>
                    <div className="ci-train-right">
                      <span className="ci-train-section-title">Respostas da IA</span>
                      <div className="ci-train-responses">
                        <div className="ci-train-empty">
                          {progress > 0 ? (
                            <span>A IA está aprendendo... Envie mais imagens e informações para melhorar o reconhecimento.</span>
                          ) : (
                            <span>Adicione imagens e informações para começar o treinamento.</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TikTok tab */}
            {dashTab === 'tiktok' && (
              <div className="ci-dash-tiktok">
                <div className="ci-tiktok-login">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6" />
                    <path d="M23 11h-6" />
                  </svg>
                  <h2 className="ci-tiktok-title">Conectar conta do TikTok</h2>
                  <p className="ci-tiktok-sub">Conecte a conta do TikTok onde a influencer vai publicar os vídeos automaticamente.</p>
                  <div className="ci-tiktok-fields">
                    <input className="ci-tiktok-input" type="text" placeholder="Nome de usuário ou email" />
                    <input className="ci-tiktok-input" type="password" placeholder="Senha" />
                    <button className="ci-tiktok-btn">Conectar</button>
                  </div>
                </div>
              </div>
            )}

            {/* Products tab */}
            {dashTab === 'products' && (
              <div className="ci-dash-products">
                <div className="cp-products-page">
                  <div className="cp-products-header">
                    <h1 className="cp-products-title">Escolha um Produto</h1>
                    <p className="cp-products-sub">Selecione um produto do TikTok Shop para criar um vídeo com sua influencer</p>
                  </div>
                  <div className="cp-products-toolbar">
                    <div className="cp-search-box">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                      <input type="text" placeholder="Buscar produtos..." className="cp-search-input" />
                    </div>
                    <button className="cp-ref-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" /></svg>
                      <span>Enviar referência</span>
                    </button>
                  </div>
                  <div className="cp-products-grid" style={{ gridTemplateColumns: 'none', display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {influencerCategories.map((cat) => (
                      <div key={cat.name} className="cp-category-section">
                        <h3 className="cp-category-title">{cat.name}</h3>
                        <div className="cp-category-items" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                          {cat.items.map((p, i) => (
                            <button key={i} className="cp-product-card">
                              <div className="cp-product-frame">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                              </div>
                              <div className="cp-product-info">
                                <span className="cp-product-name">{p.name}</span>
                                <span className="cp-product-price">{p.price}</span>
                                <div className="cp-product-stats">
                                  <span className="cp-product-sales">{p.sales} vendas</span>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Stats tab */}
            {dashTab === 'stats' && (
              <div className="ci-stats">
                <div className="ci-stats-grid">
                  {statsData.map((s, i) => (
                    <div key={i} className="ci-stat-card">
                      <span className="ci-stat-value">{s.value}</span>
                      <span className="ci-stat-label">{s.label}</span>
                    </div>
                  ))}
                </div>

                <div className="ci-auto-section">
                  <div className="ci-auto-header">
                    <span className="ci-auto-title">Modo Automático</span>
                    <button
                      className={`ci-toggle ${autoMode ? 'active' : ''}`}
                      onClick={() => setAutoMode(!autoMode)}
                    >
                      <div className="ci-toggle-knob" />
                    </button>
                  </div>
                  <p className="ci-auto-desc">
                    Quando ativado, a IA vai procurar os 5 melhores produtos a cada semana e criar vídeos com sua influencer, postando 2 vídeos por dia no perfil conectado do TikTok.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <nav
            className={`ci-right-sidebar ${dashSideExpanded ? 'expanded' : ''}`}
            onMouseEnter={() => setDashSideExpanded(true)}
            onMouseLeave={() => setDashSideExpanded(false)}
          >
            <div className="ci-sidebar-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`ci-tab-btn ${dashTab === tab.key ? 'active' : ''}`}
                  onClick={() => setDashTab(tab.key)}
                >
                  <div className="ci-tab-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={tab.icon} />
                    </svg>
                  </div>
                  <span className={`ci-tab-label ${!dashSideExpanded ? 'hidden' : ''}`}>
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
