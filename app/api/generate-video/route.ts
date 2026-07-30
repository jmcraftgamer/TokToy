import { NextRequest, NextResponse } from 'next/server'

const HF_TOKEN = process.env.HUGGINGFACE_TOKEN
const HF_API = 'https://router.huggingface.co/hf-inference/models/cerspense/zeroscope_v2_576w'

export async function POST(req: NextRequest) {
  try {
    if (!HF_TOKEN) {
      return NextResponse.json({ error: 'HUGGINGFACE_TOKEN não configurado no .env.local' }, { status: 500 })
    }

    const { prompt } = await req.json()

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const response = await fetch(HF_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: prompt }),
    })

    if (response.status === 503) {
      const text = await response.text()
      const loading = text.toLowerCase().includes('loading')
      return NextResponse.json(
        { error: loading ? 'Modelo de vídeo carregando. Tente novamente em alguns segundos.' : 'Serviço indisponível.', loading },
        { status: 503 }
      )
    }

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: `A geração de vídeo por IA não está disponível no seu plano atual da HuggingFace. Tente novamente mais tarde ou configure um provedor pago.` },
        { status: response.status }
      )
    }

    const buffer = Buffer.from(await response.arrayBuffer())
    const base64 = buffer.toString('base64')
    const videoUrl = `data:video/mp4;base64,${base64}`

    return NextResponse.json({ videoUrl })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Geração de vídeo temporariamente indisponível. A API da HuggingFace não suporta vídeos no plano gratuito atual.' },
      { status: 503 }
    )
  }
}
