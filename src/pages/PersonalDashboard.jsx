import { useState } from 'react'
import {
  Target,
  CheckCircle,
  Clock,
  Calendar,
  TrendingUp,
  Heart,
  Dumbbell,
  Brain,
  Coffee,
  Moon,
  Sun,
  Award,
  Zap,
  Plus
} from 'lucide-react'

export default function PersonalDashboard() {
  const [tasks] = useState([
    { id: 1, title: 'Review Q1 revenue reports', category: 'Business', priority: 'high', completed: false, dueToday: true },
    { id: 2, title: 'Call with new client prospect', category: 'Business', priority: 'high', completed: false, dueToday: true },
    { id: 3, title: 'Finish track production', category: 'Music', priority: 'medium', completed: true, dueToday: true },
    { id: 4, title: 'Gym workout - Chest & Triceps', category: 'Wellness', priority: 'medium', completed: true, dueToday: true },
    { id: 5, title: 'Review merch store analytics', category: 'Business', priority: 'medium', completed: false, dueToday: false },
    { id: 6, title: 'Content calendar planning', category: 'Marketing', priority: 'low', completed: false, dueToday: false },
  ])

  const [meetings] = useState([
    { id: 1, title: 'Weekly Team Sync', time: '9:00 AM', duration: '30 min', status: 'completed' },
    { id: 2, title: 'Client Pitch - Urban Beats', time: '11:00 AM', duration: '1 hour', status: 'upcoming' },
    { id: 3, title: 'Studio Session', time: '2:00 PM', duration: '3 hours', status: 'upcoming' },
    { id: 4, title: 'Marketing Strategy Review', time: '6:00 PM', duration: '45 min', status: 'upcoming' },
  ])

  const [wellness] = useState({
    sleep: { hours: 7.5, target: 8, score: 94 },
    exercise: { sessions: 4, target: 5, score: 80 },
    meditation: { minutes: 45, target: 60, score: 75 },
    hydration: { glasses: 7, target: 8, score: 88 },
  })

  const completedTasks = tasks.filter(t => t.completed).length
  const totalTasks = tasks.length
  const completionRate = Math.round((completedTasks / totalTasks) * 100)

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Jason Salvador - Personal Command Center</h1>
        </div>
        <p className="text-gray-400">Your personal productivity and wellness hub</p>
      </div>

      {/* Daily Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Tasks Completed</p>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold">{completedTasks}/{totalTasks}</p>
          <div className="mt-3">
            <div className="w-full bg-dark-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Today's Meetings</p>
            <Calendar className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold">{meetings.filter(m => m.status === 'upcoming').length}</p>
          <p className="text-sm text-gray-400 mt-2">{meetings.length} total scheduled</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Wellness Score</p>
            <Heart className="w-5 h-5 text-pink-400" />
          </div>
          <p className="text-3xl font-bold text-green-400">84%</p>
          <p className="text-sm text-green-400 mt-2 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            +6% this week
          </p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Focus Time</p>
            <Brain className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold">5.2hrs</p>
          <p className="text-sm text-gray-400 mt-2">Deep work today</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Today's Tasks */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Today's Tasks</h2>
            <button className="btn-primary flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>
          </div>
          <div className="space-y-3">
            {tasks.filter(t => t.dueToday).map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  task.completed
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-dark-700 border-dark-600 hover:border-primary-500'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    task.completed
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-400'
                  }`}>
                    {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>
                      {task.title}
                    </h3>
                    <div className="flex items-center space-x-3 mt-2 text-xs">
                      <span className={`badge ${
                        task.priority === 'high' ? 'badge-error' :
                        task.priority === 'medium' ? 'badge-warning' :
                        'badge-info'
                      }`}>
                        {task.priority}
                      </span>
                      <span className="text-gray-400">{task.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="card">
          <h2 className="text-xl font-bold mb-6">Today's Schedule</h2>
          <div className="space-y-4">
            {meetings.map((meeting) => (
              <div
                key={meeting.id}
                className={`p-3 rounded-lg ${
                  meeting.status === 'completed'
                    ? 'bg-dark-700 opacity-50'
                    : 'bg-blue-500/10 border border-blue-500/30'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-sm">{meeting.title}</h3>
                  {meeting.status === 'completed' && (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  )}
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>{meeting.time}</span>
                  <span>•</span>
                  <span>{meeting.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wellness Tracking */}
      <div className="card">
        <h2 className="text-xl font-bold mb-6">Wellness Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Moon className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Sleep</p>
                <p className="text-lg font-bold">{wellness.sleep.hours}hrs</p>
              </div>
            </div>
            <div className="w-full bg-dark-700 rounded-full h-2 mb-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${wellness.sleep.score}%` }}
              />
            </div>
            <p className="text-xs text-gray-400">Target: {wellness.sleep.target}hrs</p>
          </div>

          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Exercise</p>
                <p className="text-lg font-bold">{wellness.exercise.sessions}/wk</p>
              </div>
            </div>
            <div className="w-full bg-dark-700 rounded-full h-2 mb-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${wellness.exercise.score}%` }}
              />
            </div>
            <p className="text-xs text-gray-400">Target: {wellness.exercise.target}/week</p>
          </div>

          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Meditation</p>
                <p className="text-lg font-bold">{wellness.meditation.minutes}min</p>
              </div>
            </div>
            <div className="w-full bg-dark-700 rounded-full h-2 mb-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: `${wellness.meditation.score}%` }}
              />
            </div>
            <p className="text-xs text-gray-400">Target: {wellness.meditation.target}min</p>
          </div>

          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <Coffee className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Hydration</p>
                <p className="text-lg font-bold">{wellness.hydration.glasses} cups</p>
              </div>
            </div>
            <div className="w-full bg-dark-700 rounded-full h-2 mb-2">
              <div
                className="bg-cyan-500 h-2 rounded-full"
                style={{ width: `${wellness.hydration.score}%` }}
              />
            </div>
            <p className="text-xs text-gray-400">Target: {wellness.hydration.target} cups</p>
          </div>
        </div>
      </div>
    </div>
  )
}
