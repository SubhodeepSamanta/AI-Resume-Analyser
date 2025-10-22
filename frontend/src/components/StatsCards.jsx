import { motion } from "framer-motion";

export default function StatsCards({ results }) {
  const getScoreColor = (score) => {
    if (score >= 80) return "text-blue-400";
    if (score >= 60) return "text-purple-400";
    return "text-pink-400";
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };

  const stats = [
    {
      label: "ATS Score",
      value: results.score,
      suffix: "/100",
      color: getScoreColor(results.score),
      description: getScoreLabel(results.score),
      icon: "🎯",
    },
    {
      label: "Match",
      value: results.matchPercentage,
      suffix: "%",
      color: getScoreColor(results.matchPercentage),
      description: "Job compatibility",
      icon: "✨",
    },
    {
      label: "Skills Found",
      value: results.skillsFound,
      suffix: "",
      color: "text-purple-400",
      description: "Technical & Soft",
      icon: "💡",
    },
    {
      label: "Suggestions",
      value: results.suggestions,
      suffix: "",
      color: "text-yellow-400",
      description: "Improvements available",
      icon: "📝",
    },
  ];

  // Additional detailed stats
  const detailedStats = [
    {
      category: "Format & Structure",
      score: results.formatScore || 85,
      items: [
        { label: "Layout", value: "Professional", status: "success" },
        { label: "Readability", value: "High", status: "success" },
        {
          label: "Length",
          value: results.pageCount || "2 pages",
          status: "success",
        },
        { label: "File Type", value: "PDF", status: "success" },
      ],
    },
    {
      category: "Content Quality",
      score: results.contentScore || 78,
      items: [
        { label: "Grammar", value: "Excellent", status: "success" },
        { label: "Clarity", value: "Clear", status: "success" },
        { label: "Impact", value: "Strong", status: "warning" },
        {
          label: "Keywords",
          value: `${results.keywordDensity || 85}%`,
          status: "success",
        },
      ],
    },
    {
      category: "Experience Details",
      score: results.experienceScore || 90,
      items: [
        {
          label: "Work History",
          value: `${results.yearsOfExperience || 5} years`,
          status: "success",
        },
        {
          label: "Roles",
          value: `${results.rolesCount || 3} positions`,
          status: "success",
        },
        { label: "Achievements", value: "Quantified", status: "success" },
        { label: "Responsibilities", value: "Detailed", status: "success" },
      ],
    },
    {
      category: "Skills & Keywords",
      score: results.skillsScore || 88,
      items: [
        {
          label: "Technical Skills",
          value: `${results.technicalSkills || 12}`,
          status: "success",
        },
        {
          label: "Soft Skills",
          value: `${results.softSkills || 8}`,
          status: "success",
        },
        {
          label: "Industry Keywords",
          value: `${results.industryKeywords || 15}`,
          status: "warning",
        },
        {
          label: "Certifications",
          value: `${results.certifications || 2}`,
          status: "success",
        },
      ],
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "text-blue-400";
      case "warning":
        return "text-yellow-400";
      case "error":
        return "text-pink-400";
      default:
        return "text-zinc-400";
    }
  };

  return (
    <div className="mb-12">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <p className="text-zinc-500 text-sm">{stat.label}</p>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <p className={`text-4xl font-bold ${stat.color} mb-1`}>
              {stat.value}
              <span className="text-2xl">{stat.suffix}</span>
            </p>
            <p className="text-zinc-600 text-xs">{stat.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {detailedStats.map((section, index) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                {section.category}
              </h3>
              <span
                className={`text-xl font-bold ${getScoreColor(section.score)}`}
              >
                {section.score}%
              </span>
            </div>
            <div className="space-y-3">
              {section.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-zinc-400 text-sm">{item.label}</span>
                  <span
                    className={`text-sm font-medium ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
