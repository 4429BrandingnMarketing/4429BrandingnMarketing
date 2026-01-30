# 🦞 Moltbot Integration Guide for Visionary OS

## Complete Setup and Integration Documentation

---

## 📋 Table of Contents

1. [What is Moltbot?](#what-is-moltbot)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Integration with Visionary OS](#integration-with-visionary-os)
6. [Use Cases for Music Business](#use-cases-for-music-business)
7. [Troubleshooting](#troubleshooting)
8. [Security Considerations](#security-considerations)

---

## 🤖 What is Moltbot?

**Moltbot** (formerly Clawdbot) is a personal AI assistant created by Peter Steinberger that lets you control your computer through messaging apps like WhatsApp, Telegram, or terminal.

### Key Features:
- 🎯 **Control via Messaging**: Send commands through WhatsApp/Telegram
- 🤖 **Powered by Claude**: Uses Anthropic's Claude AI for intelligent automation
- 💻 **Computer Control**: Execute commands, read files, run scripts
- 🔄 **Always Running**: Background daemon runs 24/7
- 🎵 **Perfect for Music Business**: Automate tasks, check analytics, manage catalog

### Perfect Integration with Visionary OS:
Moltbot complements your Visionary OS by allowing you to:
- Check music streaming analytics while on the go
- Manage your Red Vision Music catalog remotely
- Post to social media from your phone
- Run reports and get insights via WhatsApp
- Automate repetitive music business tasks

---

## ✅ Requirements

### System Requirements:
- **Node.js**: v24 or higher (**IMPORTANT!**)
- **npm** or **pnpm**: Latest version
- **Operating System**: macOS, Linux, or Windows (WSL recommended)
- **Anthropic API Key**: Get from [console.anthropic.com](https://console.anthropic.com)

### Optional Requirements:
- **WhatsApp**: For mobile control
- **Telegram**: Alternative messaging platform
- **Meta Business Account**: For WhatsApp Business API

---

## 🚀 Installation

### Step 1: Upgrade to Node 24+

**Check Current Version:**
```bash
node --version
# If below v24, upgrade using nvm
```

**Install Node 24 with nvm:**
```bash
# Install nvm (if not already installed)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# Reload shell
source ~/.bashrc  # or ~/.zshrc

# Install Node 24
nvm install 24

# Use Node 24
nvm use 24

# Set as default
nvm alias default 24

# Verify
node --version
# Should show v24.x.x
```

### Step 2: Install Moltbot

```bash
# Install globally
npm install -g moltbot@latest

# Or with pnpm
pnpm add -g moltbot@latest

# Verify installation
moltbot --version
```

### Step 3: Run Onboarding Wizard

```bash
# Run onboarding to set up daemon
moltbot onboard --install-daemon

# Follow the interactive prompts:
# 1. Choose messaging platform (WhatsApp/Telegram/Terminal)
# 2. Enter Anthropic API key
# 3. Configure permissions
# 4. Install system daemon (launchd/systemd)
```

### Step 4: Get Anthropic API Key

1. Visit: [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Go to **API Keys**
4. Click **Create Key**
5. Copy the key (starts with `sk-ant-...`)
6. Store securely (you won't see it again!)

---

## ⚙️ Configuration

### Configure API Key

**Option 1: During Onboarding**
```bash
# The onboarding wizard will prompt for API key
moltbot onboard --install-daemon
```

**Option 2: Environment Variable**
```bash
# Add to ~/.bashrc or ~/.zshrc
export ANTHROPIC_API_KEY="sk-ant-your-key-here"

# Reload shell
source ~/.bashrc
```

**Option 3: Config File**
```bash
# Create config file
mkdir -p ~/.config/moltbot
nano ~/.config/moltbot/config.json

# Add:
{
  "apiKey": "sk-ant-your-key-here",
  "platform": "whatsapp",
  "daemon": true
}
```

### Configure Messaging Platform

**WhatsApp Setup:**
```bash
# Run onboarding and select WhatsApp
moltbot onboard --install-daemon

# Follow instructions to:
# 1. Scan QR code with WhatsApp
# 2. Authorize connection
# 3. Set up webhook
```

**Telegram Setup:**
```bash
# Run onboarding and select Telegram
moltbot onboard --install-daemon

# Follow instructions to:
# 1. Create Telegram bot via @BotFather
# 2. Get bot token
# 3. Connect bot to Moltbot
```

**Terminal Mode:**
```bash
# Use terminal interface (no messaging app needed)
moltbot chat
```

### Start Moltbot Daemon

```bash
# Start daemon
moltbot start

# Check status
moltbot status

# Stop daemon
moltbot stop

# Restart daemon
moltbot restart

# View logs
moltbot logs
```

---

## 🎨 Integration with Visionary OS

### Already Integrated! ✅

Moltbot is already integrated into your Visionary OS app:

**Location:** AI Agents → Moltbot Integration

**Features:**
- ✅ Status dashboard showing connection state
- ✅ Command terminal for sending commands
- ✅ Command history with responses
- ✅ Configuration panel for API key setup
- ✅ Setup instructions with live documentation
- ✅ Use case examples for music business

### Access Moltbot in Visionary OS:

1. **Navigate to AI Agents**
   - Go to `/ai-agents` in your Visionary OS app
   - Or click "AI Agents" in the sidebar

2. **Open Moltbot Integration**
   - Click "Configure Moltbot" on the banner
   - Or click "Configure" on the 🦞 Moltbot Agent card

3. **Setup Your Connection**
   - Enter your Anthropic API key
   - Choose messaging platform
   - Click "Connect Moltbot"

4. **Start Sending Commands**
   - Use the command terminal
   - Or message via WhatsApp/Telegram
   - Commands execute on your computer!

### API Integration (Advanced)

If you want to connect Moltbot programmatically:

```javascript
// Example: Send command from Visionary OS to Moltbot
const sendMoltbotCommand = async (command) => {
  try {
    // Connect to Moltbot daemon
    const response = await fetch('http://localhost:3000/api/moltbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command })
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Moltbot error:', error)
  }
}

// Usage
await sendMoltbotCommand('/analyze spotify-streams last-month')
```

---

## 🎵 Use Cases for Music Business

### 1. Analytics & Reporting
```bash
# Check streaming numbers
/analyze spotify-streams today

# Get revenue report
/generate-report royalties Q1-2026

# Track social media growth
/check-followers instagram this-week
```

### 2. Catalog Management
```bash
# List recent releases
/list-tracks released 2026

# Find track by ID
/find-track ISRC:US1234567890

# Update track metadata
/update-track "Song Name" genre:Hip-Hop
```

### 3. Social Media Management
```bash
# Post to Instagram
/post-instagram "New single out now! 🎵" attach:cover.jpg

# Schedule tweet
/schedule-tweet "Album drop Friday!" time:2026-02-01T12:00

# Reply to mentions
/reply-to-mention @username "Thanks for the support!"
```

### 4. Licensing & Royalties
```bash
# Check pending licenses
/list-licenses status:pending

# Send licensing pitch
/pitch-license "Track Name" to:email@company.com

# Track royalty payments
/track-royalties artist:"Red Vision Music" month:January
```

### 5. Marketing Automation
```bash
# Run email campaign
/send-campaign "New Album Announcement"

# Check ad performance
/analyze-ads spotify last-7-days

# Generate press release
/generate-press-release "Album Title" release-date:2026-03-15
```

### 6. Team Collaboration
```bash
# Assign task to team
/assign-task "Mix track 3" to:@producer

# Check project status
/project-status "Album 2026"

# Share file with team
/share-file "demo.mp3" with:@team-music
```

---

## 🔧 Troubleshooting

### Issue: `moltbot: command not found`

**Cause:** Node version too low or npm global bin not in PATH

**Solution:**
```bash
# Check Node version
node --version  # Must be v24+

# Check npm global bin path
npm config get prefix

# Add to PATH (add to ~/.bashrc)
export PATH="$PATH:$(npm config get prefix)/bin"

# Reload shell
source ~/.bashrc
```

### Issue: "API key invalid"

**Cause:** Wrong API key or expired key

**Solution:**
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Generate new API key
3. Update in Moltbot config:
   ```bash
   moltbot config set apiKey sk-ant-new-key-here
   ```

### Issue: Daemon won't start

**Cause:** Port already in use or permission issues

**Solution:**
```bash
# Check if daemon is running
moltbot status

# Kill existing process
moltbot stop

# Check port 3000 is free
lsof -i :3000

# Start with different port
moltbot start --port 3001
```

### Issue: WhatsApp not connecting

**Cause:** QR code expired or network issues

**Solution:**
```bash
# Restart onboarding
moltbot onboard --reset

# Check firewall allows WhatsApp connection
# Check internet connection is stable
# Scan QR code within 30 seconds
```

### Issue: Commands execute but no response

**Cause:** Permissions not granted or Claude API rate limit

**Solution:**
```bash
# Check logs
moltbot logs

# Verify API key has credits
# Check rate limits on console.anthropic.com

# Grant permissions during onboarding
moltbot onboard --install-daemon
```

---

## 🔐 Security Considerations

### ⚠️ IMPORTANT SECURITY WARNINGS

**Moltbot has FULL access to your computer!**
- Can read any file
- Can execute any command
- Can modify system settings
- Can access sensitive data

### Best Practices:

✅ **DO:**
- Use strong API key protection
- Enable 2FA on messaging accounts
- Run in isolated environment (Docker/VM)
- Review commands before execution
- Monitor logs regularly
- Use allowlist for allowed commands
- Implement rate limiting

❌ **DON'T:**
- Share API keys publicly
- Run as root/administrator
- Allow untrusted users access
- Skip permission prompts
- Disable security features
- Use on production servers without sandboxing

### Recommended Security Setup:

**1. Use Environment Variables:**
```bash
# Store API key in environment (not in code)
export ANTHROPIC_API_KEY="sk-ant-..."

# Add to ~/.bashrc but chmod 600
chmod 600 ~/.bashrc
```

**2. Restrict Command Access:**
```javascript
// In Moltbot config, whitelist commands
{
  "allowedCommands": [
    "analyze",
    "list-tracks",
    "check-followers"
  ],
  "blockedCommands": [
    "rm",
    "sudo",
    "chmod"
  ]
}
```

**3. Use Separate WhatsApp Account:**
```bash
# Don't use your personal WhatsApp
# Create dedicated business account for Moltbot
```

**4. Enable Audit Logging:**
```bash
# Log all commands to file
moltbot config set logging.enabled true
moltbot config set logging.file ~/.moltbot/audit.log
```

**5. Network Isolation:**
```bash
# Run Moltbot in Docker container
docker run -d --name moltbot \
  -e ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY \
  -v ~/.moltbot:/config \
  moltbot:latest
```

---

## 📚 Additional Resources

**Official Documentation:**
- Moltbot Docs: https://docs.molt.bot
- GitHub Repo: https://github.com/moltbot/moltbot
- API Reference: https://docs.molt.bot/api

**Community:**
- GitHub Discussions: https://github.com/moltbot/moltbot/discussions
- Discord: (check repo for invite link)
- Twitter: Follow updates from creator

**Related Tools:**
- Anthropic Console: https://console.anthropic.com
- Claude API Docs: https://docs.anthropic.com
- WhatsApp Business API: https://developers.facebook.com/docs/whatsapp

---

## 🎯 Quick Start Checklist

Use this checklist to get Moltbot running:

- [ ] Install Node 24+ with nvm
- [ ] Install Moltbot globally: `npm install -g moltbot@latest`
- [ ] Get Anthropic API key from console.anthropic.com
- [ ] Run onboarding: `moltbot onboard --install-daemon`
- [ ] Choose messaging platform (WhatsApp/Telegram/Terminal)
- [ ] Configure API key and permissions
- [ ] Start daemon: `moltbot start`
- [ ] Test with command: `/status`
- [ ] Check Visionary OS AI Agents page
- [ ] Configure integration in Visionary OS
- [ ] Send first command from app!

---

## 💡 Pro Tips

**1. Create Command Aliases:**
```bash
# Add shortcuts for common commands
alias streams="moltbot send '/analyze spotify-streams today'"
alias revenue="moltbot send '/generate-report royalties this-month'"
```

**2. Integrate with Visionary OS Workflows:**
```javascript
// Auto-send analytics to Moltbot daily
cron.schedule('0 9 * * *', () => {
  sendMoltbotCommand('/generate-report daily-analytics')
})
```

**3. Use Templates:**
```bash
# Save command templates
moltbot template save "daily-check" \
  "/analyze spotify-streams today && /check-followers instagram"

# Run template
moltbot template run "daily-check"
```

**4. Batch Commands:**
```bash
# Send multiple commands at once
moltbot batch <<EOF
/analyze spotify-streams
/list-tracks released this-week
/check-followers all-platforms
EOF
```

---

## 🚀 What's Next?

Now that Moltbot is integrated with Visionary OS:

1. ✅ **Deploy to Production**
   - Your app already has Moltbot integration
   - Deploy to redvisioncreativestudio.com (Netlify)
   - Users can configure Moltbot from the UI!

2. ✅ **Customize Commands**
   - Create custom commands for your music business
   - Integrate with Red Vision Music catalog
   - Connect to Spotify API, Instagram, etc.

3. ✅ **Automate Everything**
   - Daily analytics reports
   - Auto-post releases to social media
   - Track royalties automatically
   - Monitor playlist placements

4. ✅ **Scale Your Empire**
   - Control multiple projects remotely
   - Manage team from messaging app
   - Run your entire music business from your phone!

---

**Your Visionary OS now has Moltbot superpowers! 🦞🚀**

Control your entire music empire from anywhere, anytime, through any messaging app.

---

*Last Updated: 2026-01-30*
*Visionary OS + Moltbot Integration by Red Vision Music*
