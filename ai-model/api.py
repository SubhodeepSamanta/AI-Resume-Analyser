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

try:
    analyzer.load_model()
    print("✓ Model loaded successfully!")
except Exception as e:
    print(f"⚠ Warning: Could not load model - {str(e)}")
    print("Please train the model first by running: python model.py")

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
    print("\n" + "="*60)
    print("AI Resume Analyzer API Server")
    print("="*60)
    print("Server running on: http://localhost:5001")
    print("API Endpoint: POST http://localhost:5001/analyze")
    print("="*60 + "\n")
    
    app.run(host='0.0.0.0', port=5001, debug=True)
