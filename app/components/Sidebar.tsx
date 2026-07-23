'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const mainItems = [
  { href: '/', label: 'Início', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { href: '/create-video', label: 'Criar Vídeos com IA', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
  { href: '/create-commercial', label: 'Criar Comerciais', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
  { href: '/create-influencer', label: 'Criar Influencer IA', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { href: '/edit-video', label: 'Editar com IA', icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' },
]

const extraItems = [
  { href: '/images', label: 'Imagens com IA', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { href: '/music', label: 'Músicas com IA', icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3' },
  { href: '/sound-effects', label: 'Efeitos Sonoros', icon: 'M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z' },
  { href: '/narration', label: 'Narrações', icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' },
  { href: '/translate', label: 'Traduzir Vídeos', icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129' },
  { href: '/tiktok/trending', label: 'Vídeos Virais TikTok', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
]

const bottomItems = [
  { href: '/tiktok/shop', label: 'Painel TikTok Shop', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z' },
  { href: '/settings', label: 'Configurações', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  { href: '/connectors', label: 'Conectores', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
]

function NavItem({ item, collapsed, isActive }: { item: { href: string; label: string; icon: string }; collapsed: boolean; isActive: boolean }) {
  return (
    <Link
      href={item.href}
      className={`sidebar-item ${isActive ? 'active' : ''}`}
    >
      <div className="sidebar-icon-wrapper">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="sidebar-icon"
        >
          <path d={item.icon} />
        </svg>
      </div>
      <span className={`sidebar-label ${collapsed ? 'hidden' : ''}`}>
        {item.label}
      </span>
    </Link>
  )
}

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false)
  const [showExtra, setShowExtra] = useState(false)
  const pathname = usePathname()

  return (
    <nav
      className={`sidebar ${expanded ? 'expanded' : ''}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => { setExpanded(false); setShowExtra(false) }}
    >
      <div className="sidebar-top">
        <div className="sidebar-logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
          <span className={`sidebar-logo-text ${expanded ? '' : 'hidden'}`}>TokToyIA</span>
        </div>
      </div>

      <div className="sidebar-items">
        {mainItems.map((item) => (
          <NavItem key={item.href} item={item} collapsed={!expanded} isActive={pathname === item.href} />
        ))}

        <div className="sidebar-divider" />

        <button
          className="sidebar-item extra-toggle"
          onClick={() => setShowExtra(!showExtra)}
        >
          <div className="sidebar-icon-wrapper">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              className={`extra-arrow ${showExtra ? 'rotated' : ''}`}
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
          <span className={`sidebar-label ${!expanded ? 'hidden' : ''}`}>Opções Extras</span>
        </button>

        <div className={`extra-items ${showExtra ? 'show' : ''}`}>
          {extraItems.map((item) => (
            <NavItem key={item.href} item={item} collapsed={!expanded} isActive={pathname === item.href} />
          ))}
        </div>
      </div>

      <div className="sidebar-bottom">
        {bottomItems.map((item) => (
          <NavItem key={item.href} item={item} collapsed={!expanded} isActive={pathname === item.href} />
        ))}
      </div>
    </nav>
  )
}
