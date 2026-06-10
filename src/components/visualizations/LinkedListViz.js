import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, ScrollView } from 'react-native';
import * as Haptics from 'expo-haptics';

const INITIAL = [1, 2, 3, 4, 5];

export default function LinkedListViz() {
  const [nodes, setNodes] = useState(INITIAL);
  const [activeIdx, setActiveIdx] = useState(null);
  const [message, setMessage] = useState('Tap Traverse to walk through the chain!');
  const [reversed, setReversed] = useState(false);

  const highlights = useRef(INITIAL.map(() => new Animated.Value(0))).current;

  const traverse = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setMessage('Traversing: following next pointers...');
    for (let i = 0; i < nodes.length; i++) {
      setActiveIdx(i);
      Animated.sequence([
        Animated.timing(highlights[i], { toValue: 1, duration: 200, useNativeDriver: false }),
        Animated.timing(highlights[i], { toValue: 0.3, duration: 100, useNativeDriver: false }),
      ]).start();
      await new Promise(r => setTimeout(r, 500));
    }
    setActiveIdx(null);
    setMessage('Traversal complete! Each node led to the next.');
  };

  const handleReverse = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setNodes(prev => [...prev].reverse());
    setReversed(r => !r);
    setMessage('List reversed! All next pointers now point the other direction.');
  };

  const handlePrepend = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const val = Math.floor(Math.random() * 9) + 1;
    setNodes(prev => [val, ...prev]);
    highlights.unshift(new Animated.Value(0));
    Animated.spring(highlights[0], { toValue: 1, useNativeDriver: false }).start();
    setMessage(`Prepended ${val} as new head — O(1)!`);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setNodes(INITIAL);
    setActiveIdx(null);
    setReversed(false);
    while (highlights.length > INITIAL.length) highlights.pop();
    highlights.forEach(h => h.setValue(0));
    setMessage('Reset to original list.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Linked List Visualizer 🔗</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        <View style={styles.listRow}>
          {nodes.map((val, idx) => (
            <View key={idx} style={styles.nodeWrapper}>
              <Animated.View style={[
                styles.node,
                activeIdx === idx && styles.nodeActive,
                { opacity: highlights[idx]?.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }) || 1 },
              ]}>
                <Text style={styles.nodeVal}>{val}</Text>
                <Text style={styles.nodeNext}>next</Text>
              </Animated.View>
              {idx < nodes.length - 1 && <Text style={styles.arrow}>→</Text>}
              {idx === nodes.length - 1 && <Text style={styles.nullArrow}>→ None</Text>}
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.labels}>
        <Text style={styles.headLabel}>↑ head</Text>
      </View>
      <View style={styles.messageBox}>
        <Text style={styles.message}>{message}</Text>
      </View>
      <View style={styles.btns}>
        {[
          { label: '🚶 Traverse', action: traverse },
          { label: '🔄 Reverse', action: handleReverse },
          { label: '➕ Prepend', action: handlePrepend },
          { label: '↺ Reset', action: handleReset },
        ].map(b => (
          <TouchableOpacity key={b.label} style={styles.btn} onPress={b.action}>
            <Text style={styles.btnText}>{b.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 4, alignItems: 'center' },
  title: { color: '#7c3aed', fontWeight: '700', fontSize: 16, marginBottom: 12 },
  scroll: { width: '100%', marginBottom: 4 },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0f0f1a',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2d2d4a',
    minHeight: 90,
  },
  nodeWrapper: { flexDirection: 'row', alignItems: 'center' },
  node: {
    backgroundColor: '#1e1e3a',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#334155',
    padding: 10,
    alignItems: 'center',
    minWidth: 54,
  },
  nodeActive: { borderColor: '#7c3aed', backgroundColor: '#2d1a4a' },
  nodeVal: { color: '#e2e8f0', fontWeight: '700', fontSize: 16 },
  nodeNext: { color: '#94a3b8', fontSize: 9, marginTop: 2 },
  arrow: { color: '#7c3aed', fontSize: 20, marginHorizontal: 4, fontWeight: '700' },
  nullArrow: { color: '#94a3b8', fontSize: 13, marginLeft: 4 },
  labels: { width: '100%', paddingLeft: 20, marginTop: 2, marginBottom: 8 },
  headLabel: { color: '#06b6d4', fontSize: 12, fontWeight: '700' },
  messageBox: { backgroundColor: '#0f0f1a', borderRadius: 10, padding: 10, marginBottom: 12, width: '100%' },
  message: { color: '#e2e8f0', fontSize: 13, textAlign: 'center' },
  btns: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  btn: {
    backgroundColor: '#1e1e3a', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10,
    borderWidth: 1, borderColor: '#7c3aed',
  },
  btnText: { color: '#e2e8f0', fontWeight: '600', fontSize: 13 },
});
