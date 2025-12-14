import { useState } from 'react'
import {
  Video,
  Mic,
  FileText,
  Youtube,
  Podcast,
  BookOpen,
  Plus,
  Play,
  Edit,
  Eye,
  TrendingUp
} from 'lucide-react'

export default function ContentStudio() {
  const [activeTab, setActiveTab] = useState('podcasts')

  const [podcasts] = useState([
    { id: 1, title: 'Music Business Secrets Ep. 12', duration: '45:32', status: 'published', plays: 2400, date: '2024-01-15' },
    { id: 2, title: 'Interview with Top Producer', duration: '52:18', status: 'editing', plays: 0, date: '2024-01-22' },
    { id: 3, title: 'Breaking Into Licensing', duration: '38:45', status: 'scheduled', plays: 0, date: '2024-01-25' },
  ])

  const [videos] = useState([
    { id: 1, title: 'How I Built My Music Empire', views: 12500, likes: 890, status: 'published', date: '2024-01-10' },
    { id: 2, title: 'Studio Tour & Production Tips', views: 8200, likes: 640, status: 'published', date: '2024-01-12' },
    { id: 3, title: 'Music Marketing Masterclass', views: 0, likes: 0, status: 'draft', date: '2024-01-28' },
  ])

  const [articles] = useState([
    { id: 1, title: '10 Ways to License Your Music', category: 'Tutorial', reads: 3400, status: 'published', date: '2024-01-14' },
    { id: 2, title: 'The Future of Music Marketing', category: 'Opinion', reads: 2100, status: 'published', date: '2024-01-16' },
    { id: 3, title: 'Building a Sustainable Music Business', category: 'Guide', reads: 0, status: 'draft', date: '2024-01-20' },
  ])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Content Studio</h1>
        <p className="text-gray-400">Create and manage podcasts, videos, and articles</p>
      </div>

      {/* Content Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Total Views</p>
            <Eye className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold">26.1K</p>
          <p className="text-sm text-green-400 mt-2">+34% this month</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Podcast Plays</p>
            <Mic className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold">2.4K</p>
          <p className="text-sm text-green-400 mt-2">+18% this week</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Video Views</p>
            <Video className="w-5 h-5 text-red-400" />
          </div>
          <p className="text-3xl font-bold">20.7K</p>
          <p className="text-sm text-green-400 mt-2">+41% this month</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Article Reads</p>
            <FileText className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold">5.5K</p>
          <p className="text-sm text-green-400 mt-2">+27% this month</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-dark-600">
        {['podcasts', 'videos', 'articles'].map((tab) => (
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

      {/* Podcasts Tab */}
      {activeTab === 'podcasts' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Podcast Episodes</h2>
            <button className="btn-primary flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>New Episode</span>
            </button>
          </div>
          <div className="space-y-4">
            {podcasts.map((podcast) => (
              <div key={podcast.id} className="card hover:border-primary-600 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Mic className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{podcast.title}</h3>
                      <div className="flex items-center space-x-3 text-sm text-gray-400">
                        <span>{podcast.duration}</span>
                        <span>•</span>
                        <span>{podcast.date}</span>
                        <span className={`badge ${
                          podcast.status === 'published' ? 'badge-success' :
                          podcast.status === 'editing' ? 'badge-warning' :
                          'badge-info'
                        }`}>
                          {podcast.status}
                        </span>
                      </div>
                      {podcast.plays > 0 && (
                        <p className="text-sm text-green-400 mt-1">
                          {podcast.plays.toLocaleString()} plays
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {podcast.status === 'published' && (
                      <button className="btn-secondary">
                        <Play className="w-4 h-4" />
                      </button>
                    )}
                    <button className="btn-secondary">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Videos Tab */}
      {activeTab === 'videos' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Video Content</h2>
            <button className="btn-primary flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Upload Video</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="card hover:border-primary-600 transition-colors cursor-pointer">
                <div className="w-full h-40 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <Play className="w-12 h-12 text-white" />
                </div>
                <h3 className="font-bold mb-2">{video.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                  <span>{video.date}</span>
                  <span className={`badge ${
                    video.status === 'published' ? 'badge-success' : 'badge-warning'
                  }`}>
                    {video.status}
                  </span>
                </div>
                {video.views > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-400">Views</p>
                      <p className="text-lg font-bold">{video.views.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Likes</p>
                      <p className="text-lg font-bold">{video.likes.toLocaleString()}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Articles Tab */}
      {activeTab === 'articles' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Blog Articles</h2>
            <button className="btn-primary flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Write Article</span>
            </button>
          </div>
          <div className="space-y-4">
            {articles.map((article) => (
              <div key={article.id} className="card hover:border-primary-600 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{article.title}</h3>
                      <div className="flex items-center space-x-3 text-sm text-gray-400">
                        <span>{article.category}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                        <span className={`badge ${
                          article.status === 'published' ? 'badge-success' : 'badge-warning'
                        }`}>
                          {article.status}
                        </span>
                      </div>
                      {article.reads > 0 && (
                        <p className="text-sm text-green-400 mt-1">
                          {article.reads.toLocaleString()} reads
                        </p>
                      )}
                    </div>
                  </div>
                  <button className="btn-secondary">
                    <Edit className="w-4 h-4" />
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
