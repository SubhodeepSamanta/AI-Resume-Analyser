import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const analyzeResume = async (file, jobDescription = "") => {
  const formData = new FormData();
  formData.append("resume", file);
  
  // Add job description if provided
  if (jobDescription && jobDescription.trim()) {
    formData.append("jobDescription", jobDescription.trim());
  }

  const response = await api.post("/api/analyze", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export default api;
