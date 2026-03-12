import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Monitor, Play, Square, AlertTriangle, CheckCircle,
  Eye, MousePointer, Keyboard, Globe, ChevronRight,
  Loader, Zap, Shield, Camera, ArrowRight, Terminal,
  RefreshCw, Maximize2, XCircle
} from 'lucide-react'

const MODEL_ID = 'gemini-2.5-computer-use-preview-10-2025'

const ACTION_ICONS = {
  navigate:       Globe,
  click_at:       MousePointer,
  type_text_at:   Keyboard,
  scroll_document: RefreshCw,
  screenshot:     Camera,
  wait:           Loader,
  finished:       CheckCircle,
  error:          XCircle,
}

const BLOCKED_ACTIONS = ['system_integrity', 'security_breach', 'captcha_bypass']

export default function Gemini25ComputerUse() {
  const [apiKey, setApiKey]           = useState(import.meta.env.VITE_GEMINI_API_KEY || '')
  const [task, setTask]               = useState('')
  const [running, setRunning]         = useState(false)
  const [actionLog, setActionLog]     = useState([])
  const [screenshot, setScreenshot]   = useState(null)
  const [status, setStatus]           = useState('idle')          // idle | thinking | acting | waiting | done | error
  const [safetyPending, setSafetyPending] = useState(null)        // {action, resolve, reject}
  const [browserUrl, setBrowserUrl]   = useState('about:blank')
  const [stepCount, setStepCount]     = useState(0)
  const [showApiSetup, setShowApiSetup] = useState(false)
  const abortRef  = useRef(false)
  const logEndRef = useRef(null)

  useEffect(() => { logEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [actionLog])

  // ── Logging helper ────────────────────────────────────────────────────────
  const log = useCallback((type, message, detail = null) => {
    setActionLog(prev => [...prev, {
      id: Date.now() + Math.random(),
      type,      // 'thought' | 'action' | 'observe' | 'safety' | 'error' | 'done'
      message,
      detail,
      time: new Date().toLocaleTimeString()
    }])
  }, [])

  // ── Take screenshot via Electron IPC (falls back to placeholder in web) ──
  const takeScreenshot = useCallback(async () => {
    if (window.electronAPI?.captureScreen) {
      const data = await window.electronAPI.captureScreen()
      setScreenshot(data)
      return data
    }
    // Web fallback – use a blank canvas screenshot
    const canvas = document.createElement('canvas')
    canvas.width = 1280; canvas.height = 800
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#0a0a0f'
    ctx.fillRect(0, 0, 1280, 800)
    ctx.fillStyle = '#7c3aed'
    ctx.font = '32px sans-serif'
    ctx.fillText('Gemini 2.5 Computer Use', 400, 380)
    const data = canvas.toDataURL('image/png').split(',')[1]
    setScreenshot(`data:image/png;base64,${data}`)
    return data
  }, [])

  // ── Safety confirmation ───────────────────────────────────────────────────
  const requestSafetyConfirmation = useCallback((action) => {
    return new Promise((resolve, reject) => {
      setSafetyPending({ action, resolve, reject })
    })
  }, [])

  const confirmSafety  = () => { safetyPending?.resolve(true);  setSafetyPending(null) }
  const declineSafety  = () => { safetyPending?.reject(new Error('User declined action')); setSafetyPending(null) }

  // ── Execute a single computer-use action ─────────────────────────────────
  const executeAction = useCallback(async (fnCall) => {
    const { name, args } = fnCall

    if (BLOCKED_ACTIONS.includes(name)) {
      log('error', `Blocked action: ${name}`)
      return null
    }

    // Sensitive actions require human confirmation
    const sensitive = ['delete', 'rm', 'sudo', 'format', 'shutdown']
    if (sensitive.some(s => JSON.stringify(args).toLowerCase().includes(s))) {
      log('safety', `Sensitive action detected – awaiting confirmation`, JSON.stringify(args))
      await requestSafetyConfirmation({ name, args })
    }

    log('action', `${name}`, JSON.stringify(args))

    switch (name) {
      case 'navigate':
        setBrowserUrl(args.url || '')
        await new Promise(r => setTimeout(r, 800))
        break
      case 'click_at':
        await new Promise(r => setTimeout(r, 400))
        break
      case 'type_text_at':
        await new Promise(r => setTimeout(r, 300))
        break
      case 'scroll_document':
        await new Promise(r => setTimeout(r, 300))
        break
      default:
        await new Promise(r => setTimeout(r, 200))
    }

    return await takeScreenshot()
  }, [log, requestSafetyConfirmation, takeScreenshot])

  // ── Main agent loop ───────────────────────────────────────────────────────
  const runAgent = useCallback(async () => {
    if (!apiKey) { setShowApiSetup(true); return }
    if (!task.trim()) return

    abortRef.current = false
    setRunning(true)
    setActionLog([])
    setStepCount(0)
    setStatus('thinking')
    log('thought', `Starting task: "${task}"`)

    try {
      const { GoogleGenAI } = await import('@google/genai')
      const ai = new GoogleGenAI({ apiKey })

      // Grab initial screenshot
      const initScreenshot = await takeScreenshot()
      log('observe', 'Initial screenshot captured')

      const tools = [{
        functionDeclarations: [
          {
            name: 'navigate',
            description: 'Navigate the browser to a URL',
            parameters: { type: 'OBJECT', properties: { url: { type: 'STRING' } }, required: ['url'] }
          },
          {
            name: 'click_at',
            description: 'Click at specific screen coordinates',
            parameters: {
              type: 'OBJECT',
              properties: {
                x: { type: 'NUMBER', description: 'X coordinate (0-1280)' },
                y: { type: 'NUMBER', description: 'Y coordinate (0-800)' },
                button: { type: 'STRING', enum: ['left', 'right', 'middle'] }
              },
              required: ['x', 'y']
            }
          },
          {
            name: 'type_text_at',
            description: 'Type text at a position or into the focused element',
            parameters: {
              type: 'OBJECT',
              properties: {
                x: { type: 'NUMBER' },
                y: { type: 'NUMBER' },
                text: { type: 'STRING' }
              },
              required: ['text']
            }
          },
          {
            name: 'scroll_document',
            description: 'Scroll the page up or down',
            parameters: {
              type: 'OBJECT',
              properties: {
                direction: { type: 'STRING', enum: ['up', 'down'] },
                amount: { type: 'NUMBER', description: 'Pixels to scroll' }
              },
              required: ['direction']
            }
          },
          {
            name: 'finished',
            description: 'Signal that the task has been completed',
            parameters: {
              type: 'OBJECT',
              properties: { summary: { type: 'STRING', description: 'Summary of what was accomplished' } },
              required: ['summary']
            }
          }
        ]
      }]

      const systemPrompt = `You are Gemini 2.5 Computer Use integrated into Visionary OS – a music empire management platform for Red Vision Music.

Your job is to autonomously complete tasks on behalf of Jason (the founder).

Music Empire Context:
- Red Vision Music (record label)
- Artists: #4429 Branding, GiFTD N' PrVLGD
- Goals: music licensing, marketing, streaming growth, brand management

Rules:
1. Take screenshots to observe the current state before acting
2. Be precise with coordinates
3. Always call 'finished' when done
4. Never perform destructive or irreversible actions without explicit confirmation
5. Prioritize music business tasks`

      // Build initial message with screenshot
      const messages = [{
        role: 'user',
        parts: [
          { text: `${systemPrompt}\n\nTask: ${task}` },
          {
            inlineData: {
              mimeType: 'image/png',
              data: initScreenshot
            }
          }
        ]
      }]

      let stepNum = 0
      const MAX_STEPS = 20

      while (stepNum < MAX_STEPS && !abortRef.current) {
        stepNum++
        setStepCount(stepNum)
        setStatus('thinking')
        log('thought', `Step ${stepNum} – Analyzing screen…`)

        const response = await ai.models.generateContent({
          model: MODEL_ID,
          contents: messages,
          tools,
          config: { temperature: 0.1 }
        })

        const candidate = response.candidates?.[0]
        if (!candidate) { log('error', 'No response from Gemini'); break }

        const parts = candidate.content?.parts || []

        // Extract text narration
        const textParts = parts.filter(p => p.text)
        if (textParts.length) {
          log('thought', textParts.map(p => p.text).join(' '))
        }

        // Extract function calls
        const fnCalls = parts.filter(p => p.functionCall)
        if (!fnCalls.length) {
          log('done', 'Task complete – no further actions needed')
          setStatus('done')
          break
        }

        // Process each function call
        for (const part of fnCalls) {
          if (abortRef.current) break
          const fnCall = part.functionCall

          if (fnCall.name === 'finished') {
            log('done', `✅ ${fnCall.args?.summary || 'Task completed'}`)
            setStatus('done')
            setRunning(false)
            return
          }

          setStatus('acting')
          const newScreenshot = await executeAction(fnCall)

          // Feed result back to model
          messages.push({ role: 'model', parts })
          messages.push({
            role: 'user',
            parts: [
              { text: `Action '${fnCall.name}' completed. Here is the updated screenshot:` },
              ...(newScreenshot ? [{
                inlineData: { mimeType: 'image/png', data: newScreenshot }
              }] : [{ text: '(No screenshot available)' }])
            ]
          })

          setStatus('thinking')
          log('observe', `Screen updated after ${fnCall.name}`)
        }
      }

      if (stepNum >= MAX_STEPS) {
        log('error', `Reached maximum steps (${MAX_STEPS}). Task may be incomplete.`)
      }

      setStatus('done')
    } catch (err) {
      log('error', err.message)
      setStatus('error')
    } finally {
      setRunning(false)
    }
  }, [apiKey, task, log, takeScreenshot, executeAction])

  const stopAgent = () => { abortRef.current = true; setRunning(false); setStatus('idle') }

  // ── Suggested tasks ───────────────────────────────────────────────────────
  const suggestions = [
    '🎵 Search Spotify for Red Vision Music and capture streaming stats',
    '📊 Go to Instagram and check the latest engagement metrics',
    '💰 Search for music licensing opportunities for hip-hop beats',
    '📱 Post a tweet announcing our latest release from @redvisionmusic',
    '🎧 Find SoundCloud profile and screenshot follower count',
    '📈 Search Google Trends for "Red Vision Music" popularity',
  ]

  const statusColors = {
    idle:     'text-gray-400',
    thinking: 'text-purple-400',
    acting:   'text-orange-400',
    waiting:  'text-yellow-400',
    done:     'text-green-400',
    error:    'text-red-400',
  }

  const statusLabels = {
    idle:     'Ready',
    thinking: 'Thinking…',
    acting:   'Acting…',
    waiting:  'Waiting…',
    done:     'Done',
    error:    'Error',
  }

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <Monitor className="w-7 h-7 text-white" />
            </div>
            Gemini 2.5 Computer Use
          </h2>
          <p className="text-gray-400">
            AI that sees your screen, thinks, and acts — powered by{' '}
            <span className="text-purple-400 font-semibold">{MODEL_ID}</span>
          </p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-sm font-semibold ${statusColors[status]}`}>
          {status === 'thinking' && <Loader className="w-4 h-4 animate-spin" />}
          {status === 'acting'   && <Zap    className="w-4 h-4 animate-pulse" />}
          {statusLabels[status]}
        </div>
      </div>

      {/* ── API Key Setup ── */}
      {(showApiSetup || !apiKey) && (
        <div className="p-5 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-semibold">Gemini API Key Required</p>
              <p className="text-gray-400 text-sm mt-1">
                Get your free key from{' '}
                <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer"
                  className="text-blue-400 hover:underline">
                  Google AI Studio
                </a>
                {' '}(free tier: 60 req/min)
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="AIza..."
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={() => setShowApiSetup(false)}
              disabled={!apiKey}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
            >
              Save
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Or set <code className="text-purple-400">VITE_GEMINI_API_KEY</code> in your .env file
          </p>
        </div>
      )}

      {/* ── Main Grid ── */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Left: Task + Controls */}
        <div className="space-y-4">

          {/* Task Input */}
          <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              What should Gemini do?
            </label>
            <textarea
              value={task}
              onChange={e => setTask(e.target.value)}
              placeholder="e.g. Go to Spotify, search for Red Vision Music, and screenshot the artist page"
              rows={3}
              className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-sm"
            />

            <div className="flex gap-2 mt-3">
              {!running ? (
                <button
                  onClick={runAgent}
                  disabled={!task.trim()}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Run Agent
                </button>
              ) : (
                <button
                  onClick={stopAgent}
                  className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2"
                >
                  <Square className="w-5 h-5" />
                  Stop
                </button>
              )}
              <button
                onClick={() => { setActionLog([]); setScreenshot(null); setStatus('idle') }}
                className="px-4 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Step Counter */}
          {running && (
            <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl flex items-center gap-3">
              <Loader className="w-5 h-5 text-purple-400 animate-spin" />
              <div>
                <p className="text-white font-semibold text-sm">
                  Step {stepCount} / 20 — {statusLabels[status]}
                </p>
                <p className="text-purple-300 text-xs">See → Think → Act → Observe loop running</p>
              </div>
            </div>
          )}

          {/* Safety Confirmation Modal */}
          {safetyPending && (
            <div className="p-5 bg-red-500/10 border border-red-500/40 rounded-2xl">
              <div className="flex items-start gap-3 mb-4">
                <Shield className="w-6 h-6 text-red-400 shrink-0" />
                <div>
                  <p className="text-white font-bold text-lg">Safety Confirmation Required</p>
                  <p className="text-gray-300 text-sm mt-1">
                    Gemini wants to perform a sensitive action:
                  </p>
                  <code className="block mt-2 p-2 bg-black/40 rounded text-red-300 text-xs">
                    {JSON.stringify(safetyPending.action, null, 2)}
                  </code>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={confirmSafety}
                  className="flex-1 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
                  ✅ Allow
                </button>
                <button onClick={declineSafety}
                  className="flex-1 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition">
                  ❌ Deny
                </button>
              </div>
            </div>
          )}

          {/* Suggested Tasks */}
          <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-sm font-semibold text-gray-300 mb-3">Suggested Tasks</p>
            <div className="space-y-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setTask(s.replace(/^[^ ]+ /, ''))}
                  className="w-full text-left px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300 hover:text-white transition flex items-center gap-2 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-purple-400 shrink-0 opacity-0 group-hover:opacity-100 transition" />
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Screenshot + Log */}
        <div className="space-y-4">

          {/* Live Screenshot */}
          <div className="p-4 bg-black/40 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <Eye className="w-4 h-4 text-purple-400" /> Live Screen View
              </p>
              <span className="text-xs text-gray-500 font-mono">{browserUrl}</span>
            </div>
            {screenshot ? (
              <img
                src={screenshot.startsWith('data:') ? screenshot : `data:image/png;base64,${screenshot}`}
                alt="Current screen"
                className="w-full rounded-lg border border-white/10"
              />
            ) : (
              <div className="w-full h-48 rounded-lg bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/10 flex flex-col items-center justify-center gap-3">
                <Monitor className="w-10 h-10 text-purple-400/50" />
                <p className="text-gray-500 text-sm">Screen appears here when agent runs</p>
              </div>
            )}
          </div>

          {/* Action Log */}
          <div className="p-4 bg-black/40 rounded-2xl border border-white/10">
            <p className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-green-400" /> Agent Log
            </p>
            <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
              {actionLog.length === 0 && (
                <p className="text-gray-600 text-sm py-4 text-center">Logs appear here during execution…</p>
              )}
              {actionLog.map(entry => {
                const Icon = ACTION_ICONS[entry.type] || ChevronRight
                const colors = {
                  thought:  'text-purple-300 border-purple-500/20',
                  action:   'text-orange-300 border-orange-500/20',
                  observe:  'text-blue-300   border-blue-500/20',
                  safety:   'text-yellow-300 border-yellow-500/20',
                  error:    'text-red-300    border-red-500/20',
                  done:     'text-green-300  border-green-500/20',
                }
                return (
                  <div key={entry.id}
                    className={`flex items-start gap-2 px-3 py-2 rounded-lg border bg-white/5 text-xs ${colors[entry.type] || 'text-gray-300 border-white/10'}`}>
                    <Icon className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <span className="uppercase text-[10px] font-bold opacity-60 mr-1">{entry.type}</span>
                      <span className="break-words">{entry.message}</span>
                      {entry.detail && (
                        <code className="block mt-1 opacity-60 truncate">{entry.detail}</code>
                      )}
                    </div>
                    <span className="text-[10px] opacity-40 shrink-0">{entry.time}</span>
                  </div>
                )
              })}
              <div ref={logEndRef} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Model',    value: 'Gemini 2.5 CU',  icon: Zap },
          { label: 'Steps',    value: stepCount,          icon: ChevronRight },
          { label: 'Actions',  value: actionLog.filter(l => l.type === 'action').length, icon: MousePointer },
          { label: 'Status',   value: statusLabels[status], icon: Monitor },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
            <Icon className="w-5 h-5 text-purple-400 mx-auto mb-1" />
            <p className="text-white font-bold text-lg">{value}</p>
            <p className="text-gray-500 text-xs">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Capabilities Banner ── */}
      <div className="p-5 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl border border-blue-500/20">
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          What Gemini 2.5 Computer Use Can Do
        </h3>
        <div className="grid md:grid-cols-3 gap-3 text-sm text-gray-300">
          {[
            ['🌐 Web Browsing',       'Navigate any website, click links, fill forms'],
            ['🔍 Visual Search',      'See screenshots and understand UI elements'],
            ['⌨️ Type & Input',       'Enter text, passwords, and form data'],
            ['📊 Scrape Data',        'Extract streaming stats, analytics, metrics'],
            ['📱 Social Media',       'Post updates, check notifications, reply to DMs'],
            ['🎵 Music Business',     'Monitor Spotify, Apple Music, YouTube Music'],
          ].map(([title, desc]) => (
            <div key={title} className="p-3 bg-white/5 rounded-xl">
              <p className="font-semibold text-white text-sm">{title}</p>
              <p className="text-xs text-gray-400 mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
