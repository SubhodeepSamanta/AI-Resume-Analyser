"""Quick test script to analyze your resume"""

from model import ResumeAnalyzer

# Initialize
analyzer = ResumeAnalyzer()

# Load the trained model
try:
    analyzer.load_model()
    print("✓ Model loaded successfully!\n")
except:
    print("❌ No trained model found. Please train first by running: python model.py")
    exit()

# Path to your resume (update this if needed)
resume_path = r"C:\Users\USER\Downloads\Subhodeep-Samanta-Resume.pdf"

# Analyze
print(f"Analyzing: {resume_path}\n")
result = analyzer.analyze_resume(resume_path)

# Display results
print("=" * 60)
print("ANALYSIS RESULTS")
print("=" * 60)
print(f"\n📊 ATS Score: {result['score']}/100")
print(f"🎯 Category: {result.get('category', 'Unknown')}")
print(f"🔧 Skills Found: {result['skillsFound']}")
print(f"📈 Match Percentage: {result['matchPercentage']}%")

print(f"\n✨ Strengths:")
for s in result['details']['strengths']:
    print(f"   ✓ {s}")

print(f"\n🔧 Improvements:")
for i in result['details']['improvements'][:5]:
    print(f"   → {i}")

print("\n" + "=" * 60)
