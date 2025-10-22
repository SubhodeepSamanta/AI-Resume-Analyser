import { useState } from "react";
import { motion } from "framer-motion";
import { analyzeResume } from "./services/api";
import Navbar from "./components/Navbar";
import UploadSection from "./components/UploadSection";
import StatsCards from "./components/StatsCards";
import AnalysisAccordion from "./components/AnalysisAccordion";

function App() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // Send file and job description to backend for analysis
      const data = await analyzeResume(file, jobDescription);
      setResults(data);
    } catch (err) {
      console.error("Error analyzing resume:", err);
      setError(
        err.response?.data?.message ||
          "Failed to analyze resume. Please try again."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <UploadSection
          file={file}
          setFile={setFile}
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
        />

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-950 border border-red-800 rounded-lg text-red-200"
          >
            {error}
          </motion.div>
        )}

        {!results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-16"
          >
            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-xl font-bold mb-2">ATS Optimization</h3>
                <p className="text-zinc-400 text-sm">
                  Our AI analyzes your resume against Applicant Tracking Systems
                  to ensure maximum visibility.
                </p>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="text-xl font-bold mb-2">Detailed Metrics</h3>
                <p className="text-zinc-400 text-sm">
                  Get comprehensive scoring on skills, keywords, formatting, and
                  overall match percentage.
                </p>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors">
                <div className="text-3xl mb-3">💡</div>
                <h3 className="text-xl font-bold mb-2">Smart Suggestions</h3>
                <p className="text-zinc-400 text-sm">
                  Receive actionable recommendations to improve your resume and
                  stand out from the competition.
                </p>
              </div>
            </div>

            {/* How it Works */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">How It Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-xl font-bold mb-3">
                    1
                  </div>
                  <h4 className="font-semibold mb-2">Upload Resume</h4>
                  <p className="text-zinc-400 text-sm">
                    Upload your resume in PDF or DOCX format
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-xl font-bold mb-3">
                    2
                  </div>
                  <h4 className="font-semibold mb-2">AI Analysis</h4>
                  <p className="text-zinc-400 text-sm">
                    Our AI scans and evaluates your resume content
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-xl font-bold mb-3">
                    3
                  </div>
                  <h4 className="font-semibold mb-2">Get Results</h4>
                  <p className="text-zinc-400 text-sm">
                    Review insights and improve your resume
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StatsCards results={results} />
            <AnalysisAccordion details={results.details} />
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default App;
