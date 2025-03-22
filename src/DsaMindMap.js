import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const topics = [
  {
    name: 'Arrays & Hashing',
    time: '5-7 days',
    unlockedBy: [],
    position: { row: 0, col: 1 },
    scalerLectures: [
      'DSA 1: Arrays 1 – One Dimensional',
      'DSA 1: Arrays 2 – Two Dimensional',
      'DSA 1: Arrays 3 – Interview Problems',
      'DSA 1: Hashing 1 – Introduction',
      'DSA 1: Hashing 2 – Problems'
    ]
  },
  {
    name: 'Two Pointers',
    time: '3-4 days',
    unlockedBy: ['Arrays & Hashing'],
    position: { row: 1, col: 0 },
    scalerLectures: ['DSA 3: Lab Session on Maths & 2 Pointers']
  },
  {
    name: 'Stack',
    time: '2-3 days',
    unlockedBy: ['Arrays & Hashing'],
    position: { row: 1, col: 2 },
    scalerLectures: ['DSA 2: Stacks', 'DSA 2: Lab Session on Stacks']
  },
  {
    name: 'Queue',
    time: '2-3 days',
    unlockedBy: ['Stack'],
    position: { row: 2, col: 0 },
    scalerLectures: ['DSA 2: Queues: Implementation & Problems']
  },
  {
    name: 'Linked List',
    time: '5-6 days',
    unlockedBy: ['Stack'],
    position: { row: 2, col: 2 },
    scalerLectures: [
      'DSA 2: Linked List: Basic Problems',
      'DSA 3: Linked List: Sorting and Problems',
      'DSA 3: Linked List: Doubly Linked List & Detecting Loop',
      'DSA 3: Linked list leftover problems'
    ]
  },
  {
    name: 'Binary Search',
    time: '3-4 days',
    unlockedBy: ['Two Pointers'],
    position: { row: 2, col: 1 },
    scalerLectures: [
      'DSA 2: Searching 1 – Binary Search on Array',
      'DSA 2: Searching 2 – Binary Search Problems',
      'DSA 2: Searching 3 – Binary Search on Answer'
    ]
  },
  {
    name: 'Trees',
    time: '6-8 days',
    unlockedBy: ['Binary Search', 'Linked List'],
    position: { row: 3, col: 1 },
    scalerLectures: [
      'DSA 2: Trees 1 – Structure & Traversal',
      'DSA 2: Trees 2 – BST',
      'DSA 3: Trees 4 – Morris Inorder Traversal + LCA',
      'DSA 3: Lab Session on Binary Trees 2'
    ]
  },
  {
    name: 'Backtracking',
    time: '3-4 days',
    unlockedBy: ['Trees'],
    position: { row: 4, col: 2 },
    scalerLectures: ['DSA 3: Backtracking', 'DSA 3: Lab Session on Backtracking']
  },
  {
    name: 'Heap / Priority Queue',
    time: '2-3 days',
    unlockedBy: ['Trees'],
    position: { row: 4, col: 0 },
    scalerLectures: ['DSA 4: Heaps 1 – Introduction', 'DSA 4: Heaps 2 – Problems']
  },
  {
    name: 'Greedy',
    time: '2-3 days',
    unlockedBy: ['Heap / Priority Queue'],
    position: { row: 5, col: 0 },
    scalerLectures: ['DSA 4: Greedy']
  },
  {
    name: 'Dynamic Programming',
    time: '8-10 days',
    unlockedBy: ['Backtracking'],
    position: { row: 5, col: 2 },
    scalerLectures: [
      'DSA 4: DP 1 – One Dimensional',
      'DSA 4: DP 2 – Two Dimensional',
      'DSA 4: DP 3 – Knapsack',
      'DSA 4: DP 4 – Applications of Knapsack'
    ]
  },
  {
    name: 'Graphs',
    time: '6-8 days',
    unlockedBy: ['Backtracking'],
    position: { row: 5, col: 1 },
    scalerLectures: [
      'DSA 4: Graphs 1 – Introduction, DFS & Cycle Detection',
      'DSA 4: Graphs 2 – BFS & Matrix Questions',
      'DSA 4: Graphs 3 – MST (Prims Algo) & Dijkstra Algo'
    ]
  }
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

  return (
    <div className="p-6 space-y-6 overflow-x-auto relative">
      <h1 className="text-3xl font-bold text-center">DSA Roadmap Mind Map (Scaler + NeetCode)</h1>

      <svg className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        {topics.map(source => (
          source.unlockedBy.map(dep => {
            const from = topics.find(t => t.name === dep);
            if (!from) return null;
            const x1 = (from.position.col + 0.5) * 288; // 256 width + 32 gap
            const y1 = (from.position.row + 1) * 160; // approx row height
            const x2 = (source.position.col + 0.5) * 288;
            const y2 = source.position.row * 160;
            return (
              <line
                key={from.name + '-' + source.name}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#cbd5e0"
                strokeWidth="2"
                markerEnd="url(#arrow)"
              />
            );
          })
        ))}
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#cbd5e0" />
          </marker>
        </defs>
      </svg>

      <div className="min-w-[1000px] grid gap-8 z-10 relative" style={{ gridTemplateRows: `repeat(${maxRow + 1}, auto)` }}>
        {[...Array(maxRow + 1)].map((_, row) => (
          <div key={row} className="flex justify-center gap-8">
            {topics.filter(t => t.position.row === row).map((t, index) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`border p-4 rounded-xl shadow-md bg-white transition-opacity duration-300 w-64 text-center ${!isUnlocked(t) ? 'opacity-30 pointer-events-none' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold">{t.name}</h2>
                  <button
                    onClick={() => toggleComplete(t.name)}
                    className={`px-3 py-1 rounded text-white text-sm ${completed[t.name] ? 'bg-green-600' : 'bg-gray-500'}`}
                    disabled={!isUnlocked(t)}
                  >
                    {completed[t.name] ? '✓' : 'Mark Done'}
                  </button>
                </div>
                <p className="text-sm text-gray-500">Estimated Time: {t.time}</p>
                <ul className="list-disc list-inside mt-2 text-left text-sm">
                  {t.scalerLectures.map((lec, i) => (
                    <li key={i}>{lec}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
