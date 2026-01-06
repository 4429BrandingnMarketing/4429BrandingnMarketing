# Visionary OS Deployment Guide

> Deploy to **redvisioncreativestudio.com** via Netlify

## Quick Deploy (2 minutes)

### 1. Connect Repository

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **Add new site** → **Import an existing project**
3. Select **GitHub** → Authorize if needed
4. Find `4429BrandingnMarketing`

### 2. Configure Build

| Setting | Value |
|---------|-------|
| Branch | `claude/build-visionary-os-01JAWJvHdHXsyz27Yx8Gdyfi` |
| Build command | `npm run build` |
| Publish directory | `dist` |

### 3. Deploy

Click **Deploy site** → Wait ~60 seconds

### 4. Connect Domain

1. **Site settings** → **Domain management** → **Add custom domain**
2. Enter `redvisioncreativestudio.com`
3. SSL auto-provisions ✓

---

## Environment Variables

**Required for AI features:**

| Variable | Description | Get it from |
|----------|-------------|-------------|
| `VITE_GEMINI_API_KEY` | Gemini AI API key | [Google AI Studio](https://makersuite.google.com/app/apikey) |
| `VITE_HUGGINGFACE_TOKEN` | HuggingFace access | [HuggingFace Settings](https://huggingface.co/settings/tokens) |

**To add:**
1. Site settings → Build & deploy → Environment
2. Add variable → Save
3. Trigger redeploy

> ⚠️ Variables must start with `VITE_` for Vite to expose them to the frontend.

---

## Continuous Deployment

After setup, every push auto-deploys:

```bash
git add .
git commit -m "Update"
git push
```

Netlify automatically builds and deploys. Zero downtime.

---

## Routes

| Path | Page |
|------|------|
| `/` | Landing Page |
| `/dashboard` | Main Dashboard |
| `/music-business` | Music Module |
| `/marketing` | Marketing Module |
| `/ai-agents` | AI Agents |
| `/admin` | Admin Panel |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check logs; verify Node 18+ |
| 404 errors | Verify `dist` publish dir; check redirects |
| Env vars not working | Must use `VITE_` prefix; redeploy after adding |
| Domain not updating | Clear cache; wait 5 min for CDN |

---

## CLI Deploy (Alternative)

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

---

## What's Included

- ✓ Free SSL (Let's Encrypt)
- ✓ Global CDN
- ✓ Auto-deploys on push
- ✓ PR preview deployments
- ✓ Asset optimization
- ✓ SPA routing configured
- ✓ Security headers
- ✓ Caching optimized

---

## Support

- [Netlify Docs](https://docs.netlify.com)
- [Netlify Status](https://www.netlifystatus.com)
