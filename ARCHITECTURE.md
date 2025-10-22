# System Architecture Diagram

```
                        AI RESUME ANALYZER SYSTEM
                        =========================

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                          USER LAYER                             ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                                │
                    ┌───────────┴───────────┐
                    │   Web Browser         │
                    │   localhost:5173      │
                    │                       │
                    │   • Upload Resume     │
                    │   • View Results      │
                    │   • Beautiful UI      │
                    └───────────┬───────────┘
                                │
                                │ HTTP Request
                                │ (FormData: PDF + Job Description)
                                │
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                      PRESENTATION LAYER                         ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                  ┃
┃              ┌──────────────────────────────────┐               ┃
┃              │  REACT FRONTEND (Vite)           │               ┃
┃              │  Port: 5173                      │               ┃
┃              ├──────────────────────────────────┤               ┃
┃              │                                  │               ┃
┃              │  📁 Components:                  │               ┃
┃              │  • App.jsx                       │               ┃
┃              │  • UploadSection.jsx             │               ┃
┃              │  • StatsCards.jsx                │               ┃
┃              │  • AnalysisAccordion.jsx         │               ┃
┃              │  • CursorBlob.jsx                │               ┃
┃              │                                  │               ┃
┃              │  🎨 Features:                    │               ┃
┃              │  • Dark theme                    │               ┃
┃              │  • Drag-and-drop upload          │               ┃
┃              │  • Framer Motion animations      │               ┃
┃              │  • Tailwind CSS styling          │               ┃
┃              │  • Cursor blob effect            │               ┃
┃              │                                  │               ┃
┃              └─────────────┬────────────────────┘               ┃
┃                            │                                     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┿━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                             │
                             │ Axios POST /api/analyze
                             │ (multipart/form-data)
                             │
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┿━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                      API LAYER                                  ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━┿━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                            │                                     ┃
┃              ┌─────────────▼────────────────┐                   ┃
┃              │  NODE.JS BACKEND (Express)   │                   ┃
┃              │  Port: 5000                  │                   ┃
┃              ├──────────────────────────────┤                   ┃
┃              │                              │                   ┃
┃              │  📡 Endpoints:               │                   ┃
┃              │  • GET  /                    │                   ┃
┃              │  • GET  /api/health          │                   ┃
┃              │  • POST /api/analyze         │                   ┃
┃              │                              │                   ┃
┃              │  🔧 Functions:               │                   ┃
┃              │  • Receive PDF upload        │                   ┃
┃              │  • Validate file type        │                   ┃
┃              │  • Forward to Python AI      │                   ┃
┃              │  • Handle errors             │                   ┃
┃              │  • Clean up temp files       │                   ┃
┃              │                              │                   ┃
┃              │  📦 Tech:                    │                   ┃
┃              │  • Express 5.1.0             │                   ┃
┃              │  • Multer (file upload)      │                   ┃
┃              │  • Axios (HTTP client)       │                   ┃
┃              │  • Form-Data                 │                   ┃
┃              │                              │                   ┃
┃              └─────────────┬────────────────┘                   ┃
┃                            │                                     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┿━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                             │
                             │ HTTP POST localhost:5001/analyze
                             │ (PDF file + optional job description)
                             │
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┿━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                      AI LAYER                                   ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━┿━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                            │                                     ┃
┃              ┌─────────────▼────────────────┐                   ┃
┃              │  PYTHON AI API (Flask)       │                   ┃
┃              │  Port: 5001                  │                   ┃
┃              ├──────────────────────────────┤                   ┃
┃              │                              │                   ┃
┃              │  api.py                      │                   ┃
┃              │  • Flask REST API            │                   ┃
┃              │  • CORS enabled              │                   ┃
┃              │  • Endpoints:                │                   ┃
┃              │    - POST /analyze           │                   ┃
┃              │    - GET  /health            │                   ┃
┃              │    - GET  /skills            │                   ┃
┃              │                              │                   ┃
┃              └─────────────┬────────────────┘                   ┃
┃                            │                                     ┃
┃                            │ Calls analyze_resume()             ┃
┃                            │                                     ┃
┃              ┌─────────────▼────────────────────────────────┐  ┃
┃              │  RESUME ANALYZER (model.py)                  │  ┃
┃              │  650+ lines of AI code                       │  ┃
┃              ├──────────────────────────────────────────────┤  ┃
┃              │                                              │  ┃
┃              │  🤖 AI Pipeline:                            │  ┃
┃              │                                              │  ┃
┃              │  1️⃣ extract_text_from_pdf()                 │  ┃
┃              │     📄 PyPDF2 extracts text from PDF        │  ┃
┃              │                                              │  ┃
┃              │  2️⃣ clean_text()                            │  ┃
┃              │     🧹 Remove special chars, lowercase      │  ┃
┃              │                                              │  ┃
┃              │  3️⃣ extract_skills()                        │  ┃
┃              │     🔍 Pattern match 50+ tech skills        │  ┃
┃              │     🔍 Pattern match 15+ soft skills        │  ┃
┃              │                                              │  ┃
┃              │  4️⃣ calculate_ats_score()                   │  ┃
┃              │     📊 5 factors = 100 points:              │  ┃
┃              │        • Length (20 pts)                    │  ┃
┃              │        • Skills (30 pts)                    │  ┃
┃              │        • Sections (20 pts)                  │  ┃
┃              │        • Achievements (15 pts)              │  ┃
┃              │        • Keywords (15 pts)                  │  ┃
┃              │                                              │  ┃
┃              │  5️⃣ predict_category()                      │  ┃
┃              │     🧠 TF-IDF vectorization (5000 features) │  ┃
┃              │     🧠 Naive Bayes classification           │  ┃
┃              │     🧠 24 job categories                    │  ┃
┃              │                                              │  ┃
┃              │  6️⃣ generate_suggestions()                  │  ┃
┃              │     💡 Smart recommendations                │  ┃
┃              │                                              │  ┃
┃              │  7️⃣ Return JSON response                    │  ┃
┃              │     📤 Complete analysis results            │  ┃
┃              │                                              │  ┃
┃              └──────────────────────────────────────────────┘  ┃
┃                                                                  ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                             │
                             │
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┿━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                      DATA LAYER                                 ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━┿━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                            │                                     ┃
┃         ┌──────────────────▼───────────────────┐                ┃
┃         │  TRAINED ML MODELS                   │                ┃
┃         │  trained_models/                     │                ┃
┃         ├──────────────────────────────────────┤                ┃
┃         │                                      │                ┃
┃         │  📦 resume_classifier.pkl            │                ┃
┃         │     • Naive Bayes model              │                ┃
┃         │     • Trained on 2400+ resumes       │                ┃
┃         │     • 24 job categories              │                ┃
┃         │     • ~50-100 MB size                │                ┃
┃         │                                      │                ┃
┃         │  📦 tfidf_vectorizer.pkl             │                ┃
┃         │     • TF-IDF transformer             │                ┃
┃         │     • 5000 features                  │                ┃
┃         │     • Trained vocabulary             │                ┃
┃         │                                      │                ┃
┃         └──────────────────────────────────────┘                ┃
┃                                                                  ┃
┃         ┌────────────────────────────────────────────┐          ┃
┃         │  TRAINING DATASET                          │          ┃
┃         │  datasets/data/data/                       │          ┃
┃         ├────────────────────────────────────────────┤          ┃
┃         │                                            │          ┃
┃         │  📂 24 Job Category Folders:               │          ┃
┃         │     • ENGINEERING/          (100+ PDFs)    │          ┃
┃         │     • INFORMATION-TECHNOLOGY/ (100+ PDFs)  │          ┃
┃         │     • HR/                   (100+ PDFs)    │          ┃
┃         │     • FINANCE/              (100+ PDFs)    │          ┃
┃         │     • HEALTHCARE/           (100+ PDFs)    │          ┃
┃         │     • SALES/                (100+ PDFs)    │          ┃
┃         │     • ... (18 more categories)             │          ┃
┃         │                                            │          ┃
┃         │  📊 Total: 2400+ PDF resumes               │          ┃
┃         │  📊 Source: Kaggle                         │          ┃
┃         │                                            │          ┃
┃         └────────────────────────────────────────────┘          ┃
┃                                                                  ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


═══════════════════════════════════════════════════════════════════
                          DATA FLOW EXAMPLE
═══════════════════════════════════════════════════════════════════

USER ACTION:
   Uploads "software_engineer_resume.pdf"
            │
            ▼
FRONTEND (React):
   • Validates file is PDF
   • Creates FormData object
   • Sends POST to localhost:5000/api/analyze
            │
            ▼
BACKEND (Node.js):
   • Receives multipart/form-data
   • Saves to uploads/temp.pdf
   • Forwards to localhost:5001/analyze
            │
            ▼
AI API (Flask):
   • Receives PDF file
   • Calls model.analyze_resume()
            │
            ▼
AI MODEL (Python):
   ┌─────────────────────────────────────────┐
   │ Step 1: Extract Text                    │
   │ Input:  PDF file                        │
   │ Output: "Software Engineer with..."     │
   └─────────────────────────────────────────┘
            │
            ▼
   ┌─────────────────────────────────────────┐
   │ Step 2: Clean Text                      │
   │ Input:  "Software Engineer with..."     │
   │ Output: "software engineer with..."     │
   └─────────────────────────────────────────┘
            │
            ▼
   ┌─────────────────────────────────────────┐
   │ Step 3: Extract Skills                  │
   │ Tech:   ["Python", "React", "Docker"]   │
   │ Soft:   ["Communication", "Leadership"] │
   └─────────────────────────────────────────┘
            │
            ▼
   ┌─────────────────────────────────────────┐
   │ Step 4: Calculate ATS Score             │
   │ Length:       18/20 (good)              │
   │ Skills:       28/30 (excellent)         │
   │ Sections:     16/20 (good)              │
   │ Achievements: 12/15 (moderate)          │
   │ Keywords:     10/15 (needs work)        │
   │ TOTAL:        84/100                    │
   └─────────────────────────────────────────┘
            │
            ▼
   ┌─────────────────────────────────────────┐
   │ Step 5: Predict Category                │
   │ TF-IDF:  [0.31, 0.42, 0.0, 0.18, ...]   │
   │ Predict: ENGINEERING (85% confidence)   │
   └─────────────────────────────────────────┘
            │
            ▼
   ┌─────────────────────────────────────────┐
   │ Step 6: Generate Suggestions            │
   │ • Add more quantifiable achievements    │
   │ • Include keywords from job description │
   │ • Add certifications section            │
   └─────────────────────────────────────────┘
            │
            ▼
   ┌─────────────────────────────────────────┐
   │ Step 7: Return JSON                     │
   │ {                                       │
   │   "score": 84,                          │
   │   "predicted_category": "ENGINEERING",  │
   │   "skillsFound": 15,                    │
   │   "suggestions": 5,                     │
   │   "details": {...}                      │
   │ }                                       │
   └─────────────────────────────────────────┘
            │
            ▼
AI API (Flask):
   • Returns JSON to Node.js backend
            │
            ▼
BACKEND (Node.js):
   • Deletes temp file
   • Returns JSON to React frontend
            │
            ▼
FRONTEND (React):
   • Parses JSON response
   • Updates state
   • Renders results:
      - 4 main stat cards
      - 4 detailed category cards
      - 5 accordion sections
            │
            ▼
USER SEES:
   ✅ ATS Score: 84/100
   ✅ Category: Engineering
   ✅ Skills: 15 found
   ✅ Detailed analysis with suggestions


═══════════════════════════════════════════════════════════════════
                        TECHNOLOGY STACK
═══════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND                                 │
├─────────────────────────────────────────────────────────────────┤
│  React 19.1.1          - UI library                             │
│  Vite 6.x              - Build tool & dev server                │
│  Tailwind CSS 4.1.15   - Utility-first CSS                      │
│  Framer Motion 12.23.24 - Animation library                     │
│  Axios                 - HTTP client                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        BACKEND                                  │
├─────────────────────────────────────────────────────────────────┤
│  Node.js               - JavaScript runtime                     │
│  Express 5.1.0         - Web framework                          │
│  Multer 2.0.2          - File upload middleware                 │
│  Axios                 - HTTP client                            │
│  Form-Data             - Multipart form builder                 │
│  CORS                  - Cross-origin resource sharing          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                          AI / ML                                │
├─────────────────────────────────────────────────────────────────┤
│  Python 3.8+           - Programming language                   │
│  Scikit-learn          - Machine learning library               │
│  NLTK                  - Natural language processing            │
│  PyPDF2                - PDF text extraction                    │
│  Pandas                - Data manipulation                      │
│  NumPy                 - Numerical computing                    │
│  Flask                 - Web framework for API                  │
│  Flask-CORS            - CORS support for Flask                 │
└─────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════
                          FILE STRUCTURE
═══════════════════════════════════════════════════════════════════

AI/
│
├── frontend/                    ← React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── UploadSection.jsx      (Upload UI)
│   │   │   ├── StatsCards.jsx         (4 + 4 cards)
│   │   │   ├── AnalysisAccordion.jsx  (5 sections)
│   │   │   ├── CursorBlob.jsx         (Cursor effect)
│   │   │   └── Navbar.jsx             (Header)
│   │   ├── services/
│   │   │   └── api.js                 (Axios service)
│   │   ├── App.jsx                    (Main component)
│   │   └── main.jsx                   (Entry point)
│   └── package.json
│
├── backend/                     ← Node.js API
│   ├── server.js                (Express server)
│   ├── uploads/                 (Temp file storage)
│   └── package.json
│
├── ai-model/                    ← Python AI
│   ├── model.py                 (650+ lines AI)
│   ├── api.py                   (Flask API wrapper)
│   ├── test.py                  (Test script)
│   ├── requirements.txt         (Dependencies)
│   ├── trained_models/          (Saved models)
│   │   ├── resume_classifier.pkl
│   │   └── tfidf_vectorizer.pkl
│   └── datasets/
│       └── data/data/           (2400+ PDFs)
│           ├── ENGINEERING/
│           ├── INFORMATION-TECHNOLOGY/
│           ├── HR/
│           └── ... (21 more)
│
├── README.md                    ← Complete docs
├── QUICKSTART.md                ← Quick setup guide
├── CHECKLIST.md                 ← Step-by-step checklist
├── PROJECT_SUMMARY.md           ← This file
├── TRAINING_GUIDE.md            ← AI concepts explained
└── start-servers.ps1            ← Startup script


═══════════════════════════════════════════════════════════════════
                        PORT ASSIGNMENTS
═══════════════════════════════════════════════════════════════════

5173  →  React Frontend (Vite dev server)
5000  →  Node.js Backend (Express API)
5001  →  Python AI API (Flask server)


═══════════════════════════════════════════════════════════════════
                      STARTUP SEQUENCE
═══════════════════════════════════════════════════════════════════

Terminal 1:  cd ai-model
             .\venv\Scripts\activate
             python api.py
             ✓ AI ready on port 5001

Terminal 2:  cd backend
             npm start
             ✓ API ready on port 5000

Terminal 3:  cd frontend
             npm run dev
             ✓ UI ready on port 5173

Browser:     http://localhost:5173
             ✓ Upload resume and analyze!


═══════════════════════════════════════════════════════════════════

                    🎉 SYSTEM READY TO USE! 🎉

═══════════════════════════════════════════════════════════════════
```
