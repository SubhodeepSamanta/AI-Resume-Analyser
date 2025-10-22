# ✅ Setup Checklist

Follow this checklist step-by-step to get your AI Resume Analyzer running!

---

## Phase 1: Backend Setup ✅ DONE

- [x] Backend dependencies installed
- [x] `axios` and `form-data` packages added
- [x] Server.js configured to call Python AI
- [x] Health check endpoint added
- [x] File upload endpoint ready

✅ **Backend is ready to use!**

---

## Phase 2: Frontend Setup ✅ DONE

- [x] React + Vite + Tailwind configured
- [x] All components created (Upload, Stats, Accordion, Cursor)
- [x] API service configured
- [x] Beautiful dark theme applied
- [x] Animations with Framer Motion
- [x] Color scheme updated (blue/purple/pink)

✅ **Frontend is ready to use!**

---

## Phase 3: AI Model Setup ⏳ YOU DO THIS

### Step 1: Create Python Virtual Environment

```powershell
cd ai-model
python -m venv venv
.\venv\Scripts\activate
```

**Expected output:**
```
(venv) PS C:\Users\USER\Desktop\Projects\AI\ai-model>
```

- [ ] Virtual environment created
- [ ] Virtual environment activated (you see `(venv)` in prompt)

---

### Step 2: Install Python Dependencies

```powershell
pip install -r requirements.txt
```

**This will install:**
- numpy, pandas (data processing)
- scikit-learn (machine learning)
- nltk (natural language processing)
- PyPDF2 (PDF reading)
- flask, flask-cors (web API)
- and more...

**Expected:** Takes 2-3 minutes, installs ~20 packages

- [ ] All packages installed successfully
- [ ] No error messages

---

### Step 3: Download NLTK Data

```powershell
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords')"
```

**Expected output:**
```
[nltk_data] Downloading package punkt...
[nltk_data] Downloading package stopwords...
```

- [ ] `punkt` downloaded
- [ ] `stopwords` downloaded

---

### Step 4: Train the AI Model

```powershell
python model.py
```

**You'll see:**
```
==========================================================
AI Resume Analyzer - Training System
==========================================================

Would you like to:
1. Train a new model
2. Test existing model
3. Exit

Choose option (1/2/3): 
```

**Type:** `1` (then press Enter)

**Then it asks:**
```
Do you want to train the model? (yes/no):
```

**Type:** `yes` (then press Enter)

**Expected process (5-10 minutes):**
```
Loading training data from datasets/data/data/...
Processing ENGINEERING resumes... ✓ 100 files
Processing INFORMATION-TECHNOLOGY resumes... ✓ 100 files
Processing HR resumes... ✓ 100 files
... (continues for all 24 categories)

Training classifier...
Converting text to TF-IDF features (5000 features)...
Training Naive Bayes model...

Training complete!
Saving model to trained_models/resume_classifier.pkl... ✓
Saving vectorizer to trained_models/tfidf_vectorizer.pkl... ✓

Model saved successfully!
```

- [ ] Training started
- [ ] All 24 categories processed
- [ ] Model trained successfully
- [ ] Files saved to `trained_models/` folder
- [ ] No errors

**Verify training worked:**
- [ ] Folder `trained_models/` exists
- [ ] File `trained_models/resume_classifier.pkl` exists
- [ ] File `trained_models/tfidf_vectorizer.pkl` exists

---

### Step 5: Test the Model (Optional but Recommended)

```powershell
python test.py
```

**Expected output:**
```
==========================================================
AI Resume Analyzer - Test Script
==========================================================

1. Initializing AI Resume Analyzer...
2. Loading trained model...
   ✓ Model loaded successfully!
3. Looking for test resume...
   ✓ Found test resume: SomeResume.pdf
4. Analyzing resume with AI...

==========================================================
ANALYSIS RESULTS
==========================================================

📊 ATS Score: 85/100
🎯 Predicted Category: ENGINEERING
🔧 Skills Found: 12
💡 Suggestions: 5

... (detailed results)

✅ TEST PASSED - AI is working correctly!
```

- [ ] Test ran successfully
- [ ] AI predicted a category
- [ ] Got ATS score
- [ ] Found skills
- [ ] Generated suggestions

✅ **If test passed, AI is working!**

---

## Phase 4: Start All Servers ⏳ YOU DO THIS

You need **3 terminal windows** running simultaneously:

### Terminal 1: Python AI API

```powershell
cd ai-model
.\venv\Scripts\activate
python api.py
```

**Expected output:**
```
Loading AI Resume Analyzer...
✓ Model loaded successfully!

============================================================
AI Resume Analyzer API Server
============================================================
Server running on: http://localhost:5001
API Endpoint: POST http://localhost:5001/analyze
============================================================

* Running on http://0.0.0.0:5001
```

- [ ] AI model loaded
- [ ] Server running on port 5001
- [ ] No errors

**Leave this terminal running!**

---

### Terminal 2: Node.js Backend

```powershell
cd backend
npm start
```

**Expected output:**
```
Server is running on http://localhost:5000
```

- [ ] Server running on port 5000
- [ ] No errors

**Leave this terminal running!**

---

### Terminal 3: React Frontend

```powershell
cd frontend
npm run dev
```

**Expected output:**
```
  VITE v6.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

- [ ] Vite dev server running
- [ ] Server on port 5173
- [ ] No errors

**Leave this terminal running!**

---

## Phase 5: Test the Application 🎉

### Open in Browser

1. Open Chrome/Edge/Firefox
2. Go to: **http://localhost:5173**

**You should see:**
- [ ] Dark themed page
- [ ] "AI Resume Analyzer" title
- [ ] Upload section on the right
- [ ] Text content on the left
- [ ] Beautiful cursor blob effect following your mouse

---

### Upload a Test Resume

1. **Get a PDF resume**
   - Use your own resume (PDF format)
   - Or use one from `ai-model/datasets/data/data/ENGINEERING/` folder
   - Must be a PDF file!

2. **Upload it**
   - Click "Browse files" button
   - OR drag-and-drop the PDF onto the upload area

3. **(Optional) Add job description**
   - Paste a job description in the textarea
   - This improves matching accuracy

4. **Click "Analyze Resume"**

**Expected:**
- [ ] "Analyzing..." appears
- [ ] Takes 2-5 seconds
- [ ] Results appear below!

---

### Verify Results Appear

You should see:

**4 Main Stats Cards:**
- [ ] ATS Score (0-100)
- [ ] Match Percentage
- [ ] Skills Found
- [ ] Suggestions

**4 Detailed Category Cards:**
- [ ] Format & Structure
- [ ] Content Quality
- [ ] Experience Relevance
- [ ] Skills Match

**5 Accordion Sections (click to expand):**
- [ ] Key Strengths
- [ ] Areas for Improvement
- [ ] Keywords Analysis
- [ ] Skills Breakdown
- [ ] Action Items

✅ **If you see all of this, EVERYTHING IS WORKING!**

---

## Troubleshooting

### Issue: "AI service is not available"

**Problem:** Python AI not running

**Solution:**
1. Open new terminal
2. `cd ai-model`
3. `.\venv\Scripts\activate`
4. `python api.py`
5. Wait for "Server running on: http://localhost:5001"

---

### Issue: "Model not found" error

**Problem:** AI model not trained yet

**Solution:**
1. `cd ai-model`
2. `.\venv\Scripts\activate`
3. `python model.py`
4. Type `1` then Enter
5. Type `yes` then Enter
6. Wait 5-10 minutes for training

---

### Issue: Import errors in Python

**Problem:** Packages not installed

**Solution:**
1. `cd ai-model`
2. `.\venv\Scripts\activate`
3. `pip install -r requirements.txt`
4. Wait for installation to complete

---

### Issue: "NLTK data not found"

**Problem:** NLTK datasets not downloaded

**Solution:**
```powershell
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords')"
```

---

### Issue: Port already in use

**Problem:** Another app using the port

**Solution:**
- Frontend (5173): Close other Vite servers
- Backend (5000): Close other Node servers
- AI API (5001): Close other Python servers

Or change ports in:
- `backend/server.js` (PORT variable)
- `ai-model/api.py` (port=5001)
- `frontend/.env` (VITE_API_URL)

---

### Issue: Can't see cursor blob

**Problem:** Browser doesn't support the effect

**Solution:** Try Chrome/Edge (works best). Or it's fine - just cosmetic!

---

## Final Checklist ✅

Before celebrating, verify:

- [ ] All 3 terminals are running (AI, Backend, Frontend)
- [ ] No error messages in any terminal
- [ ] Browser shows the app at http://localhost:5173
- [ ] Can upload a PDF resume
- [ ] Analysis completes successfully
- [ ] Results show up with all sections
- [ ] Can click accordions to expand/collapse
- [ ] Cursor blob follows your mouse

## 🎉 SUCCESS!

If all boxes are checked, **CONGRATULATIONS!** 

You've successfully built and deployed a complete AI-powered ATS Resume Analyzer with:
- ✅ Beautiful React frontend
- ✅ Node.js backend API
- ✅ Your own trained AI model
- ✅ Complete end-to-end integration

### What You Built:

1. **Machine Learning Model**
   - Trained on 2400+ real resumes
   - 24 job categories
   - Naive Bayes classifier
   - TF-IDF feature extraction
   - Skill detection algorithms
   - ATS scoring system

2. **Full-Stack Application**
   - React frontend with animations
   - Node.js REST API
   - Python Flask AI service
   - File upload handling
   - Real-time analysis

3. **Professional UI/UX**
   - Dark theme
   - Smooth animations
   - Cursor effects
   - Responsive design
   - Detailed analytics display

---

## Next Steps

### Learn More
- [ ] Read TRAINING_GUIDE.md for AI concepts
- [ ] Read README.md for full documentation
- [ ] Experiment with different resumes
- [ ] Try with/without job descriptions

### Customize
- [ ] Add more skills to `model.py`
- [ ] Adjust ATS scoring weights
- [ ] Change color scheme in frontend
- [ ] Add new features

### Share
- [ ] Show to friends/classmates
- [ ] Demo to professor
- [ ] Add to portfolio
- [ ] Deploy online (Vercel, Heroku, etc.)

---

## Support

If you're still stuck:
1. Check terminal error messages carefully
2. Re-read this checklist
3. Check QUICKSTART.md
4. Check TRAINING_GUIDE.md
5. Search error messages online

---

**Good luck! You got this! 🚀**
