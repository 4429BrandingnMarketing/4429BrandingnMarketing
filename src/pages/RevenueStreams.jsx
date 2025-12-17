import { useState } from 'react'
import {
  DollarSign,
  ShoppingBag,
  Package,
  Store,
  Zap,
  TrendingUp,
  Plus,
  ExternalLink,
  Settings
} from 'lucide-react'

export default function RevenueStreams() {
  const [streams] = useState([
    {
      id: 1,
      name: 'Music Licensing',
      icon: DollarSign,
      revenue: 15200,
      growth: 42,
      status: 'active',
      color: 'green',
      deals: 12
    },
    {
      id: 2,
      name: 'Merch Store',
      icon: ShoppingBag,
      revenue: 8900,
      growth: 28,
      status: 'active',
      color: 'blue',
      deals: 245
    },
    {
      id: 3,
      name: 'Amazon Store',
      icon: Store,
      revenue: 6300,
      growth: 15,
      status: 'active',
      color: 'orange',
      deals: 89
    },
    {
      id: 4,
      name: 'Digital Products',
      icon: Package,
      revenue: 5400,
      growth: 31,
      status: 'active',
      color: 'purple',
      deals: 67
    },
    {
      id: 5,
      name: 'Ad Revenue',
      icon: Zap,
      revenue: 3200,
      growth: 12,
      status: 'active',
      color: 'pink',
      deals: 8
    },
    {
      id: 6,
      name: 'Wellness Apps',
      icon: Package,
      revenue: 2100,
      growth: 8,
      status: 'setup',
      color: 'cyan',
      deals: 45
    },
  ])

  const [products] = useState([
    { id: 1, name: 'Signature T-Shirt', category: 'Merch', sales: 145, revenue: 2900, inventory: 234 },
    { id: 2, name: 'Music Production Course', category: 'Digital', sales: 23, revenue: 4600, inventory: '∞' },
    { id: 3, name: 'Artist Hoodie', category: 'Merch', sales: 89, revenue: 4450, inventory: 167 },
    { id: 4, name: 'Mixing & Mastering Guide', category: 'Digital', sales: 67, revenue: 670, inventory: '∞' },
  ])

  const totalRevenue = streams.reduce((sum, stream) => sum + stream.revenue, 0)
  const activeStreams = streams.filter(s => s.status === 'active').length

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Revenue Streams</h1>
        <p className="text-gray-400">Manage all your income sources in one place</p>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <p className="text-sm text-gray-400 mb-1">Total Revenue</p>
          <p className="text-3xl font-bold text-green-400">${totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-gray-400 mt-2">This month</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-400 mb-1">Active Streams</p>
          <p className="text-3xl font-bold">{activeStreams}/{streams.length}</p>
          <p className="text-sm text-gray-400 mt-2">Revenue sources</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-400 mb-1">Avg Growth</p>
          <p className="text-3xl font-bold text-green-400">
            {Math.round(streams.reduce((sum, s) => sum + s.growth, 0) / streams.length)}%
          </p>
          <p className="text-sm text-gray-400 mt-2">Month over month</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-400 mb-1">Top Stream</p>
          <p className="text-xl font-bold">Music Licensing</p>
          <p className="text-sm text-green-400 mt-2">$15.2K this month</p>
        </div>
      </div>

      {/* Revenue Streams Grid */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">All Revenue Streams</h2>
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Add Stream</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {streams.map((stream) => {
            const Icon = stream.icon
            return (
              <div key={stream.id} className="card hover:border-primary-600 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${stream.color}-500/20 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${stream.color}-400`} />
                  </div>
                  <span className={`badge ${
                    stream.status === 'active' ? 'badge-success' : 'badge-warning'
                  }`}>
                    {stream.status}
                  </span>
                </div>
                <h3 className="font-bold mb-2">{stream.name}</h3>
                <p className="text-3xl font-bold text-green-400 mb-2">
                  ${stream.revenue.toLocaleString()}
                </p>
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-gray-400">{stream.deals} transactions</span>
                  <span className="flex items-center text-green-400">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +{stream.growth}%
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="btn-secondary flex-1">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button className="btn-secondary flex-1">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Top Products */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Top Products</h2>
          <button className="btn-secondary">View All</button>
        </div>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
              <div className="flex-1">
                <h3 className="font-bold mb-1">{product.name}</h3>
                <div className="flex items-center space-x-3 text-sm text-gray-400">
                  <span>{product.category}</span>
                  <span>•</span>
                  <span>{product.sales} sales</span>
                  <span>•</span>
                  <span>Inventory: {product.inventory}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-green-400">${product.revenue.toLocaleString()}</p>
                <p className="text-xs text-gray-400">Revenue</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
