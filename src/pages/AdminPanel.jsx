import { useState } from 'react'
import {
  Settings,
  Users,
  Key,
  DollarSign,
  Activity,
  Shield,
  Database,
  Bell,
  Zap,
  BarChart3,
  Lock,
  Globe,
  Mail,
  Smartphone,
  CreditCard,
  FileText,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Server
} from 'lucide-react'

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('overview')

  const [systemStats] = useState({
    totalUsers: 1,
    activeAgents: 15,
    apiCalls: 24567,
    uptime: 99.9,
    storage: 2.4, // GB
    bandwidth: 12.8, // GB
    totalRevenue: 47284,
    activeSessions: 3
  })

  const [apiKeys] = useState([
    { id: 1, name: 'Gemini API', service: 'Google', status: 'active', usage: '45%', lastUsed: '2 min ago' },
    { id: 2, name: 'OpenAI API', service: 'OpenAI', status: 'active', usage: '32%', lastUsed: '5 min ago' },
    { id: 3, name: 'Stripe API', service: 'Stripe', status: 'active', usage: '12%', lastUsed: '1 hour ago' },
    { id: 4, name: 'Notion API', service: 'Notion', status: 'active', usage: '8%', lastUsed: '15 min ago' },
    { id: 5, name: 'Spotify API', service: 'Spotify', status: 'inactive', usage: '0%', lastUsed: 'Never' },
  ])

  const [integrations] = useState([
    { name: 'Notion', status: 'connected', health: 'good', lastSync: '2 min ago' },
    { name: 'Stripe', status: 'connected', health: 'good', lastSync: '5 min ago' },
    { name: 'Airtable', status: 'connected', health: 'good', lastSync: '10 min ago' },
    { name: 'Figma', status: 'connected', health: 'good', lastSync: '1 hour ago' },
    { name: 'Spotify', status: 'disconnected', health: 'unknown', lastSync: 'Never' },
    { name: 'Instagram', status: 'disconnected', health: 'unknown', lastSync: 'Never' },
  ])

  const [recentActivity] = useState([
    { action: 'Agent deployed', user: 'Jason Salvador', details: 'Licensing Scout Agent activated', time: '5 min ago', type: 'success' },
    { action: 'API key rotated', user: 'System', details: 'Gemini API key updated', time: '1 hour ago', type: 'info' },
    { action: 'New user invited', user: 'Jason Salvador', details: 'team@redvision.com', time: '2 hours ago', type: 'success' },
    { action: 'Integration connected', user: 'Jason Salvador', details: 'Stripe MCP server', time: '3 hours ago', type: 'success' },
    { action: 'System backup', user: 'System', details: 'Database backup completed', time: '6 hours ago', type: 'info' },
  ])

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Red Vision Creative Studio</h1>
            <p className="text-gray-400">Admin Control Panel - Master Configuration</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-green-400">All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">System Uptime</p>
            <Activity className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold">{systemStats.uptime}%</p>
          <p className="text-sm text-green-400 mt-2">30 days running</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Active Agents</p>
            <Zap className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold">{systemStats.activeAgents}</p>
          <p className="text-sm text-gray-400 mt-2">Running 24/7</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">API Calls Today</p>
            <Server className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold">{systemStats.apiCalls.toLocaleString()}</p>
          <p className="text-sm text-green-400 mt-2 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            +15% vs yesterday
          </p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Total Revenue</p>
            <DollarSign className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-green-400">${systemStats.totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-gray-400 mt-2">This month</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-dark-600 overflow-x-auto">
        {['overview', 'integrations', 'api-keys', 'users', 'settings'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-1 font-medium capitalize transition-colors whitespace-nowrap ${
              activeTab === tab
                ? 'text-primary-400 border-b-2 border-primary-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* System Health */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-bold mb-4">System Health</h3>
              <div className="space-y-4">
                {[
                  { metric: 'CPU Usage', value: 23, max: 100, status: 'good', unit: '%' },
                  { metric: 'Memory', value: 2.4, max: 8, status: 'good', unit: 'GB' },
                  { metric: 'Storage', value: systemStats.storage, max: 100, status: 'good', unit: 'GB' },
                  { metric: 'Bandwidth', value: systemStats.bandwidth, max: 100, status: 'good', unit: 'GB' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">{item.metric}</span>
                      <span className="text-sm font-bold">{item.value}{item.unit} / {item.max}{item.unit}</span>
                    </div>
                    <div className="w-full bg-dark-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.value / item.max < 0.5 ? 'bg-green-500' :
                          item.value / item.max < 0.8 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${(item.value / item.max) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold mb-4">Business Performance</h3>
              <div className="space-y-4">
                {[
                  { business: 'Red Vision Music', revenue: 15200, growth: 42, color: 'pink' },
                  { business: '#4429 Lifestyle', revenue: 8900, growth: 28, color: 'blue' },
                  { business: 'GiFTD N\' PrVLGD', revenue: 12300, growth: 31, color: 'purple' },
                  { business: 'Personal Services', revenue: 10884, growth: 18, color: 'green' },
                ].map((biz, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-dark-700 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium mb-1">{biz.business}</p>
                      <p className="text-sm text-green-400 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +{biz.growth}% this month
                      </p>
                    </div>
                    <p className="text-xl font-bold text-green-400">${biz.revenue.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
            <div className="space-y-2">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start space-x-3 p-3 bg-dark-700 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'success' ? 'bg-green-500/20' :
                    activity.type === 'warning' ? 'bg-yellow-500/20' :
                    activity.type === 'error' ? 'bg-red-500/20' :
                    'bg-blue-500/20'
                  }`}>
                    {activity.type === 'success' ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : activity.type === 'error' ? (
                      <AlertCircle className="w-4 h-4 text-red-400" />
                    ) : (
                      <Activity className="w-4 h-4 text-blue-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{activity.details}</p>
                    <p className="text-xs text-gray-500 mt-1">by {activity.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Connected Services</h3>
              <button className="btn-primary">Add Integration</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {integrations.map((integration, i) => (
                <div key={i} className="bg-dark-700 p-4 rounded-lg border border-dark-600">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold mb-1">{integration.name}</h4>
                      <p className="text-xs text-gray-400">Last sync: {integration.lastSync}</p>
                    </div>
                    <span className={`badge ${
                      integration.status === 'connected' ? 'badge-success' : 'badge-error'
                    }`}>
                      {integration.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Health:</span>
                    <span className={`text-xs ${
                      integration.health === 'good' ? 'text-green-400' :
                      integration.health === 'warning' ? 'text-yellow-400' :
                      'text-gray-400'
                    }`}>
                      {integration.health}
                    </span>
                  </div>
                  {integration.status === 'disconnected' && (
                    <button className="btn-primary w-full mt-3 text-sm">Connect</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* API Keys Tab */}
      {activeTab === 'api-keys' && (
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">API Keys & Credentials</h3>
              <button className="btn-primary">Add API Key</button>
            </div>
            <div className="space-y-3">
              {apiKeys.map((key) => (
                <div key={key.id} className="flex items-center justify-between p-4 bg-dark-700 rounded-lg border border-dark-600">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      key.status === 'active' ? 'bg-green-500/20' : 'bg-gray-500/20'
                    }`}>
                      <Key className={`w-5 h-5 ${
                        key.status === 'active' ? 'text-green-400' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-bold">{key.name}</h4>
                        <span className={`badge ${
                          key.status === 'active' ? 'badge-success' : 'badge-error'
                        }`}>
                          {key.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>{key.service}</span>
                        <span>•</span>
                        <span>Usage: {key.usage}</span>
                        <span>•</span>
                        <span>Last used: {key.lastUsed}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="btn-secondary">Rotate</button>
                    <button className="btn-secondary text-red-400">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Settings */}
          <div className="card">
            <h3 className="text-lg font-bold mb-4">Security Settings</h3>
            <div className="space-y-4">
              {[
                { setting: 'Two-Factor Authentication', enabled: true, description: 'Require 2FA for all users' },
                { setting: 'API Key Rotation', enabled: true, description: 'Auto-rotate keys every 90 days' },
                { setting: 'IP Whitelist', enabled: false, description: 'Restrict access to specific IPs' },
                { setting: 'Audit Logging', enabled: true, description: 'Log all admin actions' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-dark-700 rounded-lg">
                  <div>
                    <p className="font-medium">{item.setting}</p>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    item.enabled ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {item.enabled ? 'Enabled' : 'Disabled'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">User Management</h3>
            <button className="btn-primary">Invite User</button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-dark-700 rounded-lg border border-dark-600">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">JS</span>
                </div>
                <div>
                  <p className="font-bold">Jason Salvador</p>
                  <p className="text-sm text-gray-400">jason@redvisionmusic.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="badge badge-success">Owner</span>
                <span className="text-sm text-gray-400">Last active: Now</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          {/* General Settings */}
          <div className="card">
            <h3 className="text-lg font-bold mb-4">General Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Studio Name</label>
                <input
                  type="text"
                  defaultValue="Red Vision Creative Studio"
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Domain</label>
                <input
                  type="text"
                  defaultValue="redvisioncreativestudio.com"
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Contact Email</label>
                <input
                  type="email"
                  defaultValue="jason@redvisionmusic.com"
                  className="input w-full"
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="card">
            <h3 className="text-lg font-bold mb-4">Notification Preferences</h3>
            <div className="space-y-3">
              {[
                { name: 'Agent Failures', enabled: true },
                { name: 'API Rate Limits', enabled: true },
                { name: 'New Revenue', enabled: true },
                { name: 'System Updates', enabled: false },
                { name: 'Weekly Reports', enabled: true },
              ].map((pref, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-dark-700 rounded-lg">
                  <span>{pref.name}</span>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    pref.enabled ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {pref.enabled ? 'On' : 'Off'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Billing */}
          <div className="card">
            <h3 className="text-lg font-bold mb-4">Billing & Usage</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="p-4 bg-dark-700 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Current Plan</p>
                <p className="text-2xl font-bold">Professional</p>
              </div>
              <div className="p-4 bg-dark-700 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Monthly Cost</p>
                <p className="text-2xl font-bold text-green-400">$250</p>
              </div>
              <div className="p-4 bg-dark-700 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Next Billing</p>
                <p className="text-2xl font-bold">Feb 1</p>
              </div>
            </div>
            <button className="btn-secondary">Manage Billing</button>
          </div>
        </div>
      )}
    </div>
  )
}
