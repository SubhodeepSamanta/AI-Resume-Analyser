import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnalysisAccordion({ details }) {
  const [openSection, setOpenSection] = useState(null);

  const sections = [
    {
      id: "strengths",
      title: "Strengths",
      icon: "✓",
      items: details.strengths,
    },
    {
      id: "improvements",
      title: "Areas for Improvement",
      icon: "→",
      items: details.improvements,
    },
    {
      id: "keywords",
      title: "Keyword Analysis",
      icon: "#",
      items: details.keywords.map((kw) => `${kw.word} ${kw.found ? "✓" : "✗"}`),
    },
  ];

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
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
                <div className="px-6 py-4 space-y-2">
                  {section.items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-2 text-zinc-400"
                    >
                      <span className="text-zinc-600 mt-1">•</span>
                      <span>{item}</span>
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
