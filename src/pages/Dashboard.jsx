import { useState, useEffect } from 'react'
import {
  DollarSign,
  TrendingUp,
  Users,
  Music,
  Bot,
  CheckCircle,
  AlertCircle,
  Activity,
  Zap
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock data - replace with real data from your backend
const revenueData = [
  { name: 'Mon', value: 2400 },
  { name: 'Tue', value: 1398 },
  { name: 'Wed', value: 9800 },
  { name: 'Thu', value: 3908 },
  { name: 'Fri', value: 4800 },
  { name: 'Sat', value: 3800 },
  { name: 'Sun', value: 4300 },
]

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 47284,
    revenueGrowth: 12.5,
    activeStreams: 8,
    activeAgents: 6,
    tasksCompleted: 247,
    musicStreams: 125000,
  })

  const [agents, setAgents] = useState([
    { id: 1, name: 'Content Creator', status: 'active', tasksToday: 12 },
    { id: 2, name: 'Social Media Manager', status: 'active', tasksToday: 24 },
    { id: 3, name: 'Music Promoter', status: 'active', tasksToday: 8 },
    { id: 4, name: 'Email Marketer', status: 'idle', tasksToday: 5 },
    { id: 5, name: 'SEO Optimizer', status: 'active', tasksToday: 15 },
    { id: 6, name: 'Licensing Scout', status: 'active', tasksToday: 6 },
  ])

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'revenue', message: 'New licensing deal closed: $2,500', time: '5 minutes ago' },
    { id: 2, type: 'content', message: 'Blog post published: "10 Music Marketing Tips"', time: '32 minutes ago' },
    { id: 3, type: 'social', message: '50 new Instagram followers gained', time: '1 hour ago' },
    { id: 4, type: 'music', message: 'Track "Summer Vibes" reached 10K streams', time: '2 hours ago' },
    { id: 5, type: 'agent', message: 'Email campaign sent to 5,000 subscribers', time: '3 hours ago' },
  ])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Command Center</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening with your empire.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-400 mt-1 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +{stats.revenueGrowth}% this month
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Active Revenue Streams</p>
              <p className="text-2xl font-bold">{stats.activeStreams}</p>
              <p className="text-sm text-gray-400 mt-1">Licensing, streaming, merch...</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">AI Agents Working</p>
              <p className="text-2xl font-bold">{stats.activeAgents}/6</p>
              <p className="text-sm text-gray-400 mt-1">{stats.tasksCompleted} tasks today</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Music Streams</p>
              <p className="text-2xl font-bold">{(stats.musicStreams / 1000).toFixed(0)}K</p>
              <p className="text-sm text-gray-400 mt-1">Across all platforms</p>
            </div>
            <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center">
              <Music className="w-6 h-6 text-pink-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 card">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-1">Revenue Overview</h2>
            <p className="text-sm text-gray-400">Last 7 days performance</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#d946ef" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#d946ef"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* AI Agents Status */}
        <div className="card">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-1">AI Agents</h2>
            <p className="text-sm text-gray-400">Real-time status</p>
          </div>
          <div className="space-y-4">
            {agents.map((agent) => (
              <div key={agent.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      agent.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-gray-600'
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium">{agent.name}</p>
                    <p className="text-xs text-gray-400">{agent.tasksToday} tasks today</p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    agent.status === 'active'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}
                >
                  {agent.status}
                </span>
              </div>
            ))}
          </div>
          <button className="btn-primary w-full mt-6">
            Manage Agents
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card mt-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-1">Recent Activity</h2>
          <p className="text-sm text-gray-400">What's been happening</p>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-4 bg-dark-700 rounded-lg">
              <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-primary-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm">{activity.message}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
