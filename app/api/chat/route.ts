import { NextRequest, NextResponse } from 'next/server'

const HF_TOKEN = process.env.HUGGINGFACE_TOKEN
const HF_API = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3'

export async function POST(req: NextRequest) {
  try {
    const { message, history, systemPrompt } = await req.json()

    if (!message && (!history || history.length === 0)) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    let formattedPrompt = ''
    if (systemPrompt) {
      formattedPrompt = `<s>[INST] ${systemPrompt}\n\n---\n\n${message} [/INST]`
    } else if (history && history.length > 0) {
      const historyStr = history.map((m: any) => {
        if (m.role === 'user') return `<s>[INST] ${m.content} [/INST]>`
        if (m.role === 'assistant') return `${m.content}</s>`
        return ''
      }).join('')
      formattedPrompt = `${historyStr}<s>[INST] ${message} [/INST]`
    } else {
      formattedPrompt = `<s>[INST] ${message} [/INST]`
    }

    const response = await fetch(HF_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: formattedPrompt,
        parameters: {
          max_new_tokens: 600,
          temperature: 0.7,
          top_p: 0.95,
          do_sample: true,
          return_full_text: false,
        },
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
    const generatedText = Array.isArray(data) ? data[0]?.generated_text || '' : data.generated_text || ''

    return NextResponse.json({ response: generatedText.trim() })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
