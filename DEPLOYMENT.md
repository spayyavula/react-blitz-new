
# Deployment Guide

## Vercel + Render Setup

### Prerequisites
- GitHub account
- Vercel account (vercel.com)
- Render account (render.com)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

### Step 2: Deploy Frontend to Vercel
1. Go to vercel.com and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect React settings
5. Deploy!

### Step 3: Deploy Backend to Render
1. Go to render.com and sign in
2. Click "New Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Deploy!

### Step 4: Update Configuration
1. Copy your Render backend URL (e.g., `https://your-app.onrender.com`)
2. Update `vercel.json` - replace `your-render-backend-url.onrender.com`
3. Update `main.py` - add your Vercel URL to CORS origins
4. Redeploy both services

### Environment Variables
- **Render**: Set `ENVIRONMENT=production`
- **Vercel**: Add any frontend environment variables in dashboard

### Custom Domains (Optional)
- Vercel: Project Settings → Domains
- Render: Service Settings → Custom Domains

### Monitoring
- Vercel: Built-in analytics and logs
- Render: Service logs and metrics in dashboard
