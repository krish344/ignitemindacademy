# IgniteMind Academy - NAPLAN Tutoring Platform

## Deploy to Netlify

### Option 1: Git-based Deploy (Recommended)

1. **Push to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Select your Git provider
   - Choose the `ignitemindacademy` repository
   - Netlify will auto-detect settings from `netlify.toml`

3. **Configure Environment Variables**
   In Netlify Dashboard → Site settings → Environment variables, add:
   - `RESEND_API_KEY` = your Resend API key

4. **Deploy**
   - Netlify will auto-deploy
   - Your site will be live at `https://your-site-name.netlify.app`

### Option 2: Manual Deploy (Netlify CLI)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

### Custom Domain

1. Go to Netlify Dashboard → Domain management
2. Click "Add custom domain"
3. Enter your domain (e.g., `ignitemindacademy.com`)
4. Follow DNS instructions

### Resend Email Setup

1. Add `RESEND_API_KEY` in Netlify environment variables
2. For custom email addresses (e.g., `results@ignitemindacademy.com`):
   - Verify your domain in Resend Dashboard
   - Add DNS records shown by Resend to your domain provider

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000
