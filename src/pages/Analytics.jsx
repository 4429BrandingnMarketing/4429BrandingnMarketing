import { useState } from 'react'
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  DollarSign,
  Music,
  Calendar,
  Download
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const revenueData = [
  { month: 'Jul', licensing: 12000, streaming: 6500, merch: 4200, digital: 3800 },
  { month: 'Aug', licensing: 13500, streaming: 7200, merch: 5100, digital: 4200 },
  { month: 'Sep', licensing: 11800, streaming: 7800, merch: 6300, digital: 4600 },
  { month: 'Oct', licensing: 14200, streaming: 8100, merch: 7200, digital: 4800 },
  { month: 'Nov', licensing: 13900, streaming: 8600, merch: 7800, digital: 5100 },
  { month: 'Dec', licensing: 15200, streaming: 8900, merch: 8200, digital: 5400 },
]

const trafficData = [
  { source: 'Social Media', value: 42, color: '#d946ef' },
  { source: 'Organic Search', value: 28, color: '#06b6d4' },
  { source: 'Email', value: 18, color: '#10b981' },
  { source: 'Direct', value: 12, color: '#f59e0b' },
]

const engagementData = [
  { day: 'Mon', engagement: 3200 },
  { day: 'Tue', engagement: 2800 },
  { day: 'Wed', engagement: 4100 },
  { day: 'Thu', engagement: 3600 },
  { day: 'Fri', engagement: 4800 },
  { day: 'Sat', engagement: 5200 },
  { day: 'Sun', engagement: 4600 },
]

export default function Analytics() {
  const [dateRange, setDateRange] = useState('last-30-days')

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">Track performance across all platforms</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input"
          >
            <option value="last-7-days">Last 7 Days</option>
            <option value="last-30-days">Last 30 Days</option>
            <option value="last-90-days">Last 90 Days</option>
            <option value="last-year">Last Year</option>
          </select>
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Total Revenue</p>
            <DollarSign className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold">$47,284</p>
          <p className="text-sm text-green-400 mt-2 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            +23% vs last month
          </p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Total Reach</p>
            <Eye className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold">142.5K</p>
          <p className="text-sm text-green-400 mt-2 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            +34% vs last month
          </p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">New Followers</p>
            <Users className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold">2,847</p>
          <p className="text-sm text-green-400 mt-2 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            +18% vs last month
          </p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Music Streams</p>
            <Music className="w-5 h-5 text-pink-400" />
          </div>
          <p className="text-3xl font-bold">125K</p>
          <p className="text-sm text-green-400 mt-2 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            +41% vs last month
          </p>
        </div>
      </div>

      {/* Revenue Trends */}
      <div className="card mb-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-1">Revenue by Source</h2>
          <p className="text-sm text-gray-400">6-month trend comparison</p>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="licensing" stroke="#10b981" strokeWidth={2} name="Licensing" />
            <Line type="monotone" dataKey="streaming" stroke="#3b82f6" strokeWidth={2} name="Streaming" />
            <Line type="monotone" dataKey="merch" stroke="#d946ef" strokeWidth={2} name="Merch" />
            <Line type="monotone" dataKey="digital" stroke="#f59e0b" strokeWidth={2} name="Digital Products" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Traffic Sources */}
        <div className="card">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-1">Traffic Sources</h2>
            <p className="text-sm text-gray-400">Where your audience comes from</p>
          </div>
          <div className="flex items-center justify-center mb-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #2a2a2a',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {trafficData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.source}</span>
                </div>
                <span className="font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Trends */}
        <div className="card">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-1">Weekly Engagement</h2>
            <p className="text-sm text-gray-400">Social media activity</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="engagement" fill="#d946ef" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="card">
        <h2 className="text-xl font-bold mb-6">Performance Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h3 className="font-bold text-green-400">Top Performer</h3>
            </div>
            <p className="text-sm text-gray-300">
              Music Licensing is your highest revenue stream at $15.2K this month (+42%)
            </p>
          </div>
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Users className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-blue-400">Growing Audience</h3>
            </div>
            <p className="text-sm text-gray-300">
              TikTok followers grew by 1,200 this month - your fastest growing platform
            </p>
          </div>
          <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Music className="w-5 h-5 text-purple-400" />
              <h3 className="font-bold text-purple-400">Trending Content</h3>
            </div>
            <p className="text-sm text-gray-300">
              "Midnight Dreams" reached 125K streams - your most successful release yet
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
