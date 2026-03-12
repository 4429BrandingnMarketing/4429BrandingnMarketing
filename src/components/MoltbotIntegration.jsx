import React, { useState, useEffect } from 'react'
import { Terminal, Zap, MessageSquare, Settings, CheckCircle, XCircle, AlertCircle, Send, Smartphone, Github, ExternalLink, Play, Pause } from 'lucide-react'

export default function MoltbotIntegration() {
  const [isConnected, setIsConnected] = useState(false)
  const [status, setStatus] = useState('disconnected')
  const [command, setCommand] = useState('')
  const [commandHistory, setCommandHistory] = useState([
    { id: 1, command: '/status', response: 'Moltbot ready', timestamp: '2 min ago', success: true },
    { id: 2, command: '/list-files src/', response: 'Found 15 files', timestamp: '5 min ago', success: true },
    { id: 3, command: '/run-tests', response: 'All tests passed ✓', timestamp: '10 min ago', success: true }
  ])
  const [apiKey, setApiKey] = useState('')
  const [showSettings, setShowSettings] = useState(false)

  const handleSendCommand = (e) => {
    e.preventDefault()
    if (!command.trim()) return

    const newCommand = {
      id: Date.now(),
      command: command,
      response: isConnected ? 'Processing...' : 'Not connected. Configure Moltbot first.',
      timestamp: 'Just now',
      success: isConnected
    }

    setCommandHistory([newCommand, ...commandHistory])
    setCommand('')

    // Simulate response if connected
    if (isConnected) {
      setTimeout(() => {
        setCommandHistory(prev =>
          prev.map(cmd =>
            cmd.id === newCommand.id
              ? { ...cmd, response: 'Command executed successfully', timestamp: 'Just now' }
              : cmd
          )
        )
      }, 1500)
    }
  }

  const handleConnect = () => {
    if (apiKey) {
      setIsConnected(true)
      setStatus('connected')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl">
              🦞
            </div>
            Moltbot Integration
          </h2>
          <p className="text-gray-400">
            Personal AI assistant that controls your computer via messaging apps
          </p>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
        >
          <Settings className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Status Card */}
      <div className="p-6 bg-gradient-to-br from-orange-900/20 to-pink-900/20 rounded-2xl border border-orange-500/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${
              isConnected ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}>
              {isConnected ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400" />
              )}
            </div>
            <div>
              <div className="text-white font-semibold">
                Status: {isConnected ? 'Connected' : 'Not Connected'}
              </div>
              <div className="text-sm text-gray-400">
                {isConnected ? 'Moltbot daemon running' : 'Configure Moltbot to get started'}
              </div>
            </div>
          </div>
          {!isConnected && (
            <button
              onClick={() => setShowSettings(true)}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-semibold"
            >
              Setup Moltbot
            </button>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/10">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{commandHistory.length}</div>
            <div className="text-sm text-gray-400">Commands Sent</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              {commandHistory.filter(c => c.success).length}
            </div>
            <div className="text-sm text-gray-400">Successful</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-sm text-gray-400">Always Running</div>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Moltbot Configuration
          </h3>

          <div className="space-y-4">
            {/* API Key */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Anthropic API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-ant-..."
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                Get your API key from <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">console.anthropic.com</a>
              </p>
            </div>

            {/* Messaging Platform */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Messaging Platform
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['WhatsApp', 'Telegram', 'Terminal'].map((platform) => (
                  <button
                    key={platform}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            {/* Connect Button */}
            <button
              onClick={handleConnect}
              disabled={!apiKey}
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              {isConnected ? 'Reconnect' : 'Connect Moltbot'}
            </button>
          </div>

          {/* Setup Instructions */}
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div className="text-sm text-gray-300">
                <strong className="text-white">Node 24+ Required:</strong> Moltbot requires Node.js v24 or higher.
                Currently running Node v22. See setup guide below for upgrade instructions.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Command Terminal */}
      <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          Command Terminal
        </h3>

        {/* Command Input */}
        <form onSubmit={handleSendCommand} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder={isConnected ? "Type a command... (e.g., /status, /list-files, /run-tests)" : "Connect Moltbot first..."}
              disabled={!isConnected}
              className="flex-1 px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!isConnected || !command.trim()}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold"
            >
              <Send className="w-5 h-5" />
              Send
            </button>
          </div>
        </form>

        {/* Command History */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {commandHistory.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-black/30 rounded-lg border border-white/10"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-orange-400" />
                  <code className="text-sm text-orange-300">{item.command}</code>
                </div>
                <span className="text-xs text-gray-500">{item.timestamp}</span>
              </div>
              <div className="pl-6">
                <div className={`text-sm ${item.success ? 'text-green-400' : 'text-red-400'}`}>
                  {item.response}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
          <div className="p-3 bg-orange-500/20 rounded-xl w-fit mb-4">
            <MessageSquare className="w-6 h-6 text-orange-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Control via Messaging
          </h3>
          <p className="text-gray-400 text-sm">
            Send commands through WhatsApp, Telegram, or terminal to control your computer
          </p>
        </div>

        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
          <div className="p-3 bg-pink-500/20 rounded-xl w-fit mb-4">
            <Zap className="w-6 h-6 text-pink-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Powered by Claude
          </h3>
          <p className="text-gray-400 text-sm">
            Uses Anthropic's Claude AI for intelligent command processing and automation
          </p>
        </div>

        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
          <div className="p-3 bg-purple-500/20 rounded-xl w-fit mb-4">
            <Smartphone className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Always Running
          </h3>
          <p className="text-gray-400 text-sm">
            Daemon runs 24/7 in the background, ready to execute commands anytime
          </p>
        </div>
      </div>

      {/* Setup Guide */}
      <div className="p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl border border-blue-500/30">
        <h3 className="text-xl font-bold text-white mb-4">
          🚀 Complete Setup Guide
        </h3>

        <div className="space-y-4 text-gray-300">
          <div>
            <h4 className="text-white font-semibold mb-2">Step 1: Upgrade to Node 24+</h4>
            <div className="p-3 bg-black/30 rounded-lg font-mono text-sm text-green-400">
              # Install Node 24 using nvm<br/>
              nvm install 24<br/>
              nvm use 24
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2">Step 2: Install Moltbot</h4>
            <div className="p-3 bg-black/30 rounded-lg font-mono text-sm text-green-400">
              npm install -g moltbot@latest
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2">Step 3: Run Onboarding</h4>
            <div className="p-3 bg-black/30 rounded-lg font-mono text-sm text-green-400">
              moltbot onboard --install-daemon
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2">Step 4: Configure API Key</h4>
            <p className="text-sm text-gray-400 mb-2">
              Get your Anthropic API key from{' '}
              <a
                href="https://console.anthropic.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:underline inline-flex items-center gap-1"
              >
                console.anthropic.com
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2">Step 5: Connect Messaging App</h4>
            <p className="text-sm text-gray-400">
              Follow the onboarding wizard to connect WhatsApp, Telegram, or use terminal mode
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <a
            href="https://github.com/moltbot/moltbot"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition flex items-center gap-2 text-sm font-semibold"
          >
            <Github className="w-4 h-4" />
            GitHub Repo
          </a>
          <a
            href="https://docs.molt.bot"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition flex items-center gap-2 text-sm font-semibold"
          >
            <ExternalLink className="w-4 h-4" />
            Documentation
          </a>
        </div>
      </div>

      {/* Use Cases */}
      <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">
          💡 Use Cases for Your Music Empire
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-black/30 rounded-lg">
            <div className="text-orange-400 font-semibold mb-2">📊 Track Analytics</div>
            <code className="text-sm text-gray-300">/analyze spotify-streams last-month</code>
          </div>

          <div className="p-4 bg-black/30 rounded-lg">
            <div className="text-pink-400 font-semibold mb-2">🎵 Manage Catalog</div>
            <code className="text-sm text-gray-300">/list-tracks released 2025</code>
          </div>

          <div className="p-4 bg-black/30 rounded-lg">
            <div className="text-purple-400 font-semibold mb-2">📱 Social Media</div>
            <code className="text-sm text-gray-300">/post-instagram "New track out now!"</code>
          </div>

          <div className="p-4 bg-black/30 rounded-lg">
            <div className="text-blue-400 font-semibold mb-2">💰 Revenue Reports</div>
            <code className="text-sm text-gray-300">/generate-report royalties Q1-2026</code>
          </div>
        </div>
      </div>
    </div>
  )
}
