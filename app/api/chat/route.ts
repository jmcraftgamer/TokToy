import { NextRequest, NextResponse } from 'next/server'

const HF_TOKEN = process.env.HUGGINGFACE_TOKEN
const HF_API = 'https://router.huggingface.co/v1/chat/completions'

export async function POST(req: NextRequest) {
  try {
    if (!HF_TOKEN) {
      return NextResponse.json({ error: 'HUGGINGFACE_TOKEN não configurado no .env.local' }, { status: 500 })
    }

    const { message, systemPrompt } = await req.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const messages: any[] = []
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt })
    }
    messages.push({ role: 'user', content: message })

    const response = await fetch(HF_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/Llama-3.1-8B-Instruct',
        messages,
        max_tokens: 600,
        temperature: 0.7,
        top_p: 0.95,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: `HuggingFace API error: ${response.status}`, details: errorText },
        { status: response.status }
      )
    }

    const data = await response.json()
    const generatedText = data?.choices?.[0]?.message?.content || ''

    return NextResponse.json({ response: generatedText.trim() })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
