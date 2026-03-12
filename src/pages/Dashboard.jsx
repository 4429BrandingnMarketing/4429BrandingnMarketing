import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  DollarSign,
  TrendingUp,
  Users,
  Music,
  Bot,
  Activity,
  Zap,
  Megaphone,
  ShoppingBag,
  Calendar,
  Target,
  Sparkles,
  ArrowRight,
  BarChart3
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock data
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
  const [greeting] = useState(() => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  })

  return (
    <div>
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          {greeting}, Jason
        </h1>
        <p className="text-gray-400">Welcome to your Red Vision Command Center. Here's your empire at a glance.</p>
      </div>

      {/* 4 Business Quadrants */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Quadrant 1: Red Vision Music (Record Label) */}
        <Link to="/music-business" className="group">
          <div className="card border-2 border-transparent hover:border-pink-500 transition-all cursor-pointer h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Red Vision Music</h3>
                  <p className="text-sm text-gray-400">AI Record Label</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors" />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Revenue</p>
                <p className="text-lg font-bold text-green-400">$15.2K</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Streams</p>
                <p className="text-lg font-bold">125K</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Deals</p>
                <p className="text-lg font-bold">12</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-green-400">
              <TrendingUp className="w-4 h-4 mr-1" />
              +42% this month
            </div>
          </div>
        </Link>

        {/* Quadrant 2: #4429 Lifestyle + Marketing & Branding */}
        <Link to="/lifestyle-branding" className="group">
          <div className="card border-2 border-transparent hover:border-blue-500 transition-all cursor-pointer h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Megaphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">#4429 Lifestyle</h3>
                  <p className="text-sm text-gray-400">Marketing & Branding</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Revenue</p>
                <p className="text-lg font-bold text-green-400">$8.9K</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Clients</p>
                <p className="text-lg font-bold">8</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Campaigns</p>
                <p className="text-lg font-bold">15</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-green-400">
              <TrendingUp className="w-4 h-4 mr-1" />
              +28% this month
            </div>
          </div>
        </Link>

        {/* Quadrant 3: GiFTD N' PrVLGD Co. (Merch Store) */}
        <Link to="/revenue-streams" className="group">
          <div className="card border-2 border-transparent hover:border-purple-500 transition-all cursor-pointer h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">GiFTD N' PrVLGD Co.</h3>
                  <p className="text-sm text-gray-400">Merch & Products</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Revenue</p>
                <p className="text-lg font-bold text-green-400">$12.3K</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Orders</p>
                <p className="text-lg font-bold">234</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Products</p>
                <p className="text-lg font-bold">47</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-green-400">
              <TrendingUp className="w-4 h-4 mr-1" />
              +31% this month
            </div>
          </div>
        </Link>

        {/* Quadrant 4: Jason Salvador (Personal Dashboard) */}
        <Link to="/personal" className="group">
          <div className="card border-2 border-transparent hover:border-green-500 transition-all cursor-pointer h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Jason Salvador</h3>
                  <p className="text-sm text-gray-400">Personal Dashboard</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Tasks</p>
                <p className="text-lg font-bold">12/18</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Meetings</p>
                <p className="text-lg font-bold">5</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Wellness</p>
                <p className="text-lg font-bold text-green-400">92%</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-blue-400">
              <Calendar className="w-4 h-4 mr-1" />
              3 events today
            </div>
          </div>
        </Link>
      </div>

      {/* Empire Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-green-400">$47.2K</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-400" />
          </div>
          <p className="text-sm text-green-400 mt-2 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            +34% this month
          </p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">AI Agents Active</p>
              <p className="text-3xl font-bold">6/6</p>
            </div>
            <Bot className="w-8 h-8 text-purple-400" />
          </div>
          <p className="text-sm text-gray-400 mt-2">247 tasks completed today</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Total Reach</p>
              <p className="text-3xl font-bold">142K</p>
            </div>
            <Users className="w-8 h-8 text-blue-400" />
          </div>
          <p className="text-sm text-green-400 mt-2 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            +18% this week
          </p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Active Projects</p>
              <p className="text-3xl font-bold">23</p>
            </div>
            <Activity className="w-8 h-8 text-pink-400" />
          </div>
          <p className="text-sm text-gray-400 mt-2">Across all businesses</p>
        </div>
      </div>

      {/* Revenue Chart & AI Agents */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 card">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-1">Empire Revenue Overview</h2>
            <p className="text-sm text-gray-400">Last 7 days across all businesses</p>
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

        <div className="card">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-1">AI Workforce</h2>
            <p className="text-sm text-gray-400">Active agents</p>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Content Creator', tasks: 12, status: 'active' },
              { name: 'Social Media', tasks: 24, status: 'active' },
              { name: 'Music Promoter', tasks: 8, status: 'active' },
              { name: 'Email Marketer', tasks: 15, status: 'active' },
              { name: 'SEO Optimizer', tasks: 18, status: 'active' },
              { name: 'Licensing Scout', tasks: 6, status: 'active' },
            ].map((agent, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm">{agent.name}</span>
                </div>
                <span className="text-xs text-gray-400">{agent.tasks} tasks</span>
              </div>
            ))}
          </div>
          <Link to="/ai-agents">
            <button className="btn-primary w-full mt-6">Manage AI Agents</button>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">Recent Activity</h2>
            <p className="text-sm text-gray-400">Across all businesses</p>
          </div>
          <Link to="/analytics">
            <button className="btn-secondary flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>View All</span>
            </button>
          </Link>
        </div>
        <div className="space-y-3">
          {[
            { icon: Music, message: 'New licensing deal closed: $2,500', time: '5 min ago', color: 'pink' },
            { icon: Megaphone, message: 'Client campaign launched for 3 brands', time: '32 min ago', color: 'blue' },
            { icon: ShoppingBag, message: '45 new merch orders processed', time: '1 hour ago', color: 'purple' },
            { icon: Target, message: 'Completed 12 personal tasks', time: '2 hours ago', color: 'green' },
            { icon: Bot, message: 'AI agents completed 247 tasks today', time: '3 hours ago', color: 'purple' },
          ].map((activity, i) => {
            const Icon = activity.icon
            return (
              <div key={i} className="flex items-start space-x-3 p-3 bg-dark-700 rounded-lg">
                <div className={`w-10 h-10 bg-${activity.color}-500/20 rounded-full flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 text-${activity.color}-400`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
