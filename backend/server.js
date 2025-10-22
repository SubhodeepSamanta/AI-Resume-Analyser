import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only PDF and DOCX files are allowed!"));
    }
  },
});

// Routes
app.get("/", (req, res) => {
  res.json({ message: "AI Resume Analyzer API" });
});

// Analyze resume endpoint
app.post("/api/analyze", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("File received:", req.file.filename);

    // TODO: Implement your AI analysis here
    // For now, returning mock data
    const analysisResult = {
      score: 87,
      matchPercentage: 92,
      skillsFound: 15,
      suggestions: 8,
      details: {
        strengths: [
          "Strong technical skills alignment",
          "Clear project descriptions",
          "Quantified achievements",
        ],
        improvements: [
          "Add more industry-specific keywords",
          "Include certifications section",
          "Expand on leadership experience",
        ],
        keywords: [
          { word: "React", found: true },
          { word: "Node.js", found: true },
          { word: "TypeScript", found: true },
          { word: "Docker", found: false },
          { word: "Kubernetes", found: false },
        ],
      },
    };

    res.json(analysisResult);
  } catch (error) {
    console.error("Error analyzing resume:", error);
    res
      .status(500)
      .json({ message: "Error analyzing resume", error: error.message });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ message: "File is too large. Maximum size is 10MB" });
    }
  }
  res.status(500).json({ message: error.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
