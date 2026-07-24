'use client'

import { useState } from 'react'

const mockInfluencers = [
  { name: 'Natália A.', desc: 'Estilo de vida e moda', color: '#1a1a2e' },
  { name: 'Lucas M.', desc: 'Tecnologia e games', color: '#1a2e1a' },
  { name: 'Sofia R.', desc: 'Beleza e skincare', color: '#2e1a1a' },
  { name: 'Pedro H.', desc: 'Fitness e saúde', color: '#2e2e1a' },
  { name: 'Isabela C.', desc: 'Culinária e receitas', color: '#1a1a1a' },
  { name: 'Gabriel T.', desc: 'Viagens e aventura', color: '#1a2e2e' },
]

const mockVideoTypes = [
  { name: 'Unboxing', desc: 'Abrindo e mostrando o produto pela primeira vez' },
  { name: 'Review', desc: 'Análise completa com opinião sincera' },
  { name: 'Tutorial', desc: 'Ensinando como usar o produto' },
  { name: 'Dia a Dia', desc: 'Produto inserido na rotina do influenciador' },
  { name: 'Antes e Depois', desc: 'Transformação visível com o produto' },
  { name: 'Humor', desc: 'Comercial criativo e engraçado' },
]

const mockProducts = [
  { name: 'Fone Bluetooth X', price: 'R$ 89,90', sales: '1.2k' },
  { name: 'Kit Skincare Glow', price: 'R$ 129,90', sales: '3.4k' },
  { name: 'Relógio Esportivo', price: 'R$ 199,90', sales: '856' },
  { name: 'Creatina Pure 300g', price: 'R$ 79,90', sales: '2.3k' },
  { name: 'Cadeira Gamer Pro', price: 'R$ 899,90', sales: '634' },
  { name: 'Perfume Importado', price: 'R$ 249,90', sales: '4.2k' },
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

export default function InfluencerCommercialPage() {
  const [step, setStep] = useState<'influencer' | 'videotype' | 'product' | 'prompt'>('influencer')

  return (
    <div className="cv-page">
      {step === 'influencer' && (
        <div className="cp-products-page">
          <div className="cp-products-header">
            <h1 className="cp-products-title">Escolha um Influenciador</h1>
            <p className="cp-products-sub">Selecione o influenciador de IA que vai apresentar seu produto</p>
          </div>

          <div className="ci-grid">
            {mockInfluencers.map((inf, i) => (
              <button key={i} className="ci-card" onClick={() => setStep('videotype')}>
                <div className="ci-avatar" style={{ background: inf.color }}>
                  <span className="ci-avatar-letter">{inf.name.charAt(0)}</span>
                </div>
                <div className="ci-info">
                  <span className="ci-name">{inf.name}</span>
                  <span className="ci-desc">{inf.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'videotype' && (
        <div className="cp-products-page">
          <div className="cp-products-header">
            <h1 className="cp-products-title">Escolha o Tipo de Vídeo</h1>
            <p className="cp-products-sub">Que tipo de comercial com influenciador você quer criar?</p>
          </div>

          <div className="cp-products-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {mockVideoTypes.map((vt, i) => (
              <button key={i} className="cp-product-card" onClick={() => setStep('product')}>
                <div className="cp-product-frame" style={{ aspectRatio: '9/16' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <div className="cp-product-info">
                  <span className="cp-product-name">{vt.name}</span>
                  <span className="cp-product-sales">{vt.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'product' && (
        <div className="cp-products-page">
          <div className="cp-products-header">
            <h1 className="cp-products-title">Escolha um Produto</h1>
            <p className="cp-products-sub">Selecione o produto para o comercial ou envie sua própria referência</p>
          </div>

          <div className="cp-products-toolbar">
            <div className="cp-search-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input type="text" placeholder="Buscar produtos..." className="cp-search-input" />
            </div>
            <button className="cp-ref-btn" onClick={() => setStep('prompt')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" /></svg>
              <span>Enviar referência</span>
            </button>
          </div>

          <div className="cp-products-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {mockProducts.map((p, i) => (
              <button key={i} className="cp-product-card" onClick={() => setStep('prompt')}>
                <div className="cp-product-frame">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
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
      )}

      {step === 'prompt' && (
        <div className="cv-initial">
          <div className="hero-section">
            <h1 className="hero-logo">TokToy</h1>
            <p className="hero-subtitle">Criar Comercial com <span className="hero-highlight">Influenciador</span></p>
          </div>

          <div className="cv-init-chat">
            <div className="cv-chat-row">
              <RefBlock />
              <div className="cv-rect">
                <div
                  className="cv-write-area"
                  contentEditable
                  role="textbox"
                  data-placeholder="Descreva como quer que o influenciador apresente o produto..."
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
                    <button className="chat-send">
                      <span style={{ fontSize: '0.8125rem', fontWeight: 500, marginRight: 4 }}>Generar</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
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
