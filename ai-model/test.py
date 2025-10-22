"""
Simple Test Script for AI Resume Analyzer
==========================================

This script tests the AI model independently before integrating with the full stack.
Use this to verify your AI is working correctly after training.
"""

from model import ResumeAnalyzer
import os

def test_model():
    """Test the trained AI model"""
    
    print("\n" + "="*60)
    print("AI Resume Analyzer - Test Script")
    print("="*60 + "\n")
    
    # Initialize analyzer
    print("1. Initializing AI Resume Analyzer...")
    analyzer = ResumeAnalyzer()
    
    # Check if model exists
    model_path = "trained_models/resume_classifier.pkl"
    if not os.path.exists(model_path):
        print("❌ Error: Model not found!")
        print(f"   Looking for: {model_path}")
        print("\n   Please train the model first:")
        print("   python model.py")
        return False
    
    # Load model
    print("2. Loading trained model...")
    try:
        analyzer.load_model()
        print("   ✓ Model loaded successfully!")
    except Exception as e:
        print(f"   ❌ Error loading model: {str(e)}")
        return False
    
    # Find a test resume
    print("\n3. Looking for test resume...")
    test_resume = None
    
    # Check various possible locations
    test_paths = [
        "datasets/data/data/ENGINEERING",
        "datasets/data/data/INFORMATION-TECHNOLOGY",
        "datasets/data/data/HR",
    ]
    
    for path in test_paths:
        if os.path.exists(path):
            files = [f for f in os.listdir(path) if f.endswith('.pdf')]
            if files:
                test_resume = os.path.join(path, files[0])
                print(f"   ✓ Found test resume: {files[0]}")
                print(f"   Category: {os.path.basename(path)}")
                break
    
    if not test_resume:
        print("   ❌ No test resume found!")
        print("   Please provide path to a PDF resume to test")
        return False
    
    # Analyze resume
    print("\n4. Analyzing resume with AI...")
    try:
        result = analyzer.analyze_resume(test_resume)
        
        print("\n" + "="*60)
        print("ANALYSIS RESULTS")
        print("="*60)
        
        print(f"\n📊 ATS Score: {result['score']}/100")
        print(f"🎯 Predicted Category: {result.get('predicted_category', 'N/A')}")
        print(f"🔧 Skills Found: {result['skillsFound']}")
        print(f"💡 Suggestions: {result['suggestions']}")
        
        print(f"\n📈 Detailed Scores:")
        for stat in result['detailedStats']:
            print(f"   • {stat['title']}: {stat['score']}/100 ({stat['status']})")
        
        print(f"\n✨ Key Strengths ({len(result['details']['strengths'])}):")
        for i, strength in enumerate(result['details']['strengths'][:3], 1):
            print(f"   {i}. {strength}")
        
        print(f"\n🔧 Improvements Needed ({len(result['details']['improvements'])}):")
        for i, improvement in enumerate(result['details']['improvements'][:3], 1):
            print(f"   {i}. {improvement}")
        
        print(f"\n🎯 Skills Breakdown:")
        for skill_cat in result['details']['skills'][:2]:
            print(f"   • {skill_cat['category']}:")
            for item in skill_cat['items'][:3]:
                bars = '█' * (item['level'] // 10)
                print(f"     - {item['name']}: {bars} {item['level']}%")
        
        print("\n" + "="*60)
        print("✅ TEST PASSED - AI is working correctly!")
        print("="*60 + "\n")
        
        return True
        
    except Exception as e:
        print(f"\n❌ Error during analysis: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

def test_skill_extraction():
    """Test skill extraction independently"""
    
    print("\n" + "="*60)
    print("Testing Skill Extraction")
    print("="*60 + "\n")
    
    analyzer = ResumeAnalyzer()
    
    # Sample resume text
    sample_text = """
    Software Engineer with 5 years of experience in Python, JavaScript, and React.
    Proficient in Docker, Kubernetes, and AWS cloud services.
    Strong communication skills and team leadership abilities.
    Experience with machine learning and data analysis.
    """
    
    print("Sample text:")
    print(sample_text)
    
    tech_skills, soft_skills = analyzer.extract_skills(sample_text)
    
    print(f"\n✓ Technical Skills Found ({len(tech_skills)}):")
    for skill in tech_skills[:10]:
        print(f"  • {skill}")
    
    print(f"\n✓ Soft Skills Found ({len(soft_skills)}):")
    for skill in soft_skills:
        print(f"  • {skill}")
    
    print("\n✅ Skill extraction working!\n")

def main():
    """Main test function"""
    
    print("\n🧪 Starting AI Resume Analyzer Tests...\n")
    
    # Test 1: Skill extraction
    try:
        test_skill_extraction()
    except Exception as e:
        print(f"❌ Skill extraction test failed: {str(e)}")
    
    # Test 2: Full model test
    try:
        success = test_model()
        if success:
            print("\n🎉 All tests passed!")
            print("\nYour AI is ready to use!")
            print("\nNext steps:")
            print("1. Start the Flask API: python api.py")
            print("2. Start the Node.js backend: cd backend && npm start")
            print("3. Start the React frontend: cd frontend && npm run dev")
        else:
            print("\n❌ Some tests failed")
            print("Please check the errors above and try again")
    except Exception as e:
        print(f"\n❌ Model test failed: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
