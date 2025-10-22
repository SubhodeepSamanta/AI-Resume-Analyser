import { useRef } from "react";
import { motion } from "framer-motion";

export default function UploadSection({
  file,
  setFile,
  onAnalyze,
  isAnalyzing,
}) {
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      (droppedFile.type === "application/pdf" ||
        droppedFile.name.endsWith(".docx"))
    ) {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
      {/* Left Side - Text */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col justify-center"
      >
        <h2 className="text-4xl font-bold mb-6 bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent">
          Analyze Your Resume with AI
        </h2>
        <p className="text-zinc-400 text-lg mb-4">
          Get instant feedback on your resume using advanced AI algorithms. Our
          system analyzes your resume against ATS standards and provides
          actionable insights to improve your chances.
        </p>
        <ul className="space-y-3 text-zinc-500">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></span>
            ATS compatibility score
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></span>
            Keyword matching analysis
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></span>
            Personalized improvement suggestions
          </li>
        </ul>
      </motion.div>

      {/* Right Side - Upload */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col justify-center"
      >
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-zinc-800 rounded-lg p-12 text-center cursor-pointer hover:border-zinc-700 transition-colors bg-zinc-950"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-zinc-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>

          {file ? (
            <div className="mb-4">
              <p className="text-white font-medium">{file.name}</p>
              <p className="text-zinc-500 text-sm mt-1">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          ) : (
            <>
              <p className="text-zinc-300 mb-2">Drag & drop your resume here</p>
              <p className="text-zinc-500 text-sm">
                or click to choose file (PDF/DOCX)
              </p>
            </>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAnalyze}
          disabled={!file || isAnalyzing}
          className="mt-6 w-full bg-white text-black py-4 rounded-lg font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-200 transition-colors"
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
        </motion.button>
      </motion.div>
    </div>
  );
}
