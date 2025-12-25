import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
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

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ai-agents" element={<AIAgents />} />
          <Route path="/agent-orchestration" element={<AgentOrchestration />} />
          <Route path="/music-business" element={<MusicBusiness />} />
          <Route path="/lifestyle-branding" element={<LifestyleBranding />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/content-studio" element={<ContentStudio />} />
          <Route path="/revenue-streams" element={<RevenueStreams />} />
          <Route path="/personal" element={<PersonalDashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
