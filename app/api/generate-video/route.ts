import { NextRequest, NextResponse } from 'next/server'

const HF_TOKEN = process.env.HUGGINGFACE_TOKEN
const HF_API = 'https://api-inference.huggingface.co/models/cerspense/zeroscope_v2_576w'

export async function POST(req: NextRequest) {
  try {
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
        { error: loading ? 'O modelo de vídeo está carregando. Tentando novamente...' : 'Serviço indisponível no momento.', loading },
        { status: 503 }
      )
    }

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: `Erro na geração de vídeo: ${response.status}` },
        { status: response.status }
      )
    }

    const buffer = Buffer.from(await response.arrayBuffer())
    const base64 = buffer.toString('base64')
    const videoUrl = `data:video/mp4;base64,${base64}`

    return NextResponse.json({ videoUrl })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
