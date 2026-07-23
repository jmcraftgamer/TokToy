import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TokToyIA',
  description: 'TokToyIA - A melhor agência de IAs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
