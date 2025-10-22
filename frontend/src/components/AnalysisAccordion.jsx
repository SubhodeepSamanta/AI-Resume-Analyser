import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnalysisAccordion({ details }) {
  const [openSection, setOpenSection] = useState(null);

  const sections = [
    {
      id: "strengths",
      title: "Strengths & Highlights",
      icon: "✓",
      color: "text-blue-400",
      badge: details.strengths?.length || 0,
      items: [
        {
          category: "Technical Excellence",
          points: details.strengths || [
            "Strong technical skills alignment",
            "Clear project descriptions",
            "Quantified achievements",
          ],
        },
        {
          category: "Professional Experience",
          points: [
            "Well-structured work history",
            "Clear career progression",
            "Relevant industry experience",
          ],
        },
        {
          category: "Achievements",
          points: [
            "Measurable results included",
            "Leadership examples provided",
            "Problem-solving skills demonstrated",
          ],
        },
      ],
    },
    {
      id: "improvements",
      title: "Areas for Improvement",
      icon: "→",
      color: "text-yellow-400",
      badge: details.improvements?.length || 0,
      items: [
        {
          category: "Content Optimization",
          points: details.improvements || [
            "Add more industry-specific keywords",
            "Include certifications section",
            "Expand on leadership experience",
          ],
        },
        {
          category: "Formatting Suggestions",
          points: [
            "Use consistent bullet point style",
            "Add section headers for clarity",
            "Consider using action verbs",
          ],
        },
        {
          category: "Missing Elements",
          points: [
            "Professional summary could be stronger",
            "Add LinkedIn profile URL",
            "Include relevant coursework or training",
          ],
        },
      ],
    },
    {
      id: "keywords",
      title: "Keyword Analysis",
      icon: "#",
      color: "text-purple-400",
      badge: details.keywords?.length || 0,
      items: [
        {
          category: "Technical Keywords",
          keywords: details.keywords?.filter((kw) => kw.found) || [
            { word: "React", found: true },
            { word: "Node.js", found: true },
            { word: "TypeScript", found: true },
          ],
        },
        {
          category: "Missing Keywords",
          keywords: details.keywords?.filter((kw) => !kw.found) || [
            { word: "Docker", found: false },
            { word: "Kubernetes", found: false },
            { word: "CI/CD", found: false },
          ],
        },
        {
          category: "Recommended Keywords",
          keywords: [
            { word: "Agile", found: false, priority: "high" },
            { word: "Cloud Computing", found: false, priority: "high" },
            { word: "Microservices", found: false, priority: "medium" },
            { word: "Testing", found: false, priority: "medium" },
          ],
        },
      ],
    },
    {
      id: "skills",
      title: "Skills Breakdown",
      icon: "💡",
      color: "text-cyan-400",
      badge: "15+",
      items: [
        {
          category: "Programming Languages",
          skills: [
            { name: "JavaScript", level: 90, found: true },
            { name: "Python", level: 75, found: true },
            { name: "Java", level: 60, found: true },
            { name: "Go", level: 0, found: false },
          ],
        },
        {
          category: "Frameworks & Libraries",
          skills: [
            { name: "React", level: 95, found: true },
            { name: "Node.js", level: 85, found: true },
            { name: "Express", level: 80, found: true },
            { name: "Next.js", level: 0, found: false },
          ],
        },
        {
          category: "Tools & Technologies",
          skills: [
            { name: "Git", level: 90, found: true },
            { name: "Docker", level: 0, found: false },
            { name: "AWS", level: 70, found: true },
            { name: "Kubernetes", level: 0, found: false },
          ],
        },
      ],
    },
    {
      id: "tips",
      title: "Action Items & Tips",
      icon: "🎯",
      color: "text-orange-400",
      badge: "Priority",
      items: [
        {
          category: "High Priority",
          tips: [
            {
              title: "Add Quantifiable Metrics",
              description:
                "Include specific numbers, percentages, and results in your achievements",
              impact: "High",
            },
            {
              title: "Tailor to Job Description",
              description:
                "Customize your resume for each application to match required skills",
              impact: "High",
            },
            {
              title: "Update Skills Section",
              description: "Add trending technologies relevant to your field",
              impact: "High",
            },
          ],
        },
        {
          category: "Medium Priority",
          tips: [
            {
              title: "Professional Summary",
              description: "Write a compelling 3-4 line summary at the top",
              impact: "Medium",
            },
            {
              title: "Action Verbs",
              description: "Start bullet points with strong action verbs",
              impact: "Medium",
            },
          ],
        },
        {
          category: "Optional Enhancements",
          tips: [
            {
              title: "Add Portfolio Link",
              description: "Include GitHub, personal website, or portfolio",
              impact: "Low",
            },
            {
              title: "Certifications",
              description: "List relevant certifications and training",
              impact: "Low",
            },
          ],
        },
      ],
    },
  ];

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case "High":
        return "text-pink-400";
      case "Medium":
        return "text-purple-400";
      case "Low":
        return "text-blue-400";
      default:
        return "text-zinc-400";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-pink-900/20 text-pink-400 border-pink-800";
      case "medium":
        return "bg-purple-900/20 text-purple-400 border-purple-800";
      default:
        return "bg-zinc-900/20 text-zinc-400 border-zinc-800";
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold mb-6">Detailed Analysis</h3>

      {sections.map((section) => (
        <motion.div
          key={section.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full px-6 py-4 flex items-center cursor-pointer justify-between hover:bg-zinc-900 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{section.icon}</span>
              <span className="font-semibold text-lg">{section.title}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full bg-zinc-800 ${section.color}`}
              >
                {section.badge}
              </span>
            </div>
            <motion.span
              animate={{ rotate: openSection === section.id ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-zinc-500"
            >
              ▼
            </motion.span>
          </button>

          <AnimatePresence>
            {openSection === section.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-zinc-800"
              >
                <div className="p-6 space-y-6">
                  {section.items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800"
                    >
                      <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                        {item.category}
                      </h4>

                      {/* For text points */}
                      {item.points && (
                        <div className="space-y-2">
                          {item.points.map((point, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-zinc-400 text-sm"
                            >
                              <span className="text-zinc-600 mt-1">•</span>
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* For keywords */}
                      {item.keywords && (
                        <div className="flex flex-wrap gap-2">
                          {item.keywords.map((kw, idx) => (
                            <span
                              key={idx}
                              className={`px-3 py-1 rounded-full text-xs border ${
                                kw.found
                                  ? "bg-blue-900/20 text-blue-400 border-blue-800"
                                  : kw.priority
                                  ? getPriorityColor(kw.priority)
                                  : "bg-zinc-800/50 text-zinc-400 border-zinc-700"
                              }`}
                            >
                              {kw.word} {kw.found ? "✓" : "✗"}
                              {kw.priority && ` • ${kw.priority}`}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* For skills with levels */}
                      {item.skills && (
                        <div className="space-y-3">
                          {item.skills.map((skill, idx) => (
                            <div key={idx}>
                              <div className="flex items-center justify-between mb-1">
                                <span
                                  className={`text-sm ${
                                    skill.found ? "text-white" : "text-zinc-600"
                                  }`}
                                >
                                  {skill.name}
                                </span>
                                <span className="text-xs text-zinc-500">
                                  {skill.found
                                    ? `${skill.level}%`
                                    : "Not found"}
                                </span>
                              </div>
                              <div className="w-full bg-zinc-800 rounded-full h-1.5">
                                <div
                                  className={`h-1.5 rounded-full transition-all duration-500 ${
                                    skill.found
                                      ? "bg-linear-to-r from-blue-500 to-purple-500"
                                      : "bg-zinc-700"
                                  }`}
                                  style={{ width: `${skill.level}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* For tips with impact */}
                      {item.tips && (
                        <div className="space-y-3">
                          {item.tips.map((tip, idx) => (
                            <div
                              key={idx}
                              className="border-l-2 border-zinc-700 pl-3"
                            >
                              <div className="flex items-start justify-between mb-1">
                                <h5 className="text-white font-medium text-sm">
                                  {tip.title}
                                </h5>
                                <span
                                  className={`text-xs font-medium ${getImpactColor(
                                    tip.impact
                                  )}`}
                                >
                                  {tip.impact}
                                </span>
                              </div>
                              <p className="text-zinc-400 text-xs">
                                {tip.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
