// AI Synchronization Layer — Visionary OS
// Gemini 2.5 (Google)  ↔  Claude (Anthropic)
// Uses the latest @google/genai SDK

import { GoogleGenAI } from '@google/genai'

// ── Model IDs ───────────────────────────────────────────────────────────────
export const MODELS = {
  GEMINI_FLASH:        'gemini-2.5-flash',
  GEMINI_PRO:          'gemini-2.5-pro',
  GEMINI_COMPUTER_USE: 'gemini-2.5-computer-use-preview-10-2025',
}

// ── AISyncManager ────────────────────────────────────────────────────────────
export class AISyncManager {
  constructor(geminiApiKey = null) {
    const key = geminiApiKey
      || import.meta.env?.VITE_GEMINI_API_KEY
      || import.meta.env?.VITE_GOOGLE_API_KEY

    if (key) {
      this.genAI = new GoogleGenAI({ apiKey: key })
      this.ready = true
    } else {
      this.genAI = null
      this.ready = false
      console.warn('[AISyncManager] No Gemini API key found. Set VITE_GEMINI_API_KEY in .env')
    }
  }

  // ── Text query ─────────────────────────────────────────────────────────────
  async queryGemini(prompt, { model = MODELS.GEMINI_FLASH, stream = false } = {}) {
    this._assertReady()

    if (stream) {
      return this.streamGemini(prompt, model)
    }

    const response = await this.genAI.models.generateContent({
      model,
      contents: prompt,
    })
    return response.text
  }

  // ── Streaming response ────────────────────────────────────────────────────
  async streamGemini(prompt, model = MODELS.GEMINI_FLASH, onChunk = null) {
    this._assertReady()

    const result = await this.genAI.models.generateContentStream({
      model,
      contents: prompt,
    })

    let full = ''
    for await (const chunk of result) {
      const text = chunk.text ?? ''
      full += text
      onChunk?.(text, full)
    }
    return full
  }

  // ── Multimodal query (text + image/audio) ─────────────────────────────────
  async multimodalQuery(parts, model = MODELS.GEMINI_PRO) {
    this._assertReady()

    const response = await this.genAI.models.generateContent({
      model,
      contents: { parts },
    })
    return response.text
  }

  // ── Computer Use agent step ───────────────────────────────────────────────
  // Sends the current screenshot + task to Gemini 2.5 Computer Use model
  // and returns the list of function calls to execute.
  async computerUseStep({ task, screenshotBase64, history = [], tools = [] }) {
    this._assertReady()

    const contents = [
      ...history,
      {
        role: 'user',
        parts: [
          { text: task },
          ...(screenshotBase64 ? [{
            inlineData: { mimeType: 'image/png', data: screenshotBase64 }
          }] : [])
        ]
      }
    ]

    const response = await this.genAI.models.generateContent({
      model: MODELS.GEMINI_COMPUTER_USE,
      contents,
      config: { tools, temperature: 0.1 }
    })

    const candidate = response.candidates?.[0]
    const parts     = candidate?.content?.parts ?? []

    return {
      text:      parts.filter(p => p.text).map(p => p.text).join(' '),
      fnCalls:   parts.filter(p => p.functionCall).map(p => p.functionCall),
      rawParts:  parts,
    }
  }

  // ── Sync: query Gemini + Claude simultaneously ────────────────────────────
  async syncQuery(prompt, geminiModel = MODELS.GEMINI_FLASH) {
    const [gemini, claude] = await Promise.allSettled([
      this.queryGemini(prompt, { model: geminiModel }),
      this._queryClaude(prompt),
    ])

    return {
      gemini:   gemini.status  === 'fulfilled' ? gemini.value  : { error: gemini.reason?.message },
      claude:   claude.status  === 'fulfilled' ? claude.value  : { error: claude.reason?.message },
      combined: [gemini, claude]
        .filter(r => r.status === 'fulfilled')
        .map(r => r.value)
        .join('\n\n---\n\n'),
    }
  }

  // ── Chat session ──────────────────────────────────────────────────────────
  startChat(model = MODELS.GEMINI_FLASH, systemPrompt = null) {
    this._assertReady()

    const config = systemPrompt
      ? { systemInstruction: systemPrompt }
      : undefined

    return this.genAI.chats.create({ model, config })
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  _assertReady() {
    if (!this.ready) {
      throw new Error('Gemini API key not configured. Add VITE_GEMINI_API_KEY to your .env file.')
    }
  }

  // Placeholder – replace with real Anthropic SDK call when backend is set up
  async _queryClaude(prompt) {
    console.log('[AISyncManager] Claude query (placeholder):', prompt.slice(0, 60))
    return '(Claude response — configure ANTHROPIC_API_KEY in backend)'
  }

  // Health check
  async ping() {
    try {
      const res = await this.queryGemini('Reply with only "pong".')
      return { ok: true, response: res }
    } catch (err) {
      return { ok: false, error: err.message }
    }
  }
}

// Singleton export for convenience
export const aiSync = new AISyncManager()
export default AISyncManager
