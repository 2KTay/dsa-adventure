import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

const COLORS = ['#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6'];
const INITIAL = [10, 20, 30, 40, 50];

export default function ArrayViz() {
  const [arr, setArr] = useState(INITIAL.map((v, i) => ({ val: v, id: i })));
  const [highlighted, setHighlighted] = useState(null);
  const [message, setMessage] = useState('Tap an operation below!');
  const [complexity, setComplexity] = useState('');
  const scales = useRef(INITIAL.map(() => new Animated.Value(1))).current;
  let nextId = useRef(arr.length);

  const flash = (idx) => {
    Animated.sequence([
      Animated.spring(scales[idx], { toValue: 1.3, useNativeDriver: true, tension: 300 }),
      Animated.spring(scales[idx], { toValue: 1.0, useNativeDriver: true, tension: 100 }),
    ]).start();
  };

  const ops = [
    {
      label: 'Access [2]',
      complexity: 'O(1)',
      action: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setHighlighted(2);
        flash(Math.min(2, arr.length - 1));
        setMessage(`arr[2] = ${arr[2]?.val ?? '?'} — direct access, no searching!`);
        setComplexity('O(1)');
        setTimeout(() => setHighlighted(null), 1500);
      },
    },
    {
      label: 'Append',
      complexity: 'O(1)',
      action: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        const val = Math.floor(Math.random() * 90) + 10;
        const newArr = [...arr, { val, id: nextId.current++ }];
        scales.push(new Animated.Value(0));
        setArr(newArr);
        const idx = newArr.length - 1;
        Animated.spring(scales[idx], { toValue: 1, useNativeDriver: true, tension: 200 }).start();
        setMessage(`Appended ${val} to the end!`);
        setComplexity('O(1)');
      },
    },
    {
      label: 'Pop',
      complexity: 'O(1)',
      action: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        if (arr.length === 0) return;
        const last = arr[arr.length - 1];
        setMessage(`Popped ${last.val} from the end!`);
        setComplexity('O(1)');
        setArr(arr.slice(0, -1));
      },
    },
    {
      label: 'Insert at 1',
      complexity: 'O(n)',
      action: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        const val = Math.floor(Math.random() * 90) + 10;
        const newArr = [...arr.slice(0, 1), { val, id: nextId.current++ }, ...arr.slice(1)];
        scales.splice(1, 0, new Animated.Value(0));
        setArr(newArr);
        Animated.spring(scales[1], { toValue: 1, useNativeDriver: true, tension: 200 }).start();
        setMessage(`Inserted ${val} at index 1 — all other elements shifted right! O(n)`);
        setComplexity('O(n)');
      },
    },
    {
      label: 'Reset',
      complexity: '',
      action: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setArr(INITIAL.map((v, i) => ({ val: v, id: i })));
        while (scales.length > INITIAL.length) scales.pop();
        while (scales.length < INITIAL.length) scales.push(new Animated.Value(1));
        scales.forEach(s => s.setValue(1));
        setHighlighted(null);
        setMessage('Array reset!');
        setComplexity('');
      },
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Array Visualizer</Text>
      <View style={styles.arrayRow}>
        {arr.map((item, idx) => (
          <Animated.View
            key={item.id}
            style={[
              styles.box,
              highlighted === idx && styles.boxHighlighted,
              { transform: [{ scale: scales[idx] || new Animated.Value(1) }] },
              { backgroundColor: COLORS[idx % COLORS.length] + '33', borderColor: COLORS[idx % COLORS.length] },
            ]}
          >
            <Text style={styles.val}>{item.val}</Text>
            <Text style={styles.index}>[{idx}]</Text>
          </Animated.View>
        ))}
      </View>
      <View style={styles.messageBox}>
        <Text style={styles.message}>{message}</Text>
        {complexity ? <Text style={styles.complexity}>{complexity}</Text> : null}
      </View>
      <View style={styles.ops}>
        {ops.map(op => (
          <TouchableOpacity key={op.label} style={styles.opBtn} onPress={op.action}>
            <Text style={styles.opLabel}>{op.label}</Text>
            {op.complexity ? <Text style={styles.opComp}>{op.complexity}</Text> : null}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 4 },
  title: { color: '#7c3aed', fontWeight: '700', fontSize: 16, marginBottom: 12, textAlign: 'center' },
  arrayRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 16, minHeight: 60 },
  box: {
    width: 52, height: 56, borderRadius: 10, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center',
  },
  boxHighlighted: { backgroundColor: '#7c3aed55', borderColor: '#c084fc' },
  val: { color: '#e2e8f0', fontWeight: '700', fontSize: 15 },
  index: { color: '#94a3b8', fontSize: 10 },
  messageBox: { backgroundColor: '#0f0f1a', borderRadius: 10, padding: 10, marginBottom: 12, alignItems: 'center' },
  message: { color: '#e2e8f0', fontSize: 13, textAlign: 'center' },
  complexity: { color: '#7c3aed', fontWeight: '700', fontSize: 12, marginTop: 4 },
  ops: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  opBtn: {
    backgroundColor: '#1e1e3a', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10,
    alignItems: 'center', borderWidth: 1, borderColor: '#334155',
  },
  opLabel: { color: '#e2e8f0', fontSize: 13, fontWeight: '600' },
  opComp: { color: '#7c3aed', fontSize: 11, marginTop: 2 },
});
