# 🚀 Quick Start Guide - AI Resume Analyzer

## Complete Setup in 5 Steps

### Step 1: Install Backend Dependencies
```powershell
cd backend
npm install
```

This installs: Express, Multer, CORS, Axios, Form-Data

---

### Step 2: Setup Python AI Environment
```powershell
cd ..\ai-model

# Create virtual environment
python -m venv venv

# Activate it
.\venv\Scripts\activate

# Install AI dependencies
pip install -r requirements.txt
```

**Download NLTK data** (required first time):
```powershell
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords')"
```

---

### Step 3: Train the AI Model
```powershell
# Make sure you're in ai-model folder and venv is activated
python model.py
```

When prompted "Do you want to train the model? (yes/no):", type **yes**

**Training takes 5-10 minutes** and will:
- Load 2400+ resumes from 24 job categories
- Extract text from PDFs
- Train Naive Bayes classifier
- Save model to `trained_models/` folder

You'll see output like:
```
Loading training data...
Processing ENGINEERING resumes...
Processing IT resumes...
...
Training complete! Model saved.
```

---

### Step 4: Start the Servers

**Terminal 1 - Python AI API:**
```powershell
cd ai-model
.\venv\Scripts\activate
python api.py
```

You should see:
```
AI Resume Analyzer API Server
Server running on: http://localhost:5001
```

**Terminal 2 - Node.js Backend:**
```powershell
cd backend
npm start
```

You should see:
```
Server is running on http://localhost:5000
```

**Terminal 3 - React Frontend:**
```powershell
cd frontend
npm run dev
```

You should see:
```
VITE ready in XXXms
Local: http://localhost:5173
```

---

### Step 5: Test the Application

1. Open browser: **http://localhost:5173**
2. Upload a PDF resume
3. (Optional) Paste a job description
4. Click "Analyze Resume"
5. View detailed AI analysis!

---

## 🔍 How It Works

### The Flow:
```
User uploads PDF → React Frontend (port 5173)
                        ↓
                  Node.js Backend (port 5000)
                        ↓
                  Python AI API (port 5001)
                        ↓
                  AI analyzes resume
                        ↓
                  Results flow back to user
```

### What the AI Does:

1. **Extracts text** from PDF using PyPDF2
2. **Cleans text** (removes special characters, extra spaces)
3. **Extracts skills** (50+ technical skills, 15+ soft skills)
4. **Calculates ATS score** based on:
   - Resume length (1-2 pages optimal)
   - Skills found
   - Section structure
   - Achievements
   - Keywords
5. **Predicts job category** using Naive Bayes (24 categories)
6. **Generates suggestions** for improvement

---

## 📊 What You'll See

### Main Stats (4 Cards):
- **ATS Score** (0-100)
- **Job Match %** (based on job description if provided)
- **Skills Found** (count)
- **Suggestions** (count)

### Detailed Categories (4 Cards):
- Format & Structure
- Content Quality
- Experience Relevance
- Skills Match

### 5 Detailed Sections (Accordions):
1. **Key Strengths** - What your resume does well
2. **Areas for Improvement** - What to fix
3. **Keywords Analysis** - Which keywords match/missing
4. **Skills Breakdown** - Technical, soft skills with levels
5. **Action Items** - Priority tasks with examples

---

## 🛠 Troubleshooting

### "AI service is not available"
**Problem:** Python AI server not running
**Solution:** 
```powershell
cd ai-model
.\venv\Scripts\activate
python api.py
```

### "Model not found" error
**Problem:** AI model not trained yet
**Solution:**
```powershell
cd ai-model
.\venv\Scripts\activate
python model.py
# Type 'yes' when prompted
```

### "Import errors" in Python
**Problem:** Dependencies not installed
**Solution:**
```powershell
cd ai-model
.\venv\Scripts\activate
pip install -r requirements.txt
```

### "NLTK data not found"
**Problem:** NLTK datasets not downloaded
**Solution:**
```powershell
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords')"
```

### Backend can't reach Python AI
**Problem:** Wrong port or AI not running
**Solution:** Check that Python API shows "Server running on: http://localhost:5001"

---

## 🎯 Testing Tips

### Test with different resumes:
- Engineering resume → Should detect technical skills
- HR resume → Should detect soft skills
- Various formats → Test ATS scoring

### Test with job descriptions:
- Include specific keywords
- See how match percentage changes
- Notice keyword matching improvements

### Check different scenarios:
- No job description → General analysis
- With job description → Targeted matching
- Various PDF formats → Extraction quality

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `ai-model/model.py` | Main AI logic (650+ lines) |
| `ai-model/api.py` | Flask API wrapper |
| `ai-model/trained_models/` | Saved AI models |
| `backend/server.js` | Node.js API server |
| `frontend/src/App.jsx` | React main component |

---

## 🔄 Development Workflow

### Making changes to AI:
1. Edit `model.py`
2. Restart Python API: `python api.py`
3. Test with frontend

### Making changes to backend:
1. Edit `server.js`
2. Server auto-restarts (nodemon)
3. Test with frontend

### Making changes to frontend:
1. Edit React components
2. Vite hot-reloads automatically
3. See changes instantly

---

## 📚 Next Steps

1. **Read TRAINING_GUIDE.md** for deep dive into AI concepts
2. **Experiment with model parameters** in `model.py`
3. **Add more skills** to skill databases
4. **Customize scoring algorithm** for your needs
5. **Deploy to production** (separate guide needed)

---

## ✅ Checklist

Before asking for help, verify:
- [ ] Python virtual environment activated
- [ ] All dependencies installed (`pip list` shows packages)
- [ ] NLTK data downloaded
- [ ] AI model trained (check `trained_models/` folder exists)
- [ ] Python API running on port 5001
- [ ] Node.js backend running on port 5000
- [ ] React frontend running on port 5173
- [ ] All three terminals are active
- [ ] No error messages in any terminal

---

## 🎓 Understanding the AI

**What is Naive Bayes?**
- A probabilistic classifier
- Predicts job category based on resume content
- Trained on 2400+ real resumes

**What is TF-IDF?**
- Converts text to numbers
- Identifies important words
- Used for classification

**What is ATS Scoring?**
- Simulates how Applicant Tracking Systems score resumes
- Checks: length, skills, sections, achievements, keywords
- Range: 0-100 (higher is better)

See **TRAINING_GUIDE.md** for detailed explanations!

---

## 💡 Pro Tips

1. **Train on your own data:** Replace datasets with industry-specific resumes
2. **Customize skills:** Add skills relevant to your field in `model.py`
3. **Adjust scoring:** Modify `calculate_ats_score()` weights
4. **Add features:** Extend AI with grammar checking, formatting analysis
5. **Monitor performance:** Check model accuracy with test data

---

## 🆘 Getting Help

If stuck, check:
1. Terminal error messages (most informative!)
2. Browser console (F12)
3. Network tab (check API calls)
4. This QUICKSTART.md
5. TRAINING_GUIDE.md

**Common fix:** Restart all three servers!

---

**You're all set! 🎉**

Upload a resume and see your AI in action!
