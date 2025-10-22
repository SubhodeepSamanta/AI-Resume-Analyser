import { motion } from "framer-motion";

export default function StatsCards({ results }) {
  const stats = [
    {
      label: "ATS Score",
      value: results.score,
      suffix: "/100",
      color: "text-green-400",
    },
    {
      label: "Match",
      value: results.matchPercentage,
      suffix: "%",
      color: "text-blue-400",
    },
    {
      label: "Skills Found",
      value: results.skillsFound,
      suffix: "",
      color: "text-purple-400",
    },
    {
      label: "Suggestions",
      value: results.suggestions,
      suffix: "",
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors"
        >
          <p className="text-zinc-500 text-sm mb-2">{stat.label}</p>
          <p className={`text-4xl font-bold ${stat.color}`}>
            {stat.value}
            <span className="text-2xl">{stat.suffix}</span>
          </p>
        </motion.div>
      ))}
    </div>
  );
}
