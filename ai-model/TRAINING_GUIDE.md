# AI Resume Analyzer - Complete Training Guide

## 📚 **What This AI Does**

This AI system analyzes resumes and provides:
1. **ATS Score** - How well the resume passes Applicant Tracking Systems
2. **Job Category Classification** - Identifies the job field (Engineering, HR, etc.)
3. **Skill Extraction** - Finds technical and soft skills
4. **Keyword Matching** - Compares with job descriptions
5. **Improvement Suggestions** - Actionable recommendations

---

## 🧠 **How The AI Works**

### **Step 1: Text Extraction**
- Reads PDF files using PyPDF2
- Extracts all text content from resumes

### **Step 2: Text Preprocessing**
- Converts to lowercase
- Removes special characters, URLs, emails
- Cleans and normalizes text

### **Step 3: Feature Extraction (TF-IDF)**
- **TF-IDF** = Term Frequency - Inverse Document Frequency
- Converts text into numerical features
- Important words get higher scores
- Common words get lower scores
- Example: "Python" appears in 10% of resumes → High TF-IDF score

### **Step 4: Machine Learning Classification**
- **Algorithm**: Naive Bayes Classifier
- **Training**: Learns patterns from 2400+ resumes across 24 job categories
- **Prediction**: Classifies new resumes into job categories
- **Accuracy**: Typically 85-90%

### **Step 5: Skill Analysis**
- Searches for 50+ technical skills (Python, React, AWS, etc.)
- Searches for 15+ soft skills (Leadership, Communication, etc.)
- Counts and categorizes found skills

### **Step 6: ATS Scoring**
Scores based on 5 factors (100 points total):
1. **Resume Length** (20 points) - Optimal: 300-800 words
2. **Skills Present** (25 points) - More skills = Higher score
3. **Section Headings** (15 points) - Experience, Education, Skills, etc.
4. **Quantifiable Achievements** (20 points) - Numbers, percentages
5. **Action Keywords** (20 points) - Achieved, developed, implemented

### **Step 7: Suggestion Generation**
- Analyzes weak areas
- Generates specific improvements
- Provides actionable recommendations

---

## 🚀 **Setup Instructions**

### **1. Install Python** (if not installed)
Download Python 3.8+ from: https://www.python.org/downloads/

### **2. Create Virtual Environment** (Recommended)
```bash
cd ai-model
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Mac/Linux)
source venv/bin/activate
```

### **3. Install Dependencies**
```bash
pip install -r requirements.txt
```

This installs:
- `numpy, pandas` - Data manipulation
- `scikit-learn` - Machine learning algorithms
- `nltk` - Natural language processing
- `PyPDF2` - PDF text extraction
- `flask` - Web server for API

### **4. Download NLTK Data**
```python
import nltk
nltk.download('punkt')
nltk.download('stopwords')
```

---

## 📖 **Training The Model**

### **Option 1: Interactive Training**
```bash
python model.py
```
- Type `yes` when asked to train
- Wait 5-10 minutes for training
- Model accuracy will be displayed
- Models saved to `trained_models/` folder

### **Option 2: Programmatic Training**
```python
from model import ResumeAnalyzer

analyzer = ResumeAnalyzer()
accuracy = analyzer.train_classifier('datasets/data/data')
print(f"Model trained with {accuracy*100:.2f}% accuracy")
```

---

## 🧪 **Testing The Model**

### **Test Single Resume**
```python
from model import ResumeAnalyzer

# Load trained model
analyzer = ResumeAnalyzer()
analyzer.load_model()

# Analyze resume
result = analyzer.analyze_resume('path/to/resume.pdf')

print(f"Score: {result['score']}/100")
print(f"Category: {result['category']}")
print(f"Skills: {result['skillsFound']}")
```

### **Test With Job Description**
```python
job_desc = """
Looking for Python developer with React experience.
Must have Docker and AWS knowledge.
"""

result = analyzer.analyze_resume('resume.pdf', job_description=job_desc)
print(f"Match: {result['matchPercentage']}%")
```

---

## 📊 **Understanding The Results**

### **Output Format**
```json
{
  "score": 87,                    // ATS score out of 100
  "matchPercentage": 92,          // Job match %
  "skillsFound": 15,              // Total skills detected
  "suggestions": 8,               // Number of suggestions
  "category": "ENGINEERING",      // Predicted job category
  "details": {
    "strengths": [                // What's good
      "Strong technical skills",
      "Quantified achievements"
    ],
    "improvements": [             // What to improve
      "Add more keywords",
      "Include certifications"
    ],
    "keywords": [                 // Skills analysis
      {"word": "Python", "found": true},
      {"word": "Docker", "found": false}
    ]
  },
  "formatScore": 85,              // Structure quality
  "contentScore": 78,             // Content quality
  "experienceScore": 90,          // Experience details
  "skillsScore": 88               // Skills coverage
}
```

---

## 🔗 **Integration With Backend**

Create `api.py` to serve the AI model:
```python
from flask import Flask, request, jsonify
from model import ResumeAnalyzer
import os

app = Flask(__name__)
analyzer = ResumeAnalyzer()
analyzer.load_model()

@app.route('/api/analyze', methods=['POST'])
def analyze():
    if 'resume' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['resume']
    job_description = request.form.get('jobDescription', None)
    
    # Save temporarily
    filepath = f"temp_{file.filename}"
    file.save(filepath)
    
    # Analyze
    result = analyzer.analyze_resume(filepath, job_description)
    
    # Clean up
    os.remove(filepath)
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5001, debug=True)
```

---

## 📈 **Model Performance**

- **Training Data**: 2400+ resumes across 24 categories
- **Expected Accuracy**: 85-90%
- **Inference Time**: 1-2 seconds per resume
- **Model Size**: ~5MB (saved models)

---

## 🎯 **Next Steps**

1. ✅ Install dependencies: `pip install -r requirements.txt`
2. ✅ Train model: `python model.py` → Type "yes"
3. ✅ Test with sample resume
4. ✅ Create API endpoint (api.py)
5. ✅ Connect to Node.js backend

---

## 🔧 **Troubleshooting**

### **Error: Cannot extract text from PDF**
- PDF might be scanned image (use OCR)
- PDF might be encrypted
- Try different PDF

### **Error: Model not found**
- Run training first: `python model.py`
- Check `trained_models/` folder exists

### **Low Accuracy**
- Train with more data
- Adjust TF-IDF parameters
- Try different algorithms

---

## 📚 **Key Concepts Explained**

### **TF-IDF (Term Frequency - Inverse Document Frequency)**
- Measures word importance in documents
- High TF-IDF = Important word for classification
- Used to convert text → numbers for ML

### **Naive Bayes Classifier**
- Probabilistic machine learning algorithm
- Assumes features are independent
- Fast and efficient for text classification
- Works well even with small datasets

### **Feature Extraction**
- Converting text into numbers
- ML models only understand numbers
- TF-IDF creates 5000 features per resume

### **Label Encoding**
- Converts category names → numbers
- "ENGINEERING" → 0, "HR" → 1, etc.
- Required for ML algorithms

---

## 💡 **Tips For Better Results**

1. **More Training Data** = Better accuracy
2. **Clean PDFs** = Better text extraction
3. **Specific Keywords** = Better matching
4. **Regular Retraining** = Updated model

---

## 🎓 **Learning Resources**

- **Scikit-learn Docs**: https://scikit-learn.org/
- **NLTK Book**: https://www.nltk.org/book/
- **TF-IDF Explained**: https://en.wikipedia.org/wiki/Tf%E2%80%93idf
- **Naive Bayes**: https://scikit-learn.org/stable/modules/naive_bayes.html
