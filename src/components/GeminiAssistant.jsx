import { useState, useRef, useEffect } from 'react'
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Eye,
  EyeOff,
  Brain,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
  X,
  Sparkles,
  Camera,
  Monitor,
  Loader
} from 'lucide-react'

export default function GeminiAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [visionEnabled, setVisionEnabled] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [captureMode, setCaptureMode] = useState('none') // 'none', 'screen', 'camera'

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '👋 Hey! I\'m your Gemini 2.0 assistant. I can see, hear, and think autonomously. Try talking to me or showing me your screen!',
      timestamp: new Date()
    }
  ])

  const [audioLevel, setAudioLevel] = useState(0)
  const [transcription, setTranscription] = useState('')

  const mediaRecorderRef = useRef(null)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const speechSynthesisRef = useRef(null)

  // Microphone visualization
  useEffect(() => {
    if (isListening && audioContextRef.current && analyserRef.current) {
      const analyser = analyserRef.current
      const dataArray = new Uint8Array(analyser.frequencyBinCount)

      const updateLevel = () => {
        analyser.getByteFrequencyData(dataArray)
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length
        setAudioLevel(average / 255)

        if (isListening) {
          requestAnimationFrame(updateLevel)
        }
      }

      updateLevel()
    }
  }, [isListening])

  // Start listening (voice input)
  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      // Setup audio context for visualization
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      analyserRef.current = audioContextRef.current.createAnalyser()
      const source = audioContextRef.current.createMediaStreamSource(stream)
      source.connect(analyserRef.current)
      analyserRef.current.fftSize = 256

      // Setup media recorder for actual recording
      mediaRecorderRef.current = new MediaRecorder(stream)
      const audioChunks = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.push(event.data)
      }

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' })
        await processAudio(audioBlob)
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorderRef.current.start()
      setIsListening(true)
      setTranscription('Listening...')
    } catch (error) {
      console.error('Microphone access denied:', error)
      addMessage('assistant', '❌ Could not access microphone. Please grant permission.')
    }
  }

  // Stop listening
  const stopListening = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }
    setIsListening(false)
    setAudioLevel(0)
  }

  // Process audio with Gemini
  const processAudio = async (audioBlob) => {
    setIsThinking(true)
    setTranscription('Processing...')

    try {
      // Convert audio to base64
      const reader = new FileReader()
      reader.readAsDataURL(audioBlob)
      reader.onloadend = async () => {
        const base64Audio = reader.result.split(',')[1]

        // Simulate Gemini API call (replace with actual API)
        // In production, you'd send to your backend which calls Gemini API
        const response = await callGeminiAPI({
          audio: base64Audio,
          image: visionEnabled ? await captureScreen() : null,
          previousMessages: messages
        })

        setTranscription(response.transcription)
        addMessage('user', response.transcription)
        addMessage('assistant', response.reply)

        if (audioEnabled) {
          speakResponse(response.reply)
        }
      }
    } catch (error) {
      console.error('Error processing audio:', error)
      addMessage('assistant', '❌ Sorry, I had trouble processing that.')
    } finally {
      setIsThinking(false)
    }
  }

  // Simulate Gemini API call (replace with real implementation)
  const callGeminiAPI = async ({ audio, image, previousMessages }) => {
    // Simulated response - in production, call actual Gemini 2.0 API
    await new Promise(resolve => setTimeout(resolve, 1500))

    return {
      transcription: 'How are my music sales doing this month?',
      reply: 'Looking at your dashboard, your music sales are up 23% this month! Red Vision Music has generated $15.2K in revenue, with streaming up significantly. Your top performing track is getting great traction on Spotify playlists. Want me to break down the numbers by platform?'
    }
  }

  // Text-to-speech
  const speakResponse = (text) => {
    if (!audioEnabled) return

    setIsSpeaking(true)
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.0
    utterance.pitch = 1.0
    utterance.volume = 1.0

    // Try to use a more natural voice
    const voices = speechSynthesis.getVoices()
    const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Natural'))
    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    utterance.onend = () => setIsSpeaking(false)
    speechSynthesis.speak(utterance)
  }

  // Screen capture
  const captureScreen = async () => {
    if (captureMode === 'none') return null

    try {
      if (captureMode === 'screen') {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true })
        const video = document.createElement('video')
        video.srcObject = stream
        video.play()

        await new Promise(resolve => setTimeout(resolve, 100))

        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const ctx = canvas.getContext('2d')
        ctx.drawImage(video, 0, 0)

        stream.getTracks().forEach(track => track.stop())

        return canvas.toDataURL('image/png').split(',')[1]
      } else if (captureMode === 'camera') {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        videoRef.current.srcObject = stream
        await videoRef.current.play()

        const canvas = canvasRef.current
        canvas.width = videoRef.current.videoWidth
        canvas.height = videoRef.current.videoHeight
        const ctx = canvas.getContext('2d')
        ctx.drawImage(videoRef.current, 0, 0)

        stream.getTracks().forEach(track => track.stop())

        return canvas.toDataURL('image/png').split(',')[1]
      }
    } catch (error) {
      console.error('Screen capture error:', error)
      return null
    }
  }

  // Toggle vision modes
  const toggleVision = async () => {
    if (!visionEnabled) {
      // Enable vision - capture once
      setVisionEnabled(true)
      addMessage('assistant', '👁️ Vision enabled! I can now see your screen.')
    } else {
      setVisionEnabled(false)
      addMessage('assistant', '👁️ Vision disabled.')
    }
  }

  // Add message to chat
  const addMessage = (role, content) => {
    setMessages(prev => [...prev, {
      role,
      content,
      timestamp: new Date()
    }])
  }

  // Voice command button
  const handleVoiceCommand = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center ${
          isListening ? 'animate-pulse ring-4 ring-green-400' : ''
        }`}
      >
        {isListening ? (
          <Mic className="w-8 h-8 animate-pulse" />
        ) : isThinking ? (
          <Loader className="w-8 h-8 animate-spin" />
        ) : isSpeaking ? (
          <Volume2 className="w-8 h-8 animate-pulse" />
        ) : (
          <Sparkles className="w-8 h-8" />
        )}
      </button>

      {/* Audio Level Indicator */}
      {isListening && (
        <div className="fixed bottom-24 right-6 bg-dark-800 border border-green-400 rounded-lg p-3 z-50">
          <div className="flex items-center space-x-2">
            <Mic className="w-4 h-4 text-green-400" />
            <div className="w-32 h-2 bg-dark-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-100"
                style={{ width: `${audioLevel * 100}%` }}
              />
            </div>
          </div>
          {transcription && (
            <p className="text-xs text-gray-400 mt-2">{transcription}</p>
          )}
        </div>
      )}

      {/* Assistant Window */}
      {isOpen && (
        <div
          className={`fixed ${
            isExpanded
              ? 'inset-4'
              : 'bottom-24 right-6 w-96 h-[600px]'
          } bg-dark-800 border-2 border-purple-500/30 rounded-2xl shadow-2xl z-40 flex flex-col transition-all duration-300`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-dark-600">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold">Gemini 2.0 Assistant</h3>
                <p className="text-xs text-gray-400 flex items-center space-x-2">
                  <Brain className="w-3 h-3" />
                  <span>Multimodal AI</span>
                  {isThinking && <span className="animate-pulse">• Thinking...</span>}
                  {isSpeaking && <span className="animate-pulse">• Speaking...</span>}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Capabilities Bar */}
          <div className="flex items-center justify-between p-3 bg-dark-900 border-b border-dark-600">
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleVision}
                className={`px-3 py-1 rounded-lg flex items-center space-x-2 transition-colors ${
                  visionEnabled ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-dark-700 text-gray-400'
                }`}
              >
                {visionEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                <span className="text-xs">Vision</span>
              </button>

              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`px-3 py-1 rounded-lg flex items-center space-x-2 transition-colors ${
                  audioEnabled ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-dark-700 text-gray-400'
                }`}
              >
                {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span className="text-xs">Audio</span>
              </button>

              <select
                value={captureMode}
                onChange={(e) => setCaptureMode(e.target.value)}
                className="px-2 py-1 bg-dark-700 text-xs rounded-lg border border-dark-600"
              >
                <option value="none">No Capture</option>
                <option value="screen">Screen Share</option>
                <option value="camera">Camera</option>
              </select>
            </div>

            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-green-400 animate-pulse' : isThinking ? 'bg-yellow-400 animate-pulse' : isSpeaking ? 'bg-blue-400 animate-pulse' : 'bg-gray-600'}`} />
              <span className="text-xs text-gray-400">
                {isListening ? 'Listening' : isThinking ? 'Thinking' : isSpeaking ? 'Speaking' : 'Ready'}
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-dark-700 text-gray-100'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs opacity-50 mt-1">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="p-4 border-t border-dark-600 bg-dark-900">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleVoiceCommand}
                className={`flex-1 py-3 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-5 h-5" />
                    <span>Stop Listening</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" />
                    <span>Start Voice Input</span>
                  </>
                )}
              </button>

              {visionEnabled && (
                <button
                  onClick={async () => {
                    const image = await captureScreen()
                    if (image) {
                      addMessage('assistant', '📸 Screenshot captured! I can see it now.')
                    }
                  }}
                  className="px-4 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                >
                  {captureMode === 'camera' ? <Camera className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
                </button>
              )}
            </div>

            <p className="text-xs text-center text-gray-500 mt-3">
              Powered by Gemini 2.0 • Vision • Audio • Autonomous Thinking
            </p>
          </div>
        </div>
      )}

      {/* Hidden video/canvas for capture */}
      <video ref={videoRef} className="hidden" />
      <canvas ref={canvasRef} className="hidden" />
    </>
  )
}
