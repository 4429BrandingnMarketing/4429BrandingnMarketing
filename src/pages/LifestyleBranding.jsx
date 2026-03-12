import { useState } from 'react'
import {
  Megaphone,
  Users,
  TrendingUp,
  Briefcase,
  Target,
  Calendar,
  DollarSign,
  Eye,
  MousePointer,
  Plus,
  Check,
  Clock,
  Star
} from 'lucide-react'

export default function LifestyleBranding() {
  const [activeTab, setActiveTab] = useState('clients')

  const [clients] = useState([
    { id: 1, name: 'Urban Beats Studio', industry: 'Music Production', status: 'active', monthlyRetainer: 2500, projects: 4 },
    { id: 2, name: 'Wellness Warriors', industry: 'Health & Fitness', status: 'active', monthlyRetainer: 1800, projects: 3 },
    { id: 3, name: 'Street Style Apparel', industry: 'Fashion', status: 'active', monthlyRetainer: 3200, projects: 5 },
    { id: 4, name: 'Podcast Pro Network', industry: 'Media', status: 'onboarding', monthlyRetainer: 2100, projects: 2 },
    { id: 5, name: 'Digital Nomad Co.', industry: 'Tech/Lifestyle', status: 'active', monthlyRetainer: 2800, projects: 6 },
  ])

  const [campaigns] = useState([
    { id: 1, client: 'Urban Beats Studio', name: 'Q1 Brand Refresh', status: 'in-progress', progress: 75, budget: 5000, reach: 45000 },
    { id: 2, client: 'Wellness Warriors', name: 'Product Launch Campaign', status: 'in-progress', progress: 60, budget: 3500, reach: 28000 },
    { id: 3, client: 'Street Style Apparel', name: 'Influencer Partnership', status: 'completed', progress: 100, budget: 6200, reach: 125000 },
    { id: 4, client: 'Podcast Pro Network', name: 'Audience Growth Strategy', status: 'planning', progress: 25, budget: 4000, reach: 0 },
  ])

  const [services] = useState([
    { name: 'Brand Strategy', clients: 8, revenue: 12000 },
    { name: 'Social Media Management', clients: 12, revenue: 18500 },
    { name: 'Content Creation', clients: 10, revenue: 15800 },
    { name: 'Influencer Marketing', clients: 6, revenue: 9200 },
    { name: 'Campaign Management', clients: 9, revenue: 14500 },
  ])

  const totalRevenue = clients.reduce((sum, client) => sum + client.monthlyRetainer, 0)
  const activeClients = clients.filter(c => c.status === 'active').length

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <Megaphone className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold">#4429 Lifestyle + Marketing & Branding</h1>
        </div>
        <p className="text-gray-400">Full-service branding and marketing agency</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Monthly Revenue</p>
            <DollarSign className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-green-400">${totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-green-400 mt-2 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            +28% this month
          </p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Active Clients</p>
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold">{activeClients}</p>
          <p className="text-sm text-gray-400 mt-2">{clients.length} total clients</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Active Campaigns</p>
            <Target className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold">{campaigns.filter(c => c.status !== 'completed').length}</p>
          <p className="text-sm text-gray-400 mt-2">{campaigns.length} total campaigns</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Total Reach</p>
            <Eye className="w-5 h-5 text-pink-400" />
          </div>
          <p className="text-3xl font-bold">198K</p>
          <p className="text-sm text-green-400 mt-2 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            +42% this month
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-dark-600">
        {['clients', 'campaigns', 'services'].map((tab) => (
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

      {/* Clients Tab */}
      {activeTab === 'clients' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Client Portfolio</h2>
            <button className="btn-primary flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>New Client</span>
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {clients.map((client) => (
              <div key={client.id} className="card hover:border-blue-500 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold mb-1">{client.name}</h3>
                    <p className="text-sm text-gray-400">{client.industry}</p>
                  </div>
                  <span className={`badge ${
                    client.status === 'active' ? 'badge-success' : 'badge-warning'
                  }`}>
                    {client.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Monthly Retainer</p>
                    <p className="text-xl font-bold text-green-400">${client.monthlyRetainer}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Active Projects</p>
                    <p className="text-xl font-bold">{client.projects}</p>
                  </div>
                </div>
                <button className="btn-secondary w-full">View Details</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Active Campaigns</h2>
            <button className="btn-primary flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>New Campaign</span>
            </button>
          </div>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="card hover:border-blue-500 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{campaign.name}</h3>
                    <p className="text-sm text-gray-400 mb-3">{campaign.client}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className={`badge ${
                        campaign.status === 'completed' ? 'badge-success' :
                        campaign.status === 'in-progress' ? 'badge-info' :
                        'badge-warning'
                      }`}>
                        {campaign.status}
                      </span>
                      <span className="text-gray-400">Budget: ${campaign.budget}</span>
                      {campaign.reach > 0 && (
                        <span className="text-gray-400">Reach: {campaign.reach.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-400">Progress</p>
                    <p className="text-sm font-medium">{campaign.progress}%</p>
                  </div>
                  <div className="w-full bg-dark-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all"
                      style={{ width: `${campaign.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Services Tab */}
      {activeTab === 'services' && (
        <div>
          <h2 className="text-xl font-bold mb-6">Service Offerings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <div key={i} className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{service.name}</h3>
                    <p className="text-sm text-gray-400">{service.clients} clients</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-green-400">${service.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
