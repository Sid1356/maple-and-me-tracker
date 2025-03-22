import { useState } from 'react';

const topics = [
  {
    name: 'Arrays & Hashing',
    time: '5-7 days',
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
    scalerLectures: [
      'DSA 3: Lab Session on Maths & 2 Pointers'
    ]
  },
  {
    name: 'Stack',
    time: '2-3 days',
    scalerLectures: [
      'DSA 2: Stacks',
      'DSA 2: Lab Session on Stacks'
    ]
  },
  {
    name: 'Queue',
    time: '2-3 days',
    scalerLectures: [
      'DSA 2: Queues: Implementation & Problems'
    ]
  },
  {
    name: 'Linked List',
    time: '5-6 days',
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
    scalerLectures: [
      'DSA 2: Searching 1 – Binary Search on Array',
      'DSA 2: Searching 2 – Binary Search Problems',
      'DSA 2: Searching 3 – Binary Search on Answer'
    ]
  },
  {
    name: 'Trees',
    time: '6-8 days',
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
    scalerLectures: [
      'DSA 3: Backtracking',
      'DSA 3: Lab Session on Backtracking'
    ]
  },
  {
    name: 'Heap / Priority Queue',
    time: '2-3 days',
    scalerLectures: [
      'DSA 4: Heaps 1 – Introduction',
      'DSA 4: Heaps 2 – Problems'
    ]
  },
  {
    name: 'Greedy',
    time: '2-3 days',
    scalerLectures: ['DSA 4: Greedy']
  },
  {
    name: 'Dynamic Programming',
    time: '8-10 days',
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

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold">DSA Roadmap Mind Map (Scaler + NeetCode)</h1>
      {topics.map((t) => (
        <div key={t.name} className="border p-4 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{t.name}</h2>
            <button
              onClick={() => toggleComplete(t.name)}
              className={`px-4 py-1 rounded text-white ${completed[t.name] ? 'bg-green-600' : 'bg-gray-500'}`}
            >
              {completed[t.name] ? '✓ Done' : 'Mark Done'}
            </button>
          </div>
          <p className="text-sm text-gray-500">Estimated Time: {t.time}</p>
          <ul className="list-disc list-inside mt-2">
            {t.scalerLectures.map((lec, i) => (
              <li key={i}>{lec}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
