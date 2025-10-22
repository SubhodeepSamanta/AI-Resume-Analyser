# 🤖 AI Resume Analyzer

> **Complete ATS Resume Checker with In-House AI** - Analyze resumes using your own trained machine learning model!

![Tech Stack](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61dafb?style=for-the-badge&logo=react)
![Tech Stack](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?style=for-the-badge&logo=node.js)
![Tech Stack](https://img.shields.io/badge/AI-Python%20%2B%20Scikit--learn-3776ab?style=for-the-badge&logo=python)

An academic project that demonstrates how to build a complete ATS (Applicant Tracking System) resume checker with **your own trained AI model** - no external APIs needed!

---

## ✨ Features

### 🎯 For Users
- **Upload & Analyze** - Drag-and-drop PDF resume analysis
- **ATS Scoring** - Get 0-100 score based on industry standards
- **Job Matching** - Optional job description matching
- **Detailed Breakdown** - 4 main stats + 4 category cards
- **Actionable Insights** - 5 detailed sections with improvements
- **Beautiful UI** - Dark theme with smooth animations
- **Cursor Effect** - Professional purple/pink gradient blob

### 🤖 For the AI
- **Trained on 2400+ Resumes** - Real Kaggle dataset
- **24 Job Categories** - Engineering, IT, HR, Finance, etc.
- **50+ Technical Skills** - Automatic detection
- **15+ Soft Skills** - Leadership, communication, etc.
- **Naive Bayes Classifier** - Predicts job category
- **TF-IDF Vectorization** - Converts text to features
- **Smart Scoring Algorithm** - 5-factor ATS calculation

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.8+ 
- **Git** (to clone)

### 1️⃣ Clone & Install

```powershell
# Clone the repository
git clone <your-repo-url>
cd AI

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ..\frontend
npm install
```

### 2️⃣ Setup Python AI

```powershell
cd ..\ai-model

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\activate

# Install AI dependencies
pip install -r requirements.txt

# Download NLTK data (required first time)
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords')"
```

### 3️⃣ Train the Model

```powershell
# Make sure you're in ai-model with venv activated
python model.py
```

Type **yes** when prompted. Training takes **5-10 minutes**.

### 4️⃣ Start Everything

**Option A - Manual (3 separate terminals):**

Terminal 1:
```powershell
cd ai-model
.\venv\Scripts\activate
python api.py
```

Terminal 2:
```powershell
cd backend
npm start
```

Terminal 3:
```powershell
cd frontend
npm run dev
```

**Option B - Automated (PowerShell script):**

```powershell
.\start-servers.ps1
```

### 5️⃣ Use It!

1. Open **http://localhost:5173**
2. Upload a PDF resume
3. (Optional) Add job description
4. Click "Analyze Resume"
5. View AI analysis! 🎉

---

## 📁 Project Structure

```
AI/
├── frontend/              # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/   # UI components
│   │   │   ├── UploadSection.jsx
│   │   │   ├── StatsCards.jsx
│   │   │   ├── AnalysisAccordion.jsx
│   │   │   ├── CursorBlob.jsx
│   │   │   └── Navbar.jsx
│   │   ├── services/     # API communication
│   │   │   └── api.js
│   │   ├── App.jsx       # Main component
│   │   └── main.jsx      # Entry point
│   └── package.json
│
├── backend/               # Node.js + Express
│   ├── server.js         # API routes & file upload
│   ├── uploads/          # Temporary file storage
│   └── package.json
│
├── ai-model/              # Python Machine Learning
│   ├── model.py          # AI implementation (650+ lines)
│   ├── api.py            # Flask REST API wrapper
│   ├── test.py           # Test script
│   ├── requirements.txt  # Python dependencies
│   ├── trained_models/   # Saved AI models (after training)
│   └── datasets/         # Training data (2400+ resumes)
│       └── data/data/    # 24 job category folders
│
├── QUICKSTART.md         # Quick setup guide
├── TRAINING_GUIDE.md     # Deep dive into AI concepts
├── start-servers.ps1     # Automated startup script
└── README.md             # This file
```

---

## 🎓 How It Works

### Architecture Flow

```
┌─────────────────┐
│  User uploads   │
│   PDF Resume    │
└────────┬────────┘
         │
         v
┌─────────────────┐
│ React Frontend  │ 
│  (Port 5173)    │ ← Beautiful UI with animations
└────────┬────────┘
         │ HTTP POST
         v
┌─────────────────┐
│ Node.js Backend │
│  (Port 5000)    │ ← Handles file uploads
└────────┬────────┘
         │ HTTP POST
         v
┌─────────────────┐
│  Python AI API  │
│  (Port 5001)    │ ← Machine Learning magic
└────────┬────────┘
         │
         v
┌─────────────────────────────────────┐
│       AI Analysis Pipeline          │
├─────────────────────────────────────┤
│ 1. Extract text from PDF            │
│ 2. Clean & preprocess text          │
│ 3. Extract skills (tech + soft)     │
│ 4. Calculate ATS score (5 factors)  │
│ 5. Predict job category (24 types)  │
│ 6. Generate improvement suggestions │
│ 7. Return detailed JSON results     │
└─────────────────────────────────────┘
         │
         v
    (Results flow back up)
```

### AI Algorithm Details

**1. Text Extraction (PyPDF2)**
- Reads PDF files
- Extracts raw text
- Handles multi-page resumes

**2. Text Preprocessing**
- Converts to lowercase
- Removes special characters
- Removes extra whitespace
- Tokenization

**3. Feature Extraction (TF-IDF)**
- Converts text to numerical vectors
- 5000 features
- Captures word importance
- Used for classification

**4. Classification (Naive Bayes)**
- Trained on 2400+ resumes
- 24 job categories
- Predicts most likely category
- Provides confidence score

**5. Skill Detection**
- Pattern matching
- 50+ technical skills database
- 15+ soft skills database
- Returns matched skills

**6. ATS Scoring (0-100 points)**
- **Resume Length** (20 pts) - 1-2 pages optimal
- **Skills Found** (30 pts) - More skills = higher score
- **Section Structure** (20 pts) - Has summary, experience, etc.
- **Achievements** (15 pts) - Contains numbers/metrics
- **Keywords** (15 pts) - Matches job description

---

## 🎨 Frontend Features

### Components

**UploadSection.jsx**
- Two-column layout
- Drag-and-drop file upload
- Optional job description textarea
- File validation (PDF only)

**StatsCards.jsx**
- 4 main stat cards (score, match, skills, suggestions)
- 4 detailed category cards
- Color-coded by score (blue/purple/pink)
- Smooth animations with Framer Motion

**AnalysisAccordion.jsx**
- 5 expandable sections:
  1. Key Strengths
  2. Areas for Improvement
  3. Keywords Analysis
  4. Skills Breakdown (with progress bars)
  5. Action Items (priority-based)
- Nested cards and badges
- Interactive expand/collapse

**CursorBlob.jsx**
- Beautiful gradient effect
- Follows mouse cursor
- Dual-layer animation
- Purple/pink color scheme

### Styling
- **Tailwind CSS 4.1.15** - Utility-first styling
- **Framer Motion 12.23.24** - Smooth animations
- **Dark Theme** - Black background with colored accents
- **Responsive** - Works on all screen sizes

---

## 🔧 Backend Features

### API Endpoints

**GET /** - Health check
```json
{ "message": "AI Resume Analyzer API" }
```

**GET /api/health** - System status
```json
{
  "status": "healthy",
  "backend": "running",
  "ai": {
    "status": "healthy",
    "model_loaded": true
  }
}
```

**POST /api/analyze** - Analyze resume
- **Input:** 
  - `resume`: PDF file (multipart/form-data)
  - `jobDescription`: Optional text field
- **Output:** Full analysis JSON (see below)

### Technologies
- **Express 5.1.0** - Web framework
- **Multer 2.0.2** - File upload handling
- **Axios** - HTTP client to call Python API
- **CORS** - Cross-origin requests
- **Form-Data** - Multipart form handling

---

## 🤖 AI Model Features

### Technologies
- **Scikit-learn** - Machine learning
- **NLTK** - Natural language processing
- **PyPDF2** - PDF text extraction
- **Pandas** - Data manipulation
- **NumPy** - Numerical operations
- **Flask** - REST API framework

### Output Format

```json
{
  "score": 85,
  "matchPercentage": 92,
  "skillsFound": 18,
  "suggestions": 5,
  "predicted_category": "INFORMATION-TECHNOLOGY",
  "detailedStats": [
    {
      "title": "Format & Structure",
      "score": 88,
      "status": "Excellent",
      "description": "Clean formatting with proper sections"
    }
    // ... 3 more categories
  ],
  "details": {
    "strengths": ["Strong technical background", "..."],
    "improvements": ["Add more metrics", "..."],
    "keywords": [
      { "word": "React", "match": true },
      { "word": "Python", "match": false }
    ],
    "skills": [
      {
        "category": "Frontend Development",
        "items": [
          { "name": "React", "level": 85 },
          { "name": "JavaScript", "level": 90 }
        ]
      }
    ],
    "actionItems": [
      {
        "priority": "High",
        "title": "Add Quantifiable Achievements",
        "description": "Replace generic statements...",
        "example": "Improved performance by 40%"
      }
    ]
  }
}
```

---

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Fast setup guide with troubleshooting
- **[TRAINING_GUIDE.md](ai-model/TRAINING_GUIDE.md)** - Deep dive into AI concepts
- **Code Comments** - Extensive inline documentation

---

## 🧪 Testing

### Test the AI Model

```powershell
cd ai-model
.\venv\Scripts\activate
python test.py
```

This will:
- Load the trained model
- Find a sample resume
- Analyze it
- Display detailed results
- Verify AI is working correctly

### Test the Backend

```powershell
cd backend
npm start
```

Visit: http://localhost:5000/api/health

### Test the Frontend

```powershell
cd frontend
npm run dev
```

Visit: http://localhost:5173

---

## 🎯 Use Cases

### For Students
- Academic project demonstrating full-stack + AI
- Learn machine learning with real data
- Understand end-to-end application architecture
- Portfolio piece with deployed demo

### For Job Seekers
- Analyze your own resume before applying
- Get actionable improvement suggestions
- Optimize for ATS systems
- Compare against job descriptions

### For Recruiters
- Batch analyze multiple resumes
- Standardized scoring system
- Extract skills automatically
- Sort candidates by match percentage

---

## 🚧 Future Enhancements

### AI Improvements
- [ ] Add more job categories (50+)
- [ ] Train on larger dataset (10,000+ resumes)
- [ ] Support DOCX format
- [ ] Grammar and spelling check
- [ ] Formatting analysis (font, spacing, etc.)
- [ ] Experience level detection (entry/mid/senior)

### Features
- [ ] User accounts and history
- [ ] Resume builder/editor
- [ ] Resume comparison tool
- [ ] Export reports to PDF
- [ ] Email analysis results
- [ ] Batch upload (multiple resumes)

### Technical
- [ ] Add Redis for caching
- [ ] Database for storing analyses
- [ ] Docker containerization
- [ ] Kubernetes deployment
- [ ] CI/CD pipeline
- [ ] Unit tests and E2E tests

---

## 🛠 Troubleshooting

### Common Issues

**"Module not found" in Python**
```powershell
cd ai-model
.\venv\Scripts\activate
pip install -r requirements.txt
```

**"AI service is not available"**
```powershell
# Start Python API
cd ai-model
.\venv\Scripts\activate
python api.py
```

**"Model not found"**
```powershell
# Train the model
cd ai-model
.\venv\Scripts\activate
python model.py
# Type 'yes' when prompted
```

**Backend/Frontend connection issues**
- Check all three servers are running
- Verify ports: 5173 (frontend), 5000 (backend), 5001 (AI)
- Check firewall settings

See **[QUICKSTART.md](QUICKSTART.md)** for detailed troubleshooting!

---

## 📝 License

This is an academic project. Feel free to use for educational purposes.

---

## 👨‍💻 Development

### Prerequisites for Development
- VS Code (recommended)
- Node.js 18+
- Python 3.8+
- Git

### Setup Development Environment

```powershell
# Install all dependencies
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
cd ai-model && pip install -r requirements.txt && cd ..

# Run development servers
.\start-servers.ps1
```

### Making Changes

**Frontend:**
- Edit files in `frontend/src/`
- Vite hot-reloads automatically
- Changes appear instantly

**Backend:**
- Edit `backend/server.js`
- Nodemon restarts automatically
- Check terminal for errors

**AI Model:**
- Edit `ai-model/model.py`
- Restart Flask API manually
- Test with `python test.py`

---

## 📊 Dataset Information

**Source:** Kaggle Resume Dataset

**Structure:**
- 24 job categories
- 2400+ PDF resumes (~100 per category)
- Real-world resume samples
- Diverse formats and styles

**Categories:**
- ENGINEERING
- INFORMATION-TECHNOLOGY
- HR
- FINANCE
- HEALTHCARE
- SALES
- MARKETING
- DESIGNER
- CONSULTANT
- TEACHER
- (and 14 more...)

---

## 🎉 Acknowledgments

- **Kaggle** - For the resume dataset
- **Scikit-learn** - ML library
- **React Team** - Frontend framework
- **Flask** - Python web framework
- **Framer Motion** - Animation library

---

## 📧 Contact

For questions or issues, please open a GitHub issue.

---

## 🌟 Star This Repo!

If you found this project helpful, please give it a star ⭐

---

**Built with ❤️ for educational purposes**
