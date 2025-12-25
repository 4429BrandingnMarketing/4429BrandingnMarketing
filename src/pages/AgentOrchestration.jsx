import { useState } from 'react'
import {
  Bot,
  Play,
  Pause,
  Settings,
  TrendingUp,
  Activity,
  DollarSign,
  Zap,
  CheckCircle,
  AlertCircle,
  Clock,
  Target,
  Plus,
  RefreshCw,
  BarChart3,
  Music,
  Megaphone,
  ShoppingBag,
  User
} from 'lucide-react'

export default function AgentOrchestration() {
  const [activeTab, setActiveTab] = useState('overview')

  const [agentCategories] = useState([
    {
      id: 'music',
      name: 'Music Industry',
      icon: Music,
      color: 'pink',
      agents: [
        { id: 'ar-discovery', name: 'A&R Discovery', status: 'active', tasks: 45, successRate: 94, cost: 12.30 },
        { id: 'licensing-scout', name: 'Licensing Scout', status: 'active', tasks: 23, successRate: 96, cost: 8.50 },
        { id: 'playlist-pitcher', name: 'Playlist Pitcher', status: 'active', tasks: 67, successRate: 89, cost: 15.20 },
        { id: 'royalty-tracker', name: 'Royalty Tracker', status: 'active', tasks: 142, successRate: 99, cost: 5.40 },
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing & Branding',
      icon: Megaphone,
      color: 'blue',
      agents: [
        { id: 'brand-strategy', name: 'Brand Strategy', status: 'active', tasks: 12, successRate: 92, cost: 18.90 },
        { id: 'campaign-optimizer', name: 'Campaign Optimizer', status: 'active', tasks: 34, successRate: 91, cost: 14.50 },
        { id: 'content-creator', name: 'Content Creator', status: 'active', tasks: 156, successRate: 88, cost: 22.30 },
        { id: 'influencer-outreach', name: 'Influencer Outreach', status: 'paused', tasks: 28, successRate: 85, cost: 9.80 },
      ]
    },
    {
      id: 'ecommerce',
      name: 'E-commerce',
      icon: ShoppingBag,
      color: 'purple',
      agents: [
        { id: 'product-design', name: 'Product Design', status: 'active', tasks: 18, successRate: 87, cost: 16.70 },
        { id: 'inventory-manager', name: 'Inventory Manager', status: 'active', tasks: 234, successRate: 97, cost: 6.20 },
        { id: 'customer-service', name: 'Customer Service', status: 'active', tasks: 89, successRate: 93, cost: 11.40 },
        { id: 'sales-optimizer', name: 'Sales Optimizer', status: 'active', tasks: 45, successRate: 90, cost: 13.50 },
      ]
    },
    {
      id: 'personal',
      name: 'Personal',
      icon: User,
      color: 'green',
      agents: [
        { id: 'exec-assistant', name: 'Executive Assistant', status: 'active', tasks: 78, successRate: 95, cost: 8.90 },
        { id: 'wellness-coach', name: 'Wellness Coach', status: 'active', tasks: 12, successRate: 88, cost: 3.20 },
        { id: 'meeting-prep', name: 'Meeting Prep', status: 'active', tasks: 23, successRate: 94, cost: 5.60 },
      ]
    },
  ])

  const [workflows] = useState([
    { id: 1, name: 'New Music Release', agents: 6, status: 'running', completedTasks: 24, totalTasks: 30, duration: '2 days' },
    { id: 2, name: 'Client Campaign Launch', agents: 4, status: 'running', completedTasks: 18, totalTasks: 25, duration: '5 days' },
    { id: 3, name: 'Product Drop', agents: 5, status: 'scheduled', completedTasks: 0, totalTasks: 20, duration: 'Not started' },
    { id: 4, name: 'Weekly Content Creation', agents: 3, status: 'completed', completedTasks: 15, totalTasks: 15, duration: '7 days' },
  ])

  const totalAgents = agentCategories.reduce((sum, cat) => sum + cat.agents.length, 0)
  const activeAgents = agentCategories.reduce((sum, cat) =>
    sum + cat.agents.filter(a => a.status === 'active').length, 0
  )
  const totalTasks = agentCategories.reduce((sum, cat) =>
    sum + cat.agents.reduce((s, a) => s + a.tasks, 0), 0
  )
  const totalCost = agentCategories.reduce((sum, cat) =>
    sum + cat.agents.reduce((s, a) => s + a.cost, 0), 0
  )
  const avgSuccessRate = Math.round(
    agentCategories.reduce((sum, cat) =>
      sum + cat.agents.reduce((s, a) => s + a.successRate, 0), 0
    ) / totalAgents
  )

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Agent Orchestration</h1>
        <p className="text-gray-400">Deploy, manage, and monitor your AI workforce</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Active Agents</p>
            <Bot className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold">{activeAgents}/{totalAgents}</p>
          <p className="text-sm text-green-400 mt-2">All systems operational</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Tasks Today</p>
            <Activity className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold">{totalTasks}</p>
          <p className="text-sm text-gray-400 mt-2">Completed automatically</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Success Rate</p>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold">{avgSuccessRate}%</p>
          <p className="text-sm text-green-400 mt-2 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            +3% this week
          </p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Cost Today</p>
            <DollarSign className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-3xl font-bold">${totalCost.toFixed(2)}</p>
          <p className="text-sm text-gray-400 mt-2">API costs</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Workflows Running</p>
            <Zap className="w-5 h-5 text-pink-400" />
          </div>
          <p className="text-3xl font-bold">{workflows.filter(w => w.status === 'running').length}</p>
          <p className="text-sm text-gray-400 mt-2">Multi-agent processes</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-dark-600">
        {['overview', 'workflows', 'monitoring'].map((tab) => (
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

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {agentCategories.map((category) => {
            const CategoryIcon = category.icon
            return (
              <div key={category.id} className="card">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-${category.color}-500/20 rounded-lg flex items-center justify-center`}>
                      <CategoryIcon className={`w-6 h-6 text-${category.color}-400`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{category.name}</h3>
                      <p className="text-sm text-gray-400">{category.agents.length} agents deployed</p>
                    </div>
                  </div>
                  <button className="btn-primary flex items-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Deploy Agent</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.agents.map((agent) => (
                    <div key={agent.id} className="bg-dark-700 p-4 rounded-lg border border-dark-600 hover:border-primary-500 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold mb-1">{agent.name}</h4>
                          <span className={`badge ${
                            agent.status === 'active' ? 'badge-success' :
                            agent.status === 'paused' ? 'badge-warning' :
                            'badge-error'
                          }`}>
                            {agent.status}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm mb-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Tasks today:</span>
                          <span className="font-medium">{agent.tasks}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Success rate:</span>
                          <span className="text-green-400">{agent.successRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Cost today:</span>
                          <span className="text-yellow-400">${agent.cost}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button className={`btn flex-1 text-sm ${
                          agent.status === 'active' ? 'btn-secondary' : 'btn-primary'
                        }`}>
                          {agent.status === 'active' ? (
                            <><Pause className="w-4 h-4 mr-1" />Pause</>
                          ) : (
                            <><Play className="w-4 h-4 mr-1" />Activate</>
                          )}
                        </button>
                        <button className="btn-secondary p-2">
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Workflows Tab */}
      {activeTab === 'workflows' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Multi-Agent Workflows</h2>
            <button className="btn-primary flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Create Workflow</span>
            </button>
          </div>

          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="card hover:border-primary-500 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-bold">{workflow.name}</h3>
                      <span className={`badge ${
                        workflow.status === 'running' ? 'badge-info' :
                        workflow.status === 'completed' ? 'badge-success' :
                        'badge-warning'
                      }`}>
                        {workflow.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>{workflow.agents} agents coordinated</span>
                      <span>•</span>
                      <span>{workflow.duration}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {workflow.status === 'running' && (
                      <button className="btn-secondary">
                        <Pause className="w-4 h-4" />
                      </button>
                    )}
                    <button className="btn-secondary">
                      <BarChart3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-400">Progress</p>
                    <p className="text-sm font-medium">{workflow.completedTasks}/{workflow.totalTasks} tasks</p>
                  </div>
                  <div className="w-full bg-dark-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-pink-500 h-2 rounded-full transition-all"
                      style={{ width: `${(workflow.completedTasks / workflow.totalTasks) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Workflow Templates */}
          <div className="card mt-6">
            <h3 className="text-lg font-bold mb-4">Workflow Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'New Music Release', agents: 6, description: 'Automate entire release process' },
                { name: 'Client Onboarding', agents: 4, description: 'Setup new client projects' },
                { name: 'Monthly Reporting', agents: 3, description: 'Generate comprehensive reports' },
              ].map((template, i) => (
                <div key={i} className="bg-dark-700 p-4 rounded-lg border border-dark-600 hover:border-primary-500 transition-colors cursor-pointer">
                  <h4 className="font-bold mb-2">{template.name}</h4>
                  <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{template.agents} agents</span>
                    <button className="text-sm text-primary-400 hover:text-primary-300">
                      Use Template →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Monitoring Tab */}
      {activeTab === 'monitoring' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Health */}
            <div className="card">
              <h3 className="text-lg font-bold mb-4">System Health</h3>
              <div className="space-y-4">
                {[
                  { metric: 'API Response Time', value: '245ms', status: 'good', target: '<500ms' },
                  { metric: 'Task Success Rate', value: '92%', status: 'good', target: '>85%' },
                  { metric: 'Error Rate', value: '1.2%', status: 'good', target: '<5%' },
                  { metric: 'Queue Length', value: '12 tasks', status: 'good', target: '<50' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.metric}</p>
                      <p className="text-xs text-gray-400">Target: {item.target}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold">{item.value}</span>
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="card">
              <h3 className="text-lg font-bold mb-4">Cost Breakdown</h3>
              <div className="space-y-3">
                {agentCategories.map((cat) => {
                  const categoryCost = cat.agents.reduce((sum, a) => sum + a.cost, 0)
                  const percentage = (categoryCost / totalCost) * 100
                  return (
                    <div key={cat.id}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">{cat.name}</span>
                        <span className="text-sm font-bold">${categoryCost.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-dark-700 rounded-full h-2">
                        <div
                          className={`bg-${cat.color}-500 h-2 rounded-full`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Recent Activity Log */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Recent Activity</h3>
              <button className="btn-secondary flex items-center space-x-2">
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
            <div className="space-y-2">
              {[
                { agent: 'Licensing Scout', action: 'Found 3 new opportunities', time: '2 min ago', status: 'success' },
                { agent: 'Content Creator', action: 'Generated 5 social posts', time: '15 min ago', status: 'success' },
                { agent: 'Royalty Tracker', action: 'Updated streaming data', time: '32 min ago', status: 'success' },
                { agent: 'Product Design', action: 'Created 2 mockups', time: '1 hour ago', status: 'success' },
                { agent: 'Influencer Outreach', action: 'Sent 12 partnership emails', time: '2 hours ago', status: 'success' },
              ].map((log, i) => (
                <div key={i} className="flex items-start space-x-3 p-3 bg-dark-700 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{log.agent}:</span> {log.action}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
