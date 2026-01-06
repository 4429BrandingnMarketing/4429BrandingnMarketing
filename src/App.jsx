import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Layout from './components/Layout'
import LandingPage from './components/LandingPage'
import Dashboard from './pages/Dashboard'
import AIAgents from './pages/AIAgents'
import AgentOrchestration from './pages/AgentOrchestration'
import MusicBusiness from './pages/MusicBusiness'
import LifestyleBranding from './pages/LifestyleBranding'
import Marketing from './pages/Marketing'
import ContentStudio from './pages/ContentStudio'
import RevenueStreams from './pages/RevenueStreams'
import PersonalDashboard from './pages/PersonalDashboard'
import Analytics from './pages/Analytics'
import AdminPanel from './pages/AdminPanel'
import HuggingFaceHub from './pages/HuggingFaceHub'

function LandingPageWrapper() {
  const navigate = useNavigate()
  return <LandingPage onGetStarted={() => navigate('/dashboard')} />
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page (No Layout) */}
        <Route path="/" element={<LandingPageWrapper />} />

        {/* App Routes (With Layout) */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/ai-agents" element={<Layout><AIAgents /></Layout>} />
        <Route path="/agent-orchestration" element={<Layout><AgentOrchestration /></Layout>} />
        <Route path="/music-business" element={<Layout><MusicBusiness /></Layout>} />
        <Route path="/lifestyle-branding" element={<Layout><LifestyleBranding /></Layout>} />
        <Route path="/marketing" element={<Layout><Marketing /></Layout>} />
        <Route path="/content-studio" element={<Layout><ContentStudio /></Layout>} />
        <Route path="/revenue-streams" element={<Layout><RevenueStreams /></Layout>} />
        <Route path="/personal" element={<Layout><PersonalDashboard /></Layout>} />
        <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
        <Route path="/huggingface" element={<Layout><HuggingFaceHub /></Layout>} />
        <Route path="/admin" element={<Layout><AdminPanel /></Layout>} />
      </Routes>
    </Router>
  )
}

export default App
