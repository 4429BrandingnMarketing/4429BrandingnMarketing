import { useState } from 'react'
import {
  Megaphone,
  Mail,
  Share2,
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  Plus,
  Calendar,
  Target
} from 'lucide-react'

export default function Marketing() {
  const [activeTab, setActiveTab] = useState('campaigns')

  const [campaigns] = useState([
    { id: 1, name: 'Summer EP Launch', type: 'Email + Social', status: 'active', reach: 15000, conversions: 234, budget: 500 },
    { id: 2, name: 'Music Licensing Funnel', type: 'Funnel', status: 'active', reach: 8200, conversions: 89, budget: 300 },
    { id: 3, name: 'Playlist Placement Drive', type: 'Social', status: 'scheduled', reach: 0, conversions: 0, budget: 200 },
    { id: 4, name: 'Newsletter Subscriber Growth', type: 'Email', status: 'active', reach: 25000, conversions: 450, budget: 150 },
  ])

  const [socialAccounts] = useState([
    { platform: 'Instagram', followers: 12500, growth: '+450', posts: 45, engagement: '4.2%' },
    { platform: 'TikTok', followers: 8200, growth: '+1200', posts: 32, engagement: '7.8%' },
    { platform: 'Twitter', followers: 5600, growth: '+120', posts: 120, engagement: '2.1%' },
    { platform: 'YouTube', followers: 3400, growth: '+80', posts: 12, engagement: '5.6%' },
  ])

  const [contentCalendar] = useState([
    { id: 1, title: '10 Music Marketing Tips Blog Post', platform: 'Blog', date: '2024-01-20', status: 'scheduled' },
    { id: 2, title: 'Behind the Scenes Studio Session', platform: 'Instagram', date: '2024-01-18', status: 'published' },
    { id: 3, title: 'New Track Teaser', platform: 'TikTok', date: '2024-01-22', status: 'draft' },
    { id: 4, title: 'Weekly Newsletter - Industry Insights', platform: 'Email', date: '2024-01-19', status: 'scheduled' },
  ])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Marketing & Branding</h1>
        <p className="text-gray-400">Build your brand and grow your audience</p>
      </div>

      {/* Marketing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Total Reach</p>
            <Eye className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold">48.2K</p>
          <p className="text-sm text-green-400 mt-2">+22% this week</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Total Followers</p>
            <Users className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold">29.7K</p>
          <p className="text-sm text-green-400 mt-2">+1.8K this month</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Conversions</p>
            <MousePointer className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold">773</p>
          <p className="text-sm text-green-400 mt-2">+15% this week</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Marketing Spend</p>
            <Target className="w-5 h-5 text-pink-400" />
          </div>
          <p className="text-3xl font-bold">$1,150</p>
          <p className="text-sm text-gray-400 mt-2">This month</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-dark-600">
        {['campaigns', 'social', 'content'].map((tab) => (
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

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Marketing Campaigns</h2>
            <button className="btn-primary flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>New Campaign</span>
            </button>
          </div>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="card hover:border-primary-600 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold mb-1">{campaign.name}</h3>
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                      <span>{campaign.type}</span>
                      <span className={`badge ${
                        campaign.status === 'active' ? 'badge-success' :
                        campaign.status === 'scheduled' ? 'badge-info' :
                        'badge-warning'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Budget</p>
                    <p className="text-xl font-bold">${campaign.budget}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Reach</p>
                    <p className="text-lg font-bold">{campaign.reach.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Conversions</p>
                    <p className="text-lg font-bold text-green-400">{campaign.conversions}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Social Tab */}
      {activeTab === 'social' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Social Media Management</h2>
            <button className="btn-primary flex items-center space-x-2">
              <Share2 className="w-5 h-5" />
              <span>Schedule Post</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {socialAccounts.map((account, index) => (
              <div key={index} className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">{account.platform}</h3>
                  <span className="badge badge-success">{account.growth}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Followers</p>
                    <p className="text-2xl font-bold">{account.followers.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Posts</p>
                    <p className="text-2xl font-bold">{account.posts}</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-400">Engagement Rate</p>
                    <p className="text-sm font-medium">{account.engagement}</p>
                  </div>
                  <div className="w-full bg-dark-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-pink-500 h-2 rounded-full"
                      style={{ width: account.engagement }}
                    />
                  </div>
                </div>
                <button className="btn-secondary w-full mt-4">
                  View Analytics
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content Tab */}
      {activeTab === 'content' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Content Calendar</h2>
            <button className="btn-primary flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Plan Content</span>
            </button>
          </div>
          <div className="space-y-4">
            {contentCalendar.map((content) => (
              <div key={content.id} className="card hover:border-primary-600 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold mb-1">{content.title}</h3>
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                      <span>{content.platform}</span>
                      <span>•</span>
                      <span>{content.date}</span>
                      <span className={`badge ${
                        content.status === 'published' ? 'badge-success' :
                        content.status === 'scheduled' ? 'badge-info' :
                        'badge-warning'
                      }`}>
                        {content.status}
                      </span>
                    </div>
                  </div>
                  <button className="btn-secondary">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
