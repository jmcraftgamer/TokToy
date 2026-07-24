'use client'

import { useState, useRef } from 'react'

const mockProducts = [
  { name: 'Fone Bluetooth X', price: 'R$ 89,90', sales: '1.2k vendas', trend: '+15%' },
  { name: 'Kit Skincare Glow', price: 'R$ 129,90', sales: '3.4k vendas', trend: '+28%' },
  { name: 'Relógio Esportivo', price: 'R$ 199,90', sales: '856 vendas', trend: '+8%' },
  { name: 'Camiseta Oversized', price: 'R$ 59,90', sales: '5.1k vendas', trend: '+42%' },
  { name: 'Creatina Pure 300g', price: 'R$ 79,90', sales: '2.3k vendas', trend: '+11%' },
  { name: 'Luminária LED Mesa', price: 'R$ 45,90', sales: '987 vendas', trend: '+19%' },
  { name: 'Cadeira Gamer Pro', price: 'R$ 899,90', sales: '634 vendas', trend: '+5%' },
  { name: 'Perfume Importado', price: 'R$ 249,90', sales: '4.2k vendas', trend: '+33%' },
  { name: 'Smartwatch Ultra', price: 'R$ 459,90', sales: '1.8k vendas', trend: '+22%' },
]

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

export default function VideoCommercialPage() {
  const [step, setStep] = useState<'products' | 'create'>('products')
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
      {step === 'products' && (
        <div className="cp-products-page">
          <div className="cp-products-header">
            <h1 className="cp-products-title">Escolha um produto do TikTok Shop</h1>
            <p className="cp-products-sub">Selecione o produto que deseja anunciar ou use uma referência própria</p>
          </div>

          <div className="cp-products-toolbar">
            <div className="cp-search-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input type="text" placeholder="Buscar produtos..." className="cp-search-input" />
            </div>
            <button className="cp-ref-btn" onClick={() => setStep('create')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" /></svg>
              <span>Usar referência</span>
            </button>
          </div>

          <div className="cp-products-grid">
            {mockProducts.map((p, i) => (
              <button key={i} className="cp-product-card" onClick={() => setStep('create')}>
                <div className="cp-product-frame">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <div className="cp-product-info">
                  <span className="cp-product-name">{p.name}</span>
                  <span className="cp-product-price">{p.price}</span>
                  <div className="cp-product-stats">
                    <span className="cp-product-sales">{p.sales}</span>
                    <span className="cp-product-trend">{p.trend}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="cp-products-footer">
            <span className="cp-products-count">{mockProducts.length} produtos encontrados</span>
          </div>
        </div>
      )}

      {step === 'create' && (
        <div className="cv-initial">
          <div className="hero-section">
            <h1 className="hero-logo">TokToy</h1>
            <p className="hero-subtitle">Criar Comercial em <span className="hero-highlight">Vídeo</span></p>
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
                  data-placeholder="Descreva o comercial que deseja criar..."
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
          </div>
        </div>
      )}
    </div>
  )
}
