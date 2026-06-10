import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';
import * as Haptics from 'expo-haptics';

const TREE = {
  val: 1,
  left: {
    val: 2,
    left: { val: 4, left: null, right: null },
    right: { val: 5, left: null, right: null },
  },
  right: {
    val: 3,
    left: { val: 6, left: null, right: null },
    right: { val: 7, left: null, right: null },
  },
};

function getInorder(node, result = []) {
  if (!node) return result;
  getInorder(node.left, result);
  result.push(node.val);
  getInorder(node.right, result);
  return result;
}

function getBFS(root) {
  const result = [];
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    if (!node) continue;
    result.push(node.val);
    queue.push(node.left, node.right);
  }
  return result;
}

const NODE_POSITIONS = {
  1: { x: 160, y: 30 },
  2: { x: 80, y: 90 },
  3: { x: 240, y: 90 },
  4: { x: 40, y: 150 },
  5: { x: 120, y: 150 },
  6: { x: 200, y: 150 },
  7: { x: 280, y: 150 },
};

const EDGES = [
  [1, 2], [1, 3], [2, 4], [2, 5], [3, 6], [3, 7],
];

export default function TreeViz() {
  const [activeNodes, setActiveNodes] = useState(new Set());
  const [message, setMessage] = useState('Tap a traversal to see the order!');

  const animate = async (order, label) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveNodes(new Set());
    setMessage(`${label}: visiting...`);
    const current = new Set();
    for (const val of order) {
      current.add(val);
      setActiveNodes(new Set(current));
      await new Promise(r => setTimeout(r, 500));
    }
    setMessage(`${label} order: ${order.join(' → ')}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tree Visualizer 🌳</Text>
      <View style={styles.svgContainer}>
        <Svg width={320} height={190}>
          {EDGES.map(([from, to]) => {
            const f = NODE_POSITIONS[from];
            const t = NODE_POSITIONS[to];
            return (
              <Line key={`${from}-${to}`}
                x1={f.x} y1={f.y + 16} x2={t.x} y2={t.y - 16}
                stroke="#334155" strokeWidth={2}
              />
            );
          })}
          {Object.entries(NODE_POSITIONS).map(([val, pos]) => {
            const v = parseInt(val);
            const active = activeNodes.has(v);
            return (
              <React.Fragment key={val}>
                <Circle
                  cx={pos.x} cy={pos.y} r={18}
                  fill={active ? '#7c3aed' : '#1e1e3a'}
                  stroke={active ? '#c084fc' : '#334155'}
                  strokeWidth={2}
                />
                <SvgText
                  x={pos.x} y={pos.y + 5}
                  textAnchor="middle"
                  fill={active ? '#fff' : '#94a3b8'}
                  fontSize={14} fontWeight="bold"
                >
                  {val}
                </SvgText>
              </React.Fragment>
            );
          })}
        </Svg>
      </View>
      <View style={styles.messageBox}>
        <Text style={styles.message}>{message}</Text>
      </View>
      <View style={styles.btns}>
        <TouchableOpacity style={styles.btn} onPress={() => animate(getInorder(TREE), 'Inorder (L→Root→R)')}>
          <Text style={styles.btnText}>📂 Inorder DFS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => animate(getBFS(TREE), 'BFS Level-Order')}>
          <Text style={styles.btnText}>📊 BFS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => animate([1, 2, 3, 4, 5, 6, 7], 'Preorder (Root→L→R)')}>
          <Text style={styles.btnText}>🌱 Preorder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 4, alignItems: 'center' },
  title: { color: '#7c3aed', fontWeight: '700', fontSize: 16, marginBottom: 8 },
  svgContainer: { backgroundColor: '#0f0f1a', borderRadius: 12, padding: 8, marginBottom: 12, borderWidth: 1, borderColor: '#2d2d4a' },
  messageBox: { backgroundColor: '#0f0f1a', borderRadius: 10, padding: 10, marginBottom: 12, width: '100%' },
  message: { color: '#e2e8f0', fontSize: 13, textAlign: 'center' },
  btns: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  btn: { backgroundColor: '#1e1e3a', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, borderColor: '#7c3aed' },
  btnText: { color: '#e2e8f0', fontWeight: '600', fontSize: 13 },
});
