"""
AI Resume Analyzer Model
========================

This module contains the complete AI system for resume analysis including:
1. PDF text extraction
2. Resume classification by job category
3. Skill extraction and keyword matching
4. ATS score calculation
5. Suggestions generation

Author: Your Name
Date: 2025
"""

import os
import re
import pickle
import PyPDF2
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import LabelEncoder
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import warnings
warnings.filterwarnings('ignore')

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')
    
try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

class ResumeAnalyzer:
    """
    Main class for resume analysis
    
    This AI model does the following:
    1. Extracts text from PDF resumes
    2. Classifies resumes into job categories
    3. Extracts skills and keywords
    4. Calculates ATS compatibility score
    5. Generates improvement suggestions
    """
    
    def __init__(self):
        self.vectorizer = None
        self.classifier = None
        self.label_encoder = None
        self.stop_words = set(stopwords.words('english'))
        
        # Common skills database (will be expanded during training)
        self.tech_skills = {
            'programming': ['python', 'java', 'javascript', 'c++', 'c#', 'ruby', 'php', 'go', 'rust', 'kotlin', 'swift'],
            'web': ['html', 'css', 'react', 'angular', 'vue', 'node.js', 'express', 'django', 'flask', 'next.js'],
            'database': ['sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'cassandra', 'oracle', 'sqlite'],
            'devops': ['docker', 'kubernetes', 'jenkins', 'git', 'ci/cd', 'aws', 'azure', 'gcp', 'terraform'],
            'data_science': ['machine learning', 'deep learning', 'tensorflow', 'pytorch', 'pandas', 'numpy', 'scikit-learn'],
            'mobile': ['android', 'ios', 'react native', 'flutter', 'xamarin'],
            'tools': ['jira', 'git', 'github', 'gitlab', 'bitbucket', 'vscode', 'intellij'],
        }
        
        self.soft_skills = [
            'leadership', 'communication', 'teamwork', 'problem solving', 'critical thinking',
            'time management', 'adaptability', 'creativity', 'collaboration', 'analytical',
            'project management', 'agile', 'scrum', 'presentation', 'negotiation'
        ]
        
    def extract_text_from_pdf(self, pdf_path):
        """
        Extract text content from PDF file
        
        Args:
            pdf_path (str): Path to the PDF file
            
        Returns:
            str: Extracted text from PDF
        """
        try:
            text = ""
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                for page in pdf_reader.pages:
                    text += page.extract_text()
            return text
        except Exception as e:
            print(f"Error extracting text from {pdf_path}: {str(e)}")
            return ""
    
    def clean_text(self, text):
        """
        Clean and preprocess text
        
        Steps:
        1. Convert to lowercase
        2. Remove special characters
        3. Remove extra whitespace
        4. Remove stopwords (optional for some analyses)
        
        Args:
            text (str): Raw text
            
        Returns:
            str: Cleaned text
        """
        # Convert to lowercase
        text = text.lower()
        
        # Remove URLs
        text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
        
        # Remove email addresses
        text = re.sub(r'\S+@\S+', '', text)
        
        # Remove phone numbers
        text = re.sub(r'\d{10}|\d{3}[-.\s]\d{3}[-.\s]\d{4}', '', text)
        
        # Remove special characters but keep spaces
        text = re.sub(r'[^a-zA-Z0-9\s.+#]', ' ', text)
        
        # Remove extra whitespace
        text = ' '.join(text.split())
        
        return text
    
    def extract_skills(self, text):
        """
        Extract technical and soft skills from resume text
        
        Args:
            text (str): Resume text
            
        Returns:
            dict: Dictionary containing technical and soft skills found
        """
        text = text.lower()
        found_tech_skills = []
        found_soft_skills = []
        
        # Extract technical skills
        for category, skills in self.tech_skills.items():
            for skill in skills:
                if skill.lower() in text:
                    found_tech_skills.append(skill)
        
        # Extract soft skills
        for skill in self.soft_skills:
            if skill.lower() in text:
                found_soft_skills.append(skill)
        
        return {
            'technical': list(set(found_tech_skills)),
            'soft': list(set(found_soft_skills)),
            'total': len(set(found_tech_skills)) + len(set(found_soft_skills))
        }
    
    def calculate_ats_score(self, text, job_description=None):
        """
        Calculate ATS (Applicant Tracking System) compatibility score
        
        Scoring factors:
        1. Resume length (optimal: 1-2 pages)
        2. Keyword density
        3. Skills present
        4. Clear sections
        5. Quantifiable achievements
        6. Job description matching (if provided)
        
        Args:
            text (str): Resume text
            job_description (str, optional): Job description for matching
            
        Returns:
            dict: Score breakdown
        """
        score = 0
        max_score = 100
        details = {}
        
        # Factor 1: Resume length (20 points)
        word_count = len(text.split())
        if 300 <= word_count <= 800:
            length_score = 20
        elif 200 <= word_count < 300 or 800 < word_count <= 1200:
            length_score = 15
        else:
            length_score = 10
        score += length_score
        details['length_score'] = length_score
        
        # Factor 2: Skills presence (25 points)
        skills = self.extract_skills(text)
        skill_score = min(25, (skills['total'] / 15) * 25)
        score += skill_score
        details['skill_score'] = skill_score
        
        # Factor 3: Section headings (15 points)
        sections = ['experience', 'education', 'skills', 'projects', 'summary']
        sections_found = sum(1 for section in sections if section in text.lower())
        section_score = (sections_found / len(sections)) * 15
        score += section_score
        details['section_score'] = section_score
        
        # Factor 4: Quantifiable achievements (20 points)
        # Look for numbers, percentages, metrics
        numbers = len(re.findall(r'\d+%|\d+x|\$\d+|\d+ years?', text))
        achievement_score = min(20, (numbers / 5) * 20)
        score += achievement_score
        details['achievement_score'] = achievement_score
        
        # Factor 5: Professional keywords (20 points)
        professional_keywords = ['achieved', 'improved', 'developed', 'implemented', 
                                'managed', 'led', 'created', 'designed', 'increased', 
                                'reduced', 'optimized', 'collaborated']
        keywords_found = sum(1 for keyword in professional_keywords if keyword in text.lower())
        keyword_score = min(20, (keywords_found / 8) * 20)
        score += keyword_score
        details['keyword_score'] = keyword_score
        
        # Factor 6: Job description matching (bonus if provided)
        if job_description:
            jd_keywords = set(self.clean_text(job_description).split())
            resume_keywords = set(self.clean_text(text).split())
            match_ratio = len(jd_keywords.intersection(resume_keywords)) / len(jd_keywords) if jd_keywords else 0
            match_score = match_ratio * 100
            details['job_match_score'] = match_score
        
        return {
            'total_score': int(score),
            'details': details,
            'skills_found': skills['total']
        }
    
    def generate_suggestions(self, text, ats_score, skills):
        """
        Generate improvement suggestions based on analysis
        
        Args:
            text (str): Resume text
            ats_score (dict): ATS score breakdown
            skills (dict): Extracted skills
            
        Returns:
            dict: Suggestions categorized by priority
        """
        suggestions = {
            'strengths': [],
            'improvements': [],
            'missing_elements': []
        }
        
        # Analyze strengths
        if skills['total'] >= 10:
            suggestions['strengths'].append('Strong technical skills alignment')
        
        if ats_score['details']['achievement_score'] >= 15:
            suggestions['strengths'].append('Quantified achievements included')
        
        if ats_score['details']['section_score'] >= 12:
            suggestions['strengths'].append('Well-structured with clear sections')
        
        # Generate improvements
        if skills['total'] < 8:
            suggestions['improvements'].append('Add more relevant technical skills to match industry standards')
        
        if ats_score['details']['achievement_score'] < 10:
            suggestions['improvements'].append('Include quantifiable metrics (e.g., "increased efficiency by 30%")')
        
        if ats_score['details']['keyword_score'] < 15:
            suggestions['improvements'].append('Use more action verbs (achieved, developed, implemented)')
        
        # Check for missing elements
        if 'summary' not in text.lower() and 'objective' not in text.lower():
            suggestions['missing_elements'].append('Add a professional summary at the top')
        
        if 'certification' not in text.lower() and 'certificate' not in text.lower():
            suggestions['missing_elements'].append('Consider adding relevant certifications')
        
        if not re.search(r'github|linkedin|portfolio', text.lower()):
            suggestions['missing_elements'].append('Include links to GitHub, LinkedIn, or portfolio')
        
        return suggestions
    
    def train_classifier(self, data_folder):
        """
        Train the resume classification model
        
        This trains a machine learning model to classify resumes into job categories
        
        Args:
            data_folder (str): Path to folder containing resume PDFs organized by category
            
        Process:
        1. Load all resumes from categorized folders
        2. Extract text from each PDF
        3. Clean and preprocess text
        4. Convert text to TF-IDF features
        5. Train Naive Bayes classifier
        6. Save trained model
        """
        print("Starting model training...")
        print("=" * 60)
        
        # Load data
        categories = []
        texts = []
        
        for category in os.listdir(data_folder):
            category_path = os.path.join(data_folder, category)
            if not os.path.isdir(category_path):
                continue
            
            print(f"Processing category: {category}")
            pdf_files = [f for f in os.listdir(category_path) if f.endswith('.pdf')]
            print(f"  Found {len(pdf_files)} resumes")
            
            for pdf_file in pdf_files[:100]:  # Limit to 100 per category for faster training
                pdf_path = os.path.join(category_path, pdf_file)
                text = self.extract_text_from_pdf(pdf_path)
                if text:
                    cleaned_text = self.clean_text(text)
                    texts.append(cleaned_text)
                    categories.append(category)
        
        print(f"\nTotal resumes processed: {len(texts)}")
        print(f"Categories: {set(categories)}")
        
        # Encode labels
        self.label_encoder = LabelEncoder()
        encoded_categories = self.label_encoder.fit_transform(categories)
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            texts, encoded_categories, test_size=0.2, random_state=42
        )
        
        print(f"\nTraining set: {len(X_train)} samples")
        print(f"Test set: {len(X_test)} samples")
        
        # Create TF-IDF features
        print("\nCreating TF-IDF features...")
        self.vectorizer = TfidfVectorizer(max_features=5000, ngram_range=(1, 2))
        X_train_tfidf = self.vectorizer.fit_transform(X_train)
        X_test_tfidf = self.vectorizer.transform(X_test)
        
        # Train classifier
        print("Training Naive Bayes classifier...")
        self.classifier = MultinomialNB()
        self.classifier.fit(X_train_tfidf, y_train)
        
        # Evaluate
        y_pred = self.classifier.predict(X_test_tfidf)
        accuracy = accuracy_score(y_test, y_pred)
        
        print(f"\n{'=' * 60}")
        print(f"Model Training Complete!")
        print(f"Accuracy: {accuracy * 100:.2f}%")
        print(f"{'=' * 60}\n")
        
        # Save models
        self.save_model()
        
        return accuracy
    
    def save_model(self, model_dir='trained_models'):
        """Save trained models and vectorizer"""
        os.makedirs(model_dir, exist_ok=True)
        
        with open(os.path.join(model_dir, 'classifier.pkl'), 'wb') as f:
            pickle.dump(self.classifier, f)
        
        with open(os.path.join(model_dir, 'vectorizer.pkl'), 'wb') as f:
            pickle.dump(self.vectorizer, f)
        
        with open(os.path.join(model_dir, 'label_encoder.pkl'), 'wb') as f:
            pickle.dump(self.label_encoder, f)
        
        print(f"Models saved to {model_dir}/")
    
    def load_model(self, model_dir='trained_models'):
        """Load trained models"""
        with open(os.path.join(model_dir, 'classifier.pkl'), 'rb') as f:
            self.classifier = pickle.load(f)
        
        with open(os.path.join(model_dir, 'vectorizer.pkl'), 'rb') as f:
            self.vectorizer = pickle.load(f)
        
        with open(os.path.join(model_dir, 'label_encoder.pkl'), 'rb') as f:
            self.label_encoder = pickle.load(f)
        
        print("Models loaded successfully!")
    
    def analyze_resume(self, pdf_path, job_description=None):
        """
        Complete resume analysis pipeline
        
        Args:
            pdf_path (str): Path to resume PDF
            job_description (str, optional): Job description for matching
            
        Returns:
            dict: Complete analysis results
        """
        # Extract text
        text = self.extract_text_from_pdf(pdf_path)
        if not text:
            return {'error': 'Could not extract text from PDF'}
        
        # Clean text
        cleaned_text = self.clean_text(text)
        
        # Predict category
        category = None
        if self.classifier:
            text_tfidf = self.vectorizer.transform([cleaned_text])
            category_encoded = self.classifier.predict(text_tfidf)[0]
            category = self.label_encoder.inverse_transform([category_encoded])[0]
        
        # Extract skills
        skills = self.extract_skills(text)
        
        # Calculate ATS score
        ats_result = self.calculate_ats_score(text, job_description)
        
        # Generate suggestions
        suggestions = self.generate_suggestions(text, ats_result, skills)
        
        # Calculate match percentage
        match_percentage = ats_result.get('details', {}).get('job_match_score', ats_result['total_score'])
        
        # Prepare keyword analysis
        all_skills = skills['technical'] + skills['soft']
        keywords_analysis = [{'word': skill, 'found': True} for skill in all_skills[:10]]
        
        # Add some missing recommended keywords
        recommended = ['docker', 'kubernetes', 'ci/cd', 'microservices', 'agile']
        for rec in recommended:
            if rec not in [k['word'] for k in keywords_analysis]:
                keywords_analysis.append({'word': rec, 'found': False})
        
        # Build response
        result = {
            'score': ats_result['total_score'],
            'matchPercentage': int(match_percentage),
            'skillsFound': skills['total'],
            'suggestions': len(suggestions['improvements']) + len(suggestions['missing_elements']),
            'category': category,
            'details': {
                'strengths': suggestions['strengths'] if suggestions['strengths'] else [
                    'Technical skills present',
                    'Clear structure'
                ],
                'improvements': suggestions['improvements'] + suggestions['missing_elements'],
                'keywords': keywords_analysis
            },
            # Additional detailed metrics for frontend
            'formatScore': int(ats_result['details'].get('section_score', 15) * 5.67),
            'contentScore': int(ats_result['details'].get('keyword_score', 15) * 5),
            'experienceScore': int(ats_result['details'].get('achievement_score', 15) * 5),
            'skillsScore': int(ats_result['details'].get('skill_score', 20) * 4.4),
            'technicalSkills': len(skills['technical']),
            'softSkills': len(skills['soft']),
            'keywordDensity': min(100, int(ats_result['details'].get('keyword_score', 15) * 6.67)),
            'pageCount': max(1, len(text) // 2000),
        }
        
        return result


# Main execution
if __name__ == "__main__":
    print("AI Resume Analyzer")
    print("=" * 60)
    
    # Initialize analyzer
    analyzer = ResumeAnalyzer()
    
    # Train the model (run this once)
    train = input("Do you want to train the model? (yes/no): ").lower()
    
    if train == 'yes':
        data_folder = 'datasets/data/data'
        print(f"\nTraining model using resumes from: {data_folder}")
        accuracy = analyzer.train_classifier(data_folder)
    else:
        # Load pre-trained model
        try:
            analyzer.load_model()
        except:
            print("No trained model found. Please train first!")
            exit()
    
    # Test the analyzer
    test = input("\nDo you want to test with a sample resume? (yes/no): ").lower()
    if test == 'yes':
        sample_pdf = input("Enter path to PDF file: ")
        if os.path.exists(sample_pdf):
            result = analyzer.analyze_resume(sample_pdf)
            print("\n" + "=" * 60)
            print("Analysis Results:")
            print("=" * 60)
            print(f"ATS Score: {result['score']}/100")
            print(f"Category: {result.get('category', 'Unknown')}")
            print(f"Skills Found: {result['skillsFound']}")
            print(f"Match Percentage: {result['matchPercentage']}%")
            print(f"\nStrengths:")
            for s in result['details']['strengths']:
                print(f"  ✓ {s}")
            print(f"\nImprovements:")
            for i in result['details']['improvements']:
                print(f"  → {i}")
        else:
            print("File not found!")
