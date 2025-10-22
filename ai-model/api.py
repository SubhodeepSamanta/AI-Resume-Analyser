"""
Flask API Server for AI Resume Analyzer
========================================

This creates a REST API endpoint that your Node.js backend can call
to analyze resumes using the trained AI model.

Endpoints:
- POST /analyze - Analyze a resume PDF
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from model import ResumeAnalyzer
import os
import tempfile

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize AI model
print("Loading AI Resume Analyzer...")
analyzer = ResumeAnalyzer()

MODEL_LOADED = False
try:
    analyzer.load_model()
    MODEL_LOADED = True
    print("✓ Model loaded successfully!")
except Exception as e:
    print(f"⚠ Warning: Could not load model - {str(e)}")
    print("Running in MOCK MODE - will return simulated results")
    MODEL_LOADED = False

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': analyzer.classifier is not None
    })

@app.route('/analyze', methods=['POST'])
def analyze_resume():
    """
    Analyze resume endpoint
    
    Request:
        - resume: PDF file (multipart/form-data)
        - jobDescription: Optional job description text
    
    Response:
        - score: ATS score (0-100)
        - matchPercentage: Job match percentage
        - skillsFound: Number of skills detected
        - suggestions: Number of suggestions
        - details: Detailed analysis
    """
    try:
        # Check if file is present
        if 'resume' not in request.files:
            return jsonify({'error': 'No resume file uploaded'}), 400
        
        file = request.files['resume']
        
        # Check if file is PDF
        if not file.filename.endswith('.pdf'):
            return jsonify({'error': 'Only PDF files are supported'}), 400
        
        # Get optional job description
        job_description = request.form.get('jobDescription', None)
        
        # If model not loaded, return mock data
        if not MODEL_LOADED:
            print("⚠ Using MOCK data - model not trained")
            return jsonify({
                'score': 78,
                'matchPercentage': 82,
                'skillsFound': 14,
                'suggestions': 6,
                'category': 'INFORMATION-TECHNOLOGY',
                'details': {
                    'strengths': [
                        'Strong technical skills present',
                        'Clear structure and formatting',
                        'Good use of action verbs'
                    ],
                    'improvements': [
                        'Add more quantifiable achievements',
                        'Include relevant certifications',
                        'Expand skills section with trending technologies',
                        'Add professional summary at top',
                        'Include portfolio/GitHub links'
                    ],
                    'keywords': [
                        {'word': 'Python', 'found': True},
                        {'word': 'JavaScript', 'found': True},
                        {'word': 'React', 'found': True},
                        {'word': 'Docker', 'found': False},
                        {'word': 'Kubernetes', 'found': False},
                    ]
                },
                'formatScore': 85,
                'contentScore': 72,
                'experienceScore': 88,
                'skillsScore': 75,
                'technicalSkills': 10,
                'softSkills': 4,
                'keywordDensity': 68,
                'pageCount': 1,
                '_mock': True,
                '_message': 'Using mock data - AI model not trained yet'
            }), 200
        
        # Save file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
            file.save(temp_file.name)
            temp_path = temp_file.name
        
        # Analyze resume
        result = analyzer.analyze_resume(temp_path, job_description)
        
        # Clean up temp file
        os.unlink(temp_path)
        
        # Return results
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({
            'error': 'Error analyzing resume',
            'message': str(e)
        }), 500

@app.route('/skills', methods=['GET'])
def get_skills_list():
    """Return list of skills the AI can detect"""
    all_skills = []
    for category, skills in analyzer.tech_skills.items():
        all_skills.extend(skills)
    all_skills.extend(analyzer.soft_skills)
    
    return jsonify({
        'technical_skills': [skill for cat, skills in analyzer.tech_skills.items() for skill in skills],
        'soft_skills': analyzer.soft_skills,
        'total': len(all_skills)
    })

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5001))
    
    print("\n" + "="*60)
    print("AI Resume Analyzer API Server")
    print("="*60)
    print(f"Server running on port: {port}")
    print(f"API Endpoint: POST /analyze")
    print("="*60 + "\n")
    
    app.run(host='0.0.0.0', port=port, debug=False)
