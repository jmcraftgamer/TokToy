'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'

const options = [
  {
    id: 'post',
    title: 'Post para Redes',
    desc: 'Crie uma imagem de produto profissional com design atrativo e chamativo para suas redes sociais.',
    href: '/create-commercial/post',
  },
  {
    id: 'video',
    title: 'Comercial em Vídeo',
    desc: 'Produza um comercial completo com efeitos, narração e música — um anúncio super produzido.',
    href: '/create-commercial/video',
  },
  {
    id: 'influencer',
    title: 'Influencer IA',
    desc: 'Use um dos seus influenciadores de IA criados no app para apresentar seu produto.',
    href: '/create-commercial/influencer',
  },
]

const exampleVideos = [
  { name: 'Comercial Produto X', duration: '0:30' },
  { name: 'Promoção TikTok Shop', duration: '0:15' },
  { name: 'Unboxing Produto Y', duration: '1:00' },
  { name: 'Comercial Verão', duration: '0:45' },
  { name: 'Lançamento Coleção', duration: '0:20' },
  { name: 'Oferta Relâmpago', duration: '0:25' },
  { name: 'Comercial Natália', duration: '0:35' },
  { name: 'Promoção Fim de Ano', duration: '0:40' },
]

function PlayIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

export default function CreateCommercialPage() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [scrollPos, setScrollPos] = useState(0)

  function scrollCarousel(dir: number) {
    if (!carouselRef.current) return
    const scrollAmt = 320
    carouselRef.current.scrollBy({ left: dir * scrollAmt, behavior: 'smooth' })
    setScrollPos(carouselRef.current.scrollLeft + dir * scrollAmt)
  }

  return (
    <div className="cm-page">
      <div className="cm-hero">
        <h1 className="cm-title">Crie o seu próprio comercial</h1>
        <p className="cm-subtitle">
          Chame a atenção do público e ganhe milhões de clientes com comerciais profissionais!
        </p>
      </div>

      <div className="cm-options">
        {options.map((opt) => (
          <Link key={opt.id} href={opt.href} className="cm-card-link">
            <div className="cm-card">
              <div className="cm-card-frame">
                <div className="cm-card-thumb">
                  <PlayIcon />
                </div>
                <span className="cm-card-badge">Exemplo</span>
              </div>
              <div className="cm-card-info">
                <h3 className="cm-card-title">{opt.title}</h3>
                <p className="cm-card-desc">{opt.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="cm-carousel-section">
        <h2 className="cm-carousel-title">Exemplos de comerciais criados com IA</h2>
        <div className="cm-carousel-wrapper">
          <button className="cm-carousel-btn left" onClick={() => scrollCarousel(-1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <div className="cm-carousel" ref={carouselRef}>
            {exampleVideos.map((v, i) => (
              <div key={i} className="cm-carousel-item">
                <div className="cm-carousel-frame">
                  <PlayIcon />
                  <span className="cm-carousel-dur">{v.duration}</span>
                </div>
                <span className="cm-carousel-name">{v.name}</span>
              </div>
            ))}
          </div>
          <button className="cm-carousel-btn right" onClick={() => scrollCarousel(1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
      </div>
    </div>
  )
}
