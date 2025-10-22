import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";

dotenv.config();

// Python AI API URL
const AI_API_URL = process.env.AI_API_URL || "http://localhost:5001";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory');
}

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

// Health check endpoint
app.get("/api/health", async (req, res) => {
  try {
    const aiHealth = await axios.get(`${AI_API_URL}/health`);
    res.json({
      status: "healthy",
      backend: "running",
      ai: aiHealth.data,
    });
  } catch (error) {
    res.json({
      status: "degraded",
      backend: "running",
      ai: "not connected",
      error: error.message,
    });
  }
});

// Analyze resume endpoint
app.post("/api/analyze", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { jobDescription } = req.body;

    console.log("File received:", req.file.filename);
    if (jobDescription) {
      console.log(
        "Job description provided:",
        jobDescription.substring(0, 100) + "..."
      );
    }

    // Check if file is PDF (our AI only supports PDF)
    if (!req.file.originalname.toLowerCase().endsWith(".pdf")) {
      // Clean up uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        message: "Only PDF files are supported by the AI model",
      });
    }

    try {
      // Create form data to send to Python AI
      const formData = new FormData();
      formData.append("resume", fs.createReadStream(req.file.path));
      if (jobDescription) {
        formData.append("jobDescription", jobDescription);
      }

      console.log("Sending to AI API:", AI_API_URL);

      // Call Python AI API
      const aiResponse = await axios.post(`${AI_API_URL}/analyze`, formData, {
        headers: formData.getHeaders(),
        timeout: 30000, // 30 second timeout
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });

      console.log("AI analysis completed successfully");

      // Clean up uploaded file
      fs.unlinkSync(req.file.path);

      // Return AI analysis results
      res.json(aiResponse.data);
    } catch (aiError) {
      console.error("AI API Error:", aiError.message);

      // Clean up uploaded file
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      // If AI is not available, return helpful error
      if (aiError.code === "ECONNREFUSED") {
        return res.status(503).json({
          message: "AI service is not available",
          error: "Please ensure the Python AI server is running on port 5001",
          hint: 'Run "python api.py" in the ai-model directory',
        });
      }

      // Other AI errors
      return res.status(500).json({
        message: "AI analysis failed",
        error: aiError.response?.data?.message || aiError.message,
      });
    }
  } catch (error) {
    console.error("Error analyzing resume:", error);

    // Clean up file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      message: "Error analyzing resume",
      error: error.message,
    });
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
