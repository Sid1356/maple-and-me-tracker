import { useState } from 'react';
import { motion } from 'framer-motion';

const topics = [
  // same topic data structure as before
  // (left unchanged for brevity)
];

export default function DsaMindMap() {
  const [completed, setCompleted] = useState({});

  const toggleComplete = (topic) => {
    setCompleted({ ...completed, [topic]: !completed[topic] });
  };

  const isUnlocked = (topic) => {
    return topic.unlockedBy.every(dep => completed[dep]);
  };

  const maxRow = Math.max(...topics.map(t => t.position.row));
  const maxCol = Math.max(...topics.map(t => t.position.col));

  return (
    <div className="p-6 min-h-screen overflow-auto bg-gray-900 text-white relative">
      <h1 className="text-3xl font-bold text-center mb-10">DSA Roadmap Mind Map (Scaler + NeetCode)</h1>

      <svg className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        {topics.map(source => (
          source.unlockedBy.map(dep => {
            const from = topics.find(t => t.name === dep);
            if (!from) return null;
            const x1 = (from.position.col + 0.5) * 260;
            const y1 = (from.position.row + 1) * 200;
            const x2 = (source.position.col + 0.5) * 260;
            const y2 = source.position.row * 200;
            return (
              <line
                key={from.name + '-' + source.name}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#8884d8"
                strokeWidth="2"
                markerEnd="url(#arrow)"
              />
            );
          })
        ))}
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#8884d8" />
          </marker>
        </defs>
      </svg>

      <div
        className="relative z-10"
        style={{
          display: 'grid',
          gridTemplateRows: `repeat(${maxRow + 1}, 200px)`,
          gridTemplateColumns: `repeat(${maxCol + 1}, 260px)`
        }}
      >
        {topics.map((t, index) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`absolute p-4 rounded-xl shadow-lg bg-gray-800 text-white border border-purple-500 w-60 transition-opacity duration-300 ${!isUnlocked(t) ? 'opacity-30 pointer-events-none' : ''}`}
            style={{ top: `${t.position.row * 200}px`, left: `${t.position.col * 260}px` }}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">{t.name}</h2>
              <button
                onClick={() => toggleComplete(t.name)}
                className={`px-3 py-1 rounded text-white text-sm ${completed[t.name] ? 'bg-green-600' : 'bg-gray-500'}`}
                disabled={!isUnlocked(t)}
              >
                {completed[t.name] ? '✓' : 'Mark Done'}
              </button>
            </div>
            <p className="text-sm text-purple-300 mb-1">Estimated Time: {t.time}</p>
            <ul className="list-disc list-inside text-sm text-purple-100">
              {t.scalerLectures.map((lec, i) => (
                <li key={i}>{lec}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
