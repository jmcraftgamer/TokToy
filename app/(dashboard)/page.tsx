'use client'

import { useState } from 'react'
import ChatBox from '../components/ChatBox'
import FeatureCard from '../components/FeatureCard'

interface Message {
  role: 'user' | 'assistant'
  text: string
}

const features = [
  {
    icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
    title: 'Criar Vídeos com IA',
    description: 'Gere vídeos profissionais usando modelos prontos e inteligência artificial. Ideal para campanhas comerciais e conteúdo viral.',
  },
  {
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    title: 'Criar Comerciais',
    description: 'Crie anúncios comerciais atraentes usando imagens de referência. Perfeito para produtos e serviços.',
  },
  {
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    title: 'Criar Influencer IA',
    description: 'Desenvolva influenciadores virtuais com personalidade única para suas campanhas de marketing.',
  },
  {
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    title: 'Imagens com IA',
    description: 'Gere imagens realistas e criativas a partir de descrições textuais com nosso gerador de imagens IA.',
  },
  {
    icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
    title: 'Editar Vídeos com IA',
    description: 'Edite seus vídeos usando comandos de texto. Corte, ajuste, e melhore seus vídeos com inteligência artificial.',
  },
  {
    icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
    title: 'Músicas com IA',
    description: 'Componha músicas originais com IA para seus vídeos, podcasts e projetos criativos.',
  },
  {
    icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z',
    title: 'Narrações com IA',
    description: 'Transforme texto em voz natural com nossos narradores IA. Perfeito para dublagens e audiobooks.',
  },
  {
    icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129',
    title: 'Traduzir Vídeos',
    description: 'Traduza e duble seus vídeos para vários idiomas mantendo a sincronia labial com IA.',
  },
  {
    icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z',
    title: 'Painel TikTok Shop',
    description: 'Gerencie sua loja no TikTok Shop, veja produtos mais vendidos, encontre nichos sem concorrência e publique vídeos de produtos diretamente.',
  },
]

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [showChat, setShowChat] = useState(false)

  function handleSend(text: string) {
    setShowChat(true)
    setMessages((prev) => [...prev, { role: 'user', text }])

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `Recebi sua mensagem! Em breve implementaremos a resposta da IA para: "${text}"`,
        },
      ])
    }, 800)
  }

  return (
    <div className="home-page">
      <div className="hero-area">
        {!showChat ? (
          <div className="hero-section">
            <h1 className="hero-logo">TokToy</h1>
            <p className="hero-subtitle">A melhor agência de <span className="hero-highlight">IAs</span></p>
          </div>
        ) : (
          <div className="messages-area">
            {messages.map((msg, i) => (
              <div key={i} className={`msg-row ${msg.role}`}>
                <div className="msg-bubble">{msg.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="home-chat">
        <ChatBox onSend={handleSend} />
      </div>

      <div className="features-section">
        <h2 className="section-title">Nossas Ferramentas</h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>
      </div>

      <div className="benefits-section">
        <h2 className="section-title">Por que escolher o TokToyIA?</h2>
        <div className="benefits-list">
          <div className="benefit-item">
            <div className="benefit-number">01</div>
            <div className="benefit-text">
              <h3>Criação Rápida</h3>
              <p>Gere conteúdo de alta qualidade em minutos, não em dias. Nossa IA faz o trabalho pesado para você.</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-number">02</div>
            <div className="benefit-text">
              <h3>Sem Limites Criativos</h3>
              <p>De vídeos a músicas, passando por imagens e narrações. Tudo que você precisa em um só lugar.</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-number">03</div>
            <div className="benefit-text">
              <h3>Integração TikTok</h3>
              <p>Publique diretamente no TikTok, monitore tendências e descubra produtos viralizando em tempo real.</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-number">04</div>
            <div className="benefit-text">
              <h3>Monitoramento Inteligente</h3>
              <p>A IA monitora sua conta TikTok e sugere o melhor conteúdo para engajar sua audiência.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
