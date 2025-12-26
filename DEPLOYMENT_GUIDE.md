# 🚀 Red Vision Empire - Deployment Guide

Complete guide to deploying your AI-powered music empire.

---

## 📋 Pre-Deployment Checklist

- [ ] Node.js 18+ installed
- [ ] npm or yarn installed
- [ ] Git repository initialized
- [ ] Environment variables configured
- [ ] API keys obtained (Gemini, OpenAI, etc.)
- [ ] MCP servers configured (optional)

---

## 🎯 Quick Deploy (5 minutes)

### Option 1: Vercel (Recommended)

```bash
# 1. Install dependencies
npm install

# 2. Build the project
npm run build

# 3. Install Vercel CLI
npm install -g vercel

# 4. Deploy
vercel

# Follow the prompts:
# - Project name: red-vision-os
# - Link to existing project? N
# - Deploy? Y
```

**Your site will be live at:** `https://red-vision-os.vercel.app`

---

### Option 2: Netlify

```bash
# 1. Install dependencies
npm install

# 2. Build the project
npm run build

# 3. Deploy to Netlify
# Option A: Drag & drop the 'dist' folder to netlify.com

# Option B: Use Netlify CLI
npm install -g netlify-cli
netlify deploy --prod
```

---

### Option 3: Local Development

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/4429BrandingnMarketing.git
cd 4429BrandingnMarketing

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# Open http://localhost:3000
```

---

## 🔧 Environment Setup

### 1. Create Environment File

```bash
cp .env.example .env
```

### 2. Configure Environment Variables

Edit `.env`:

```bash
# AI Configuration
VITE_GEMINI_API_KEY=your_gemini_key_here
VITE_OPENAI_API_KEY=your_openai_key_here

# MCP Servers (Optional)
VITE_NOTION_KEY=your_notion_key
VITE_STRIPE_KEY=your_stripe_key
VITE_AIRTABLE_KEY=your_airtable_key

# Social Media APIs (Optional)
VITE_INSTAGRAM_TOKEN=your_instagram_token
VITE_TIKTOK_TOKEN=your_tiktok_token
VITE_TWITTER_API_KEY=your_twitter_key

# Music Platform APIs (Optional)
VITE_SPOTIFY_CLIENT_ID=your_spotify_id
VITE_SPOTIFY_CLIENT_SECRET=your_spotify_secret
VITE_DISTROKID_API_KEY=your_distrokid_key

# Analytics (Optional)
VITE_GA_ID=your_google_analytics_id
```

### 3. Get API Keys

**Gemini API:**
1. Go to https://makersuite.google.com/app/apikey
2. Create API key
3. Copy to `.env`

**OpenAI API:**
1. Go to https://platform.openai.com/api-keys
2. Create new secret key
3. Copy to `.env`

---

## 🤖 Agent Setup

### 1. Install Agent Dependencies

```bash
# Install agent framework
npm install @anthropic-ai/sdk openai

# Install MCP server dependencies (if using)
npm install @notionhq/client stripe airtable
```

### 2. Configure Agent Orchestrator

Create `agents/config.js`:

```javascript
export const agentConfig = {
  // Model selection
  models: {
    critical: 'claude-opus-4.5',      // High-stakes decisions
    general: 'claude-sonnet-4.5',     // Most operations
    fast: 'claude-haiku-4.5'          // High-volume tasks
  },

  // Cost limits
  dailyBudget: 100,  // $100/day max
  alertThreshold: 80, // Alert at 80% budget

  // Performance settings
  maxConcurrentAgents: 10,
  taskTimeout: 300000, // 5 minutes
  retryAttempts: 3
}
```

### 3. Deploy First Agent

```bash
# Test with a simple agent
node agents/test-agent.js

# Expected output:
# ✓ Agent initialized
# ✓ Task completed
# ✓ Result: [your result]
```

---

## 📊 MCP Server Setup (Optional but Recommended)

### 1. Install Claude Desktop

Download from: https://claude.ai/download

### 2. Configure MCP Servers

Edit Claude config:
- **Mac:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "NOTION_API_KEY": "your_key_here"
      }
    },
    "stripe": {
      "command": "npx",
      "args": ["-y", "@stripe/mcp-server"],
      "env": {
        "STRIPE_API_KEY": "your_key_here"
      }
    }
  }
}
```

### 3. Test MCP Connections

```bash
# Restart Claude Desktop
killall Claude && open -a Claude

# Test connection in Claude
# Ask: "Can you list my Notion pages?"
# Should return your Notion workspace data
```

---

## 🌐 Custom Domain Setup

### Vercel

```bash
# 1. Add domain in Vercel dashboard
vercel domains add yourdomain.com

# 2. Configure DNS (at your domain registrar)
# Add these records:
A     @     76.76.21.21
CNAME www   cname.vercel-dns.com
```

### Netlify

```bash
# 1. Add domain in Netlify dashboard
netlify domains:add yourdomain.com

# 2. Configure DNS
# Use Netlify DNS or add records at your registrar
```

---

## 🔐 Security Setup

### 1. Secure API Keys

```bash
# Never commit .env file
echo ".env" >> .gitignore

# Use platform environment variables for production
# Vercel: Settings → Environment Variables
# Netlify: Site settings → Environment
```

### 2. Set up CORS (if using backend)

```javascript
// backend/server.js
app.use(cors({
  origin: [
    'https://yourdomain.com',
    'https://red-vision-os.vercel.app'
  ],
  credentials: true
}))
```

### 3. Enable HTTPS

Both Vercel and Netlify provide free SSL certificates automatically.

---

## 📈 Performance Optimization

### 1. Enable Caching

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'charts': ['recharts'],
          'icons': ['lucide-react']
        }
      }
    }
  }
})
```

### 2. Image Optimization

```bash
# Install image optimizer
npm install -D vite-plugin-image-optimizer

# Add to vite.config.js
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

plugins: [
  ViteImageOptimizer()
]
```

### 3. Enable Compression

Vercel and Netlify handle this automatically.

---

## 🔄 Continuous Deployment

### GitHub Actions Setup

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 📊 Monitoring Setup

### 1. Add Analytics

```html
<!-- index.html -->
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 2. Error Tracking (Sentry)

```bash
npm install @sentry/react

# src/main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

### 3. Uptime Monitoring

Use:
- **UptimeRobot** (free): https://uptimerobot.com
- **StatusCake** (free): https://www.statuscake.com
- **Pingdom** (paid): https://www.pingdom.com

---

## 🚨 Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Working

```bash
# Vercel: Make sure variables are set in dashboard
# Netlify: Set in Site settings → Environment

# Restart dev server after changing .env
npm run dev
```

### MCP Servers Not Connecting

```bash
# Check Claude config file syntax
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json | json_pp

# Restart Claude Desktop
killall Claude && open -a Claude

# Check logs
tail -f ~/Library/Logs/Claude/mcp.log
```

---

## 📞 Support

- **GitHub Issues:** https://github.com/yourusername/4429BrandingnMarketing/issues
- **Email:** jason@redvisionmusic.com
- **Documentation:** Check README.md and other guides

---

## ✅ Post-Deployment Checklist

- [ ] Site is live and accessible
- [ ] All pages load correctly
- [ ] Environment variables working
- [ ] Analytics tracking
- [ ] Error monitoring active
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Agent test successful
- [ ] MCP servers connected (if applicable)
- [ ] Monitoring alerts configured

---

## 🎉 You're Live!

Your Red Vision Empire is now operational. Time to:

1. **Test thoroughly** - Click through all features
2. **Monitor performance** - Watch analytics
3. **Deploy agents** - Start automating
4. **Scale gradually** - Add features iteratively
5. **Dominate** - Rival the industry giants

---

*Your empire awaits. Deploy with confidence!* 🚀
