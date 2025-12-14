import { useState } from 'react'
import {
  Music,
  DollarSign,
  TrendingUp,
  FileText,
  Calendar,
  Play,
  Download,
  Eye,
  Plus
} from 'lucide-react'

export default function MusicBusiness() {
  const [activeTab, setActiveTab] = useState('licensing')

  const [licensingDeals] = useState([
    { id: 1, project: 'Summer Vibes - TV Commercial', client: 'Nike', status: 'active', value: 2500, date: '2024-01-15' },
    { id: 2, project: 'Midnight Dreams - Film Soundtrack', client: 'Sony Pictures', status: 'negotiating', value: 5000, date: '2024-01-20' },
    { id: 3, project: 'Urban Flow - Video Game', client: 'EA Sports', status: 'completed', value: 3200, date: '2024-01-10' },
    { id: 4, project: 'Chill Waves - Streaming Platform', client: 'Netflix', status: 'pending', value: 4500, date: '2024-01-25' },
  ])

  const [releases] = useState([
    { id: 1, title: 'Summer Vibes EP', type: 'EP', releaseDate: '2024-02-01', status: 'scheduled', streams: 0 },
    { id: 2, title: 'Midnight Dreams', type: 'Single', releaseDate: '2024-01-15', status: 'live', streams: 125000 },
    { id: 3, title: 'Urban Flow Album', type: 'Album', releaseDate: '2024-03-15', status: 'in-production', streams: 0 },
  ])

  const [revenueStreams] = useState([
    { source: 'Licensing', amount: 15200, percentage: 42 },
    { source: 'Streaming', amount: 8900, percentage: 25 },
    { source: 'Sync Placements', amount: 6300, percentage: 18 },
    { source: 'Direct Sales', amount: 5400, percentage: 15 },
  ])

  const totalRevenue = revenueStreams.reduce((sum, stream) => sum + stream.amount, 0)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Music Business</h1>
        <p className="text-gray-400">Manage licensing, releases, and revenue</p>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Total Revenue</p>
            <DollarSign className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold">${totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-green-400 mt-2 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            +18% this month
          </p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Active Deals</p>
            <FileText className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold">
            {licensingDeals.filter(d => d.status === 'active' || d.status === 'negotiating').length}
          </p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Upcoming Releases</p>
            <Calendar className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold">
            {releases.filter(r => r.status === 'scheduled').length}
          </p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Total Streams</p>
            <Play className="w-5 h-5 text-pink-400" />
          </div>
          <p className="text-3xl font-bold">
            {Math.round(releases.reduce((sum, r) => sum + r.streams, 0) / 1000)}K
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-dark-600">
        {['licensing', 'releases', 'revenue'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-1 font-medium capitalize transition-colors ${
              activeTab === tab
                ? 'text-primary-400 border-b-2 border-primary-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Licensing Tab */}
      {activeTab === 'licensing' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Licensing Deals</h2>
            <button className="btn-primary flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>New Deal</span>
            </button>
          </div>
          <div className="space-y-4">
            {licensingDeals.map((deal) => (
              <div key={deal.id} className="card hover:border-primary-600 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold mb-1">{deal.project}</h3>
                    <p className="text-sm text-gray-400 mb-2">{deal.client}</p>
                    <div className="flex items-center space-x-4 text-xs">
                      <span className={`badge ${
                        deal.status === 'active' ? 'badge-success' :
                        deal.status === 'negotiating' ? 'badge-warning' :
                        deal.status === 'completed' ? 'badge-info' :
                        'badge-error'
                      }`}>
                        {deal.status}
                      </span>
                      <span className="text-gray-400">{deal.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-400">${deal.value}</p>
                    <button className="btn-secondary mt-2 text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Releases Tab */}
      {activeTab === 'releases' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Music Releases</h2>
            <button className="btn-primary flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Schedule Release</span>
            </button>
          </div>
          <div className="space-y-4">
            {releases.map((release) => (
              <div key={release.id} className="card hover:border-primary-600 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Music className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{release.title}</h3>
                      <div className="flex items-center space-x-3 text-sm text-gray-400">
                        <span>{release.type}</span>
                        <span>•</span>
                        <span>{release.releaseDate}</span>
                        <span className={`badge ${
                          release.status === 'live' ? 'badge-success' :
                          release.status === 'scheduled' ? 'badge-info' :
                          'badge-warning'
                        }`}>
                          {release.status}
                        </span>
                      </div>
                      {release.streams > 0 && (
                        <p className="text-sm text-green-400 mt-1">
                          {release.streams.toLocaleString()} streams
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="btn-secondary">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="btn-secondary">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Revenue Tab */}
      {activeTab === 'revenue' && (
        <div>
          <h2 className="text-xl font-bold mb-6">Revenue Breakdown</h2>
          <div className="card">
            <div className="space-y-6">
              {revenueStreams.map((stream, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{stream.source}</span>
                    <span className="text-xl font-bold">${stream.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-dark-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-pink-500 h-3 rounded-full transition-all"
                      style={{ width: `${stream.percentage}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{stream.percentage}% of total revenue</p>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-dark-600">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">Total Revenue</span>
                <span className="text-3xl font-bold text-green-400">${totalRevenue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
