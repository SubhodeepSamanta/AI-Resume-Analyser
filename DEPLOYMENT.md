# 🚀 Deployment Guide

## Overview
- **Frontend**: Vercel (React/Vite)
- **Backend**: Render (Node.js)
- **AI Model**: Render (Python/Flask)

---

## 1️⃣ Deploy AI Model on Render (Do This First!)

### Step 1: Prepare AI Model for Deployment

✅ Already done:
- Added `gunicorn` to requirements.txt
- Created `Procfile` with `web: gunicorn api:app`
- Updated `api.py` to use PORT environment variable
- Created `runtime.txt` for Python version

### Step 2: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Connect your repository

### Step 3: Deploy Python AI
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repo: `AI-Resume-Analyser`
3. **Settings:**
   - **Name**: `ai-resume-analyzer` (or any name)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `ai-model`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn api:app`
   - **Instance Type**: `Free`

4. **Environment Variables** (Add these):
   ```
   PYTHON_VERSION=3.12.0
   ```

5. Click **"Create Web Service"**

6. Wait 5-10 minutes for deployment
   - Render will install packages
   - **Important**: First deploy will take longer because it needs to download NLTK data

7. **Your AI API URL** will be: `https://ai-resume-analyzer.onrender.com`
   - Copy this URL! You'll need it for the backend

### Step 4: Train the Model (Important!)

**Problem**: The trained model files (`trained_models/*.pkl`) won't exist on Render initially.

**Solutions:**

**Option A - Include Pre-trained Models in Git** (Recommended if files < 100MB):
1. Train locally: `python model.py` → yes
2. Add trained models to git:
   ```bash
   git add ai-model/trained_models/
   git commit -m "Add trained models"
   git push
   ```
3. Redeploy on Render

**Option B - Train on Render** (If models are large):
1. After deployment, use Render Shell:
   - Go to your service → **"Shell"** tab
   - Run: `python model.py` and type `yes`
   - This trains the model on Render's server
   - Models are saved to persistent disk

**Option C - Use Cloud Storage** (Production approach):
- Upload trained models to AWS S3 or similar
- Download models on server startup
- Modify `api.py` to fetch from S3

---

## 2️⃣ Deploy Backend on Render

### Step 1: Update Backend Environment Variables

Update `backend/.env` (or create if doesn't exist):
```env
PORT=10000
AI_API_URL=https://your-ai-service.onrender.com
```

Replace `https://your-ai-service.onrender.com` with your actual Render AI URL!

### Step 2: Create Render Web Service for Backend

1. Click **"New +"** → **"Web Service"**
2. Connect same GitHub repo
3. **Settings:**
   - **Name**: `resume-analyzer-backend`
   - **Region**: Same as AI service
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

4. **Environment Variables**:
   ```
   NODE_VERSION=18
   AI_API_URL=https://your-ai-service.onrender.com
   PORT=10000
   ```

5. Click **"Create Web Service"**

6. Your Backend API: `https://resume-analyzer-backend.onrender.com`

---

## 3️⃣ Deploy Frontend on Vercel

### Step 1: Update Frontend Environment

Create/update `frontend/.env.production`:
```env
VITE_API_URL=https://resume-analyzer-backend.onrender.com
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click **"Add New"** → **"Project"**
4. Import your GitHub repo: `AI-Resume-Analyser`
5. **Settings:**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

6. **Environment Variables**:
   ```
   VITE_API_URL=https://resume-analyzer-backend.onrender.com
   ```

7. Click **"Deploy"**

8. Your Frontend URL: `https://your-app.vercel.app`

---

## 📋 Deployment Checklist

### Before Deploying:
- [ ] AI model trained locally
- [ ] Trained models committed to git (or plan to train on server)
- [ ] All three parts pushed to GitHub
- [ ] Environment variables ready

### Deployment Order:
1. [ ] Deploy AI Model on Render (get URL)
2. [ ] Deploy Backend on Render (use AI URL)
3. [ ] Deploy Frontend on Vercel (use Backend URL)

### After Deployment:
- [ ] Test AI API: `https://your-ai.onrender.com/health`
- [ ] Test Backend: `https://your-backend.onrender.com/api/health`
- [ ] Test Frontend: Upload a resume and analyze

---

## 🔧 Troubleshooting

### AI Service Issues

**"Model not found" error:**
- Train the model on Render using Shell
- Or commit trained models to git

**"Out of memory" error:**
- Upgrade to paid Render plan
- Or reduce dataset size in training

**NLTK data not found:**
- Add this to `api.py` at the top:
```python
import nltk
nltk.download('punkt')
nltk.download('stopwords')
```

### Backend Issues

**"AI service not available":**
- Check AI_API_URL in environment variables
- Verify AI service is running on Render
- Check AI service logs

**CORS errors:**
- Ensure flask-cors is installed
- Check CORS configuration in api.py

### Frontend Issues

**"Network Error" or "Failed to fetch":**
- Check VITE_API_URL is correct
- Verify backend is running
- Check browser console for CORS errors

**"Cannot find module" errors:**
- Delete `node_modules` and reinstall
- Check package.json is correct

---

## 💡 Free Tier Limitations

### Render Free Tier:
- ⚠️ **Services sleep after 15 minutes of inactivity**
- First request after sleep takes 30-60 seconds
- 750 hours/month per service (enough for 2 services running 24/7)
- 512 MB RAM (may struggle with large ML models)

### Vercel Free Tier:
- ✅ Always on (no sleeping)
- 100 GB bandwidth/month
- Unlimited sites

### Solutions for Sleeping Services:
1. **UptimeRobot**: Ping services every 5 minutes to keep them awake
2. **Upgrade to Paid**: $7/month per service on Render
3. **Railway**: Alternative with better free tier (500 hours)

---

## 🎯 Alternative: Deploy AI on Railway

Railway has better free tier for Python apps:

1. Go to https://railway.app
2. Sign up with GitHub
3. **"New Project"** → **"Deploy from GitHub repo"**
4. Select `AI-Resume-Analyser`
5. **Settings:**
   - **Root Directory**: `/ai-model`
   - **Start Command**: `gunicorn api:app`
   - **Add PORT variable**: Railway auto-provides this

Railway advantages:
- Better performance for ML models
- $5 free credit monthly
- Faster cold starts

---

## 📊 Cost Comparison

### All Free (with limitations):
- Vercel: Free ✅
- Render AI: Free (sleeps)
- Render Backend: Free (sleeps)
- **Total: $0/month** ⚠️ Services sleep

### Recommended for Production:
- Vercel: Free ✅
- Render AI: $7/month (always on)
- Render Backend: $7/month (always on)
- **Total: $14/month** ✅ Always available

### Budget Option:
- Vercel: Free ✅
- Railway AI + Backend: $5-10/month
- **Total: $5-10/month** ✅ Good performance

---

## 🔗 Final URLs

After deployment, you'll have:

```
Frontend:  https://ai-resume-analyzer.vercel.app
Backend:   https://resume-analyzer-backend.onrender.com
AI API:    https://ai-resume-analyzer-api.onrender.com
```

Update these in your README.md!

---

## 🚀 Quick Deploy Commands

```bash
# 1. Commit everything
git add .
git commit -m "Prepare for deployment"
git push origin main

# 2. Deploy AI on Render (via dashboard)
# 3. Deploy Backend on Render (via dashboard)
# 4. Deploy Frontend on Vercel (via dashboard)
```

---

## 📱 Testing Deployed App

```bash
# Test AI API
curl https://your-ai-service.onrender.com/health

# Test Backend
curl https://your-backend.onrender.com/api/health

# Test Frontend
# Open in browser: https://your-app.vercel.app
```

---

## ✅ Success!

Once all three are deployed and working:
1. Share the Vercel URL with friends
2. Add to your portfolio
3. Update your LinkedIn
4. Star the repo on GitHub! ⭐

---

**Need help?** Check the logs:
- Render: Service → Logs tab
- Vercel: Deployment → Function logs
