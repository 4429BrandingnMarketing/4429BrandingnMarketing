import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Bot,
  Music,
  Megaphone,
  Video,
  DollarSign,
  BarChart3,
  Menu,
  X,
  Sparkles,
  ShoppingBag,
  Target,
  Zap,
  Settings
} from 'lucide-react'
import AIAssistant from './AIAssistant'

const navigation = [
  { name: 'Command Center', href: '/', icon: LayoutDashboard },
  { name: 'Agent Orchestration', href: '/agent-orchestration', icon: Zap },
  { name: 'AI Agents', href: '/ai-agents', icon: Bot },
  { name: 'Red Vision Music', href: '/music-business', icon: Music },
  { name: '#4429 Lifestyle', href: '/lifestyle-branding', icon: Megaphone },
  { name: 'GiFTD N\' PrVLGD', href: '/revenue-streams', icon: ShoppingBag },
  { name: 'Jason Salvador', href: '/personal', icon: Target },
  { name: 'Marketing', href: '/marketing', icon: Megaphone },
  { name: 'Content Studio', href: '/content-studio', icon: Video },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Admin Panel', href: '/admin', icon: Settings },
]

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-dark-900">
      {/* AI Assistant */}
      <AIAssistant />
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
        <div
          className={`fixed inset-0 bg-black/80 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setSidebarOpen(false)}
        />
        <div className={`fixed inset-y-0 left-0 w-64 bg-dark-800 border-r border-dark-600 transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-8 h-8 text-primary-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-pink-500 bg-clip-text text-transparent">
                Visionary OS
              </span>
            </div>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="px-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-400 hover:bg-dark-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-dark-800 border-r border-dark-600">
          <div className="flex items-center space-x-3 p-6">
            <Sparkles className="w-8 h-8 text-primary-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-pink-500 bg-clip-text text-transparent">
              Visionary OS
            </span>
          </div>
          <nav className="flex-1 px-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-400 hover:bg-dark-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>
          <div className="p-4 border-t border-dark-600">
            <div className="text-sm text-gray-400">
              <p className="font-medium text-white">Red Vision Music</p>
              <p className="text-xs mt-1">jason@redvisionmusic.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-dark-600 bg-dark-800 px-4 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-primary-500" />
            <span className="font-bold bg-gradient-to-r from-primary-400 to-pink-500 bg-clip-text text-transparent">
              Visionary OS
            </span>
          </div>
        </div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
