import { useState } from 'react'
import {
  MessageSquare,
  X,
  Send,
  Mic,
  MicOff,
  Sparkles,
  Bot,
  Minimize2,
  Maximize2
} from 'lucide-react'

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hi Jason! I\'m your AI assistant powered by Gemini 2.5. I can help you with coding, research, strategy, and managing your entire empire. How can I help you today?',
      timestamp: new Date()
    }
  ])

  const sendMessage = (e) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages([...messages, newMessage])
    setMessage('')

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'assistant',
        content: 'I\'m ready to help! In the full version, I\'ll be connected to Gemini 2.5 with vision, browser use, and computer use capabilities. I can help you build web apps, research opportunities, analyze data, and automate your business operations.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  const toggleVoice = () => {
    setIsListening(!isListening)
    // Voice recognition will be implemented with browser's Web Speech API
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-primary-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform group"
      >
        <Sparkles className="w-7 h-7 text-white group-hover:rotate-180 transition-transform duration-500" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-dark-900 animate-pulse" />
      </button>
    )
  }

  return (
    <div
      className={`fixed z-50 ${
        isExpanded
          ? 'inset-0 m-4'
          : 'bottom-6 right-6 w-96 h-[600px]'
      } transition-all duration-300`}
    >
      <div className="card h-full flex flex-col border-2 border-primary-500 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-dark-600">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-pink-500 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold">AI Assistant</h3>
              <p className="text-xs text-green-400 flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                Online
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
            >
              {isExpanded ? (
                <Minimize2 className="w-5 h-5" />
              ) : (
                <Maximize2 className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Capabilities */}
        <div className="p-3 bg-gradient-to-r from-primary-500/10 to-pink-500/10 border-b border-dark-600">
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 bg-primary-500/20 text-primary-400 rounded">
              Gemini 2.5
            </span>
            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
              Vision
            </span>
            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">
              Browser Use
            </span>
            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded">
              Computer Use
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.type === 'user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-700'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className="text-xs opacity-50 mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} className="p-4 border-t border-dark-600">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={toggleVoice}
              className={`p-2 rounded-lg transition-colors ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-dark-700 hover:bg-dark-600'
              }`}
            >
              {isListening ? (
                <MicOff className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 input text-sm"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="btn-primary p-2 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Powered by Gemini 2.5 Pro with Vision & Computer Use
          </p>
        </form>
      </div>
    </div>
  )
}
