import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';
import * as Haptics from 'expo-haptics';

const NODES = { A: { x: 160, y: 50 }, B: { x: 60, y: 130 }, C: { x: 260, y: 130 }, D: { x: 100, y: 220 }, E: { x: 220, y: 220 } };
const EDGES = [['A','B'],['A','C'],['B','D'],['B','E'],['C','E'],['D','E']];
const GRAPH = { A: ['B','C'], B: ['A','D','E'], C: ['A','E'], D: ['B','E'], E: ['B','C','D'] };

function bfs(start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const n of GRAPH[node]) {
      if (!visited.has(n)) { visited.add(n); queue.push(n); }
    }
  }
  return order;
}

function dfs(start) {
  const visited = new Set();
  const stack = [start];
  const order = [];
  while (stack.length) {
    const node = stack.pop();
    if (visited.has(node)) continue;
    visited.add(node);
    order.push(node);
    for (const n of [...GRAPH[node]].reverse()) {
      if (!visited.has(n)) stack.push(n);
    }
  }
  return order;
}

export default function GraphViz() {
  const [colorMap, setColorMap] = useState({});
  const [message, setMessage] = useState('BFS or DFS from node A!');

  const animate = async (order, label, color) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setColorMap({});
    setMessage(`${label} from A...`);
    const current = {};
    for (let i = 0; i < order.length; i++) {
      current[order[i]] = color;
      setColorMap({ ...current });
      setMessage(`${label} step ${i + 1}: visiting ${order[i]}`);
      await new Promise(r => setTimeout(r, 600));
    }
    setMessage(`${label} complete! Order: ${order.join(' → ')}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Graph Visualizer 🗺️</Text>
      <View style={styles.svgContainer}>
        <Svg width={320} height={280}>
          {EDGES.map(([a, b]) => (
            <Line key={`${a}-${b}`}
              x1={NODES[a].x} y1={NODES[a].y}
              x2={NODES[b].x} y2={NODES[b].y}
              stroke="#334155" strokeWidth={2}
            />
          ))}
          {Object.entries(NODES).map(([label, pos]) => {
            const col = colorMap[label];
            return (
              <React.Fragment key={label}>
                <Circle
                  cx={pos.x} cy={pos.y} r={22}
                  fill={col || '#1e1e3a'}
                  stroke={col ? '#fff' : '#334155'}
                  strokeWidth={2}
                />
                <SvgText x={pos.x} y={pos.y + 6} textAnchor="middle" fill="#e2e8f0" fontSize={16} fontWeight="bold">
                  {label}
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
        <TouchableOpacity style={[styles.btn, { borderColor: '#06b6d4' }]} onPress={() => animate(bfs('A'), 'BFS', '#06b6d4')}>
          <Text style={styles.btnText}>📊 BFS from A</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { borderColor: '#7c3aed' }]} onPress={() => animate(dfs('A'), 'DFS', '#7c3aed')}>
          <Text style={styles.btnText}>🔍 DFS from A</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.note}>BFS uses a queue (wide). DFS uses a stack (deep).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 4, alignItems: 'center' },
  title: { color: '#7c3aed', fontWeight: '700', fontSize: 16, marginBottom: 8 },
  svgContainer: { backgroundColor: '#0f0f1a', borderRadius: 12, padding: 8, marginBottom: 12, borderWidth: 1, borderColor: '#2d2d4a' },
  messageBox: { backgroundColor: '#0f0f1a', borderRadius: 10, padding: 10, marginBottom: 12, width: '100%' },
  message: { color: '#e2e8f0', fontSize: 13, textAlign: 'center' },
  btns: { flexDirection: 'row', gap: 12, marginBottom: 8 },
  btn: { backgroundColor: '#1e1e3a', borderRadius: 10, paddingHorizontal: 18, paddingVertical: 12, borderWidth: 1 },
  btnText: { color: '#e2e8f0', fontWeight: '600', fontSize: 13 },
  note: { color: '#94a3b8', fontSize: 11, textAlign: 'center' },
});
