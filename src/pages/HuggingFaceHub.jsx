import { useState } from 'react'
import {
  Cpu,
  Database,
  Sparkles,
  Plus,
  ExternalLink,
  Star,
  Download,
  TrendingUp,
  Search,
  Filter,
  BookmarkPlus,
  Trash2,
  Play,
  CheckCircle,
  AlertCircle,
  Zap
} from 'lucide-react'

export default function HuggingFaceHub() {
  const [activeTab, setActiveTab] = useState('saved')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')

  // Saved resources that you've bookmarked
  const [savedResources, setSavedResources] = useState([
    {
      id: 1,
      name: 'musicgen-small',
      type: 'model',
      author: 'facebook',
      description: 'Text-to-music model for AI music generation',
      downloads: '2.5M',
      stars: 1200,
      tags: ['audio', 'music-generation', 'pytorch'],
      status: 'ready',
      addedDate: '2024-01-15',
      useCase: 'Background music generation for content'
    },
    {
      id: 2,
      name: 'whisper-large-v3',
      type: 'model',
      author: 'openai',
      description: 'Automatic speech recognition and transcription',
      downloads: '5.2M',
      stars: 3400,
      tags: ['audio', 'speech-recognition', 'pytorch'],
      status: 'integrated',
      addedDate: '2024-01-10',
      useCase: 'Podcast transcription automation'
    },
    {
      id: 3,
      name: 'stable-diffusion-xl',
      type: 'model',
      author: 'stabilityai',
      description: 'Image generation model for album artwork and merch designs',
      downloads: '8.1M',
      stars: 5600,
      tags: ['image', 'text-to-image', 'diffusion'],
      status: 'integrated',
      addedDate: '2024-01-08',
      useCase: 'Album artwork and social media graphics'
    },
    {
      id: 4,
      name: 'llama-3-70b-instruct',
      type: 'model',
      author: 'meta',
      description: 'Large language model for content creation and automation',
      downloads: '3.8M',
      stars: 2100,
      tags: ['nlp', 'text-generation', 'llama'],
      status: 'testing',
      addedDate: '2024-01-20',
      useCase: 'Blog writing and social media captions'
    },
    {
      id: 5,
      name: 'music-classification-dataset',
      type: 'dataset',
      author: 'spotify',
      description: 'Large-scale music genre classification dataset',
      downloads: '450K',
      stars: 890,
      tags: ['audio', 'classification', 'music'],
      status: 'ready',
      addedDate: '2024-01-12',
      useCase: 'Training custom genre classifier'
    }
  ])

  // Quick add form
  const [showAddForm, setShowAddForm] = useState(false)
  const [newResource, setNewResource] = useState({
    name: '',
    author: '',
    type: 'model',
    useCase: '',
    url: ''
  })

  const handleQuickAdd = () => {
    if (newResource.name && newResource.author) {
      const resource = {
        id: savedResources.length + 1,
        name: newResource.name,
        type: newResource.type,
        author: newResource.author,
        description: `Added from Hugging Face`,
        downloads: 'N/A',
        stars: 0,
        tags: [],
        status: 'ready',
        addedDate: new Date().toISOString().split('T')[0],
        useCase: newResource.useCase || 'To be determined',
        url: newResource.url
      }
      setSavedResources([resource, ...savedResources])
      setNewResource({ name: '', author: '', type: 'model', useCase: '', url: '' })
      setShowAddForm(false)
    }
  }

  const removeResource = (id) => {
    setSavedResources(savedResources.filter(r => r.id !== id))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'integrated': return 'green'
      case 'testing': return 'yellow'
      case 'ready': return 'blue'
      default: return 'gray'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'model': return Cpu
      case 'dataset': return Database
      case 'space': return Sparkles
      default: return Cpu
    }
  }

  const filteredResources = savedResources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === 'all' || resource.type === filterType
    return matchesSearch && matchesFilter
  })

  const stats = {
    totalSaved: savedResources.length,
    integrated: savedResources.filter(r => r.status === 'integrated').length,
    testing: savedResources.filter(r => r.status === 'testing').length,
    models: savedResources.filter(r => r.type === 'model').length,
    datasets: savedResources.filter(r => r.type === 'dataset').length,
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">🤗 Hugging Face Hub</h1>
            <p className="text-gray-400">Discover, save, and integrate AI models for your empire</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* Quick Add Form */}
      {showAddForm && (
        <div className="card mb-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-2 border-blue-500/30">
          <h3 className="text-xl font-bold mb-4">⚡ Quick Add Resource</h3>
          <p className="text-sm text-gray-400 mb-4">
            Found something cool on Hugging Face? Add it here for later!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Resource Name *</label>
              <input
                type="text"
                placeholder="e.g., musicgen-small"
                className="input w-full"
                value={newResource.name}
                onChange={(e) => setNewResource({...newResource, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Author *</label>
              <input
                type="text"
                placeholder="e.g., facebook"
                className="input w-full"
                value={newResource.author}
                onChange={(e) => setNewResource({...newResource, author: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select
                className="input w-full"
                value={newResource.type}
                onChange={(e) => setNewResource({...newResource, type: e.target.value})}
              >
                <option value="model">Model</option>
                <option value="dataset">Dataset</option>
                <option value="space">Space</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Hugging Face URL</label>
              <input
                type="text"
                placeholder="https://huggingface.co/..."
                className="input w-full"
                value={newResource.url}
                onChange={(e) => setNewResource({...newResource, url: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Use Case</label>
              <input
                type="text"
                placeholder="What will you use this for?"
                className="input w-full"
                value={newResource.useCase}
                onChange={(e) => setNewResource({...newResource, useCase: e.target.value})}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => setShowAddForm(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleQuickAdd}
              className="btn-primary"
            >
              Save Resource
            </button>
          </div>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Total Saved</p>
            <BookmarkPlus className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold">{stats.totalSaved}</p>
          <p className="text-sm text-gray-400 mt-2">Resources tracked</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Integrated</p>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold">{stats.integrated}</p>
          <p className="text-sm text-green-400 mt-2">In production</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Testing</p>
            <AlertCircle className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-3xl font-bold">{stats.testing}</p>
          <p className="text-sm text-yellow-400 mt-2">Being evaluated</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Models</p>
            <Cpu className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold">{stats.models}</p>
          <p className="text-sm text-gray-400 mt-2">AI models</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Datasets</p>
            <Database className="w-5 h-5 text-pink-400" />
          </div>
          <p className="text-3xl font-bold">{stats.datasets}</p>
          <p className="text-sm text-gray-400 mt-2">Training data</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search your saved resources..."
              className="input w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              className="input"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="model">Models Only</option>
              <option value="dataset">Datasets Only</option>
              <option value="space">Spaces Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Saved Resources Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredResources.map((resource) => {
          const TypeIcon = getTypeIcon(resource.type)
          const statusColor = getStatusColor(resource.status)

          return (
            <div key={resource.id} className="card hover:border-primary-500 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`w-16 h-16 bg-${statusColor}-500/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <TypeIcon className={`w-8 h-8 text-${statusColor}-400`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold">{resource.author}/{resource.name}</h3>
                        <p className="text-sm text-gray-400">{resource.description}</p>
                      </div>
                      <div className={`badge badge-${statusColor === 'green' ? 'success' : statusColor === 'yellow' ? 'warning' : 'info'}`}>
                        {resource.status}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {resource.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-dark-700 rounded border border-dark-600">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-400">Downloads</p>
                        <p className="font-bold flex items-center">
                          <Download className="w-4 h-4 mr-1 text-blue-400" />
                          {resource.downloads}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Stars</p>
                        <p className="font-bold flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-400" />
                          {resource.stars}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Type</p>
                        <p className="font-bold capitalize">{resource.type}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Added</p>
                        <p className="font-bold">{resource.addedDate}</p>
                      </div>
                    </div>

                    <div className="bg-dark-700 p-3 rounded border border-dark-600">
                      <p className="text-xs text-gray-400 mb-1">Use Case:</p>
                      <p className="text-sm">{resource.useCase}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <a
                    href={resource.url || `https://huggingface.co/${resource.author}/${resource.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center space-x-2 text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View on HF</span>
                  </a>
                  <button className="btn-secondary flex items-center space-x-2 text-sm">
                    <Play className="w-4 h-4" />
                    <span>Test</span>
                  </button>
                  <button
                    onClick={() => removeResource(resource.id)}
                    className="btn-secondary flex items-center space-x-2 text-sm hover:border-red-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <div className="card text-center py-12">
          <Sparkles className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">No resources found</h3>
          <p className="text-gray-400 mb-4">
            {searchQuery ? 'Try a different search term' : 'Start by adding your first Hugging Face resource!'}
          </p>
          {!searchQuery && (
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary mx-auto"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Resource
            </button>
          )}
        </div>
      )}

      {/* Quick Links */}
      <div className="card mt-8 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border-2 border-orange-500/30">
        <h3 className="text-xl font-bold mb-4">🔥 Popular Categories on Hugging Face</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="https://huggingface.co/models?pipeline_tag=text-to-speech"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <span>Text-to-Speech</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://huggingface.co/models?pipeline_tag=audio-classification"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <span>Audio AI</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://huggingface.co/models?pipeline_tag=text-generation"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <span>Text Generation</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://huggingface.co/models?pipeline_tag=image-to-image"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <span>Image AI</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
