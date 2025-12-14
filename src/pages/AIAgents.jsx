import { useState } from 'react'
import {
  Bot,
  Play,
  Pause,
  Settings,
  TrendingUp,
  CheckCircle,
  Clock,
  Zap,
  Plus
} from 'lucide-react'

export default function AIAgents() {
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: 'Content Creator',
      description: 'Writes blog posts, social media content, and newsletters',
      status: 'active',
      tasksCompleted: 247,
      tasksToday: 12,
      efficiency: 94,
      lastActive: '2 minutes ago'
    },
    {
      id: 2,
      name: 'Social Media Manager',
      description: 'Posts, engages, and responds across all social platforms',
      status: 'active',
      tasksCompleted: 532,
      tasksToday: 24,
      efficiency: 89,
      lastActive: '1 minute ago'
    },
    {
      id: 3,
      name: 'Music Promoter',
      description: 'Pitches to playlists, blogs, and influencers',
      status: 'active',
      tasksCompleted: 128,
      tasksToday: 8,
      efficiency: 91,
      lastActive: '15 minutes ago'
    },
    {
      id: 4,
      name: 'Email Marketer',
      description: 'Manages drip campaigns and newsletter automation',
      status: 'idle',
      tasksCompleted: 89,
      tasksToday: 5,
      efficiency: 87,
      lastActive: '1 hour ago'
    },
    {
      id: 5,
      name: 'SEO Optimizer',
      description: 'Optimizes content for search engines and tracks rankings',
      status: 'active',
      tasksCompleted: 156,
      tasksToday: 15,
      efficiency: 92,
      lastActive: '5 minutes ago'
    },
    {
      id: 6,
      name: 'Licensing Scout',
      description: 'Finds and pitches music licensing opportunities',
      status: 'active',
      tasksCompleted: 67,
      tasksToday: 6,
      efficiency: 96,
      lastActive: '30 minutes ago'
    },
  ])

  const toggleAgentStatus = (agentId) => {
    setAgents(agents.map(agent =>
      agent.id === agentId
        ? { ...agent, status: agent.status === 'active' ? 'idle' : 'active' }
        : agent
    ))
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">AI Agent Hub</h1>
          <p className="text-gray-400">Deploy and manage your autonomous workforce</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Deploy New Agent</span>
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <p className="text-sm text-gray-400 mb-1">Active Agents</p>
          <p className="text-3xl font-bold">
            {agents.filter(a => a.status === 'active').length}/{agents.length}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-400 mb-1">Tasks Today</p>
          <p className="text-3xl font-bold">
            {agents.reduce((sum, a) => sum + a.tasksToday, 0)}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-400 mb-1">Total Completed</p>
          <p className="text-3xl font-bold">
            {agents.reduce((sum, a) => sum + a.tasksCompleted, 0)}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-400 mb-1">Avg Efficiency</p>
          <p className="text-3xl font-bold">
            {Math.round(agents.reduce((sum, a) => sum + a.efficiency, 0) / agents.length)}%
          </p>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  agent.status === 'active' ? 'bg-primary-500/20' : 'bg-gray-500/20'
                }`}>
                  <Bot className={`w-6 h-6 ${
                    agent.status === 'active' ? 'text-primary-400' : 'text-gray-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">{agent.name}</h3>
                  <p className="text-sm text-gray-400">{agent.description}</p>
                </div>
              </div>
              <span className={`badge ${
                agent.status === 'active' ? 'badge-success' : 'badge-warning'
              }`}>
                {agent.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Tasks Today</p>
                <p className="text-2xl font-bold">{agent.tasksToday}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Total Completed</p>
                <p className="text-2xl font-bold">{agent.tasksCompleted}</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-400">Efficiency</p>
                <p className="text-sm font-medium">{agent.efficiency}%</p>
              </div>
              <div className="w-full bg-dark-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary-500 to-pink-500 h-2 rounded-full transition-all"
                  style={{ width: `${agent.efficiency}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                Last active: {agent.lastActive}
              </span>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => toggleAgentStatus(agent.id)}
                className={`btn flex-1 flex items-center justify-center space-x-2 ${
                  agent.status === 'active' ? 'btn-secondary' : 'btn-primary'
                }`}
              >
                {agent.status === 'active' ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Activate</span>
                  </>
                )}
              </button>
              <button className="btn-secondary flex items-center justify-center">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card mt-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="btn-secondary flex items-center justify-center space-x-2 py-4">
            <Zap className="w-5 h-5" />
            <span>Activate All Agents</span>
          </button>
          <button className="btn-secondary flex items-center justify-center space-x-2 py-4">
            <TrendingUp className="w-5 h-5" />
            <span>View Performance Report</span>
          </button>
          <button className="btn-secondary flex items-center justify-center space-x-2 py-4">
            <Settings className="w-5 h-5" />
            <span>Configure Workflows</span>
          </button>
        </div>
      </div>
    </div>
  )
}
