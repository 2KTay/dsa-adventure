import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, ScrollView } from 'react-native';
import * as Haptics from 'expo-haptics';

const PEOPLE = ['👦', '👧', '👨', '👩', '🧑', '👴', '👵', '🧒'];
let idCounter = 0;

export default function QueueViz() {
  const [queue, setQueue] = useState(
    ['👦', '👧', '👨'].map(p => ({ emoji: p, id: idCounter++ }))
  );
  const [message, setMessage] = useState('Enqueue joins from the right, Dequeue exits from the left!');
  const slideIn = useRef(new Animated.Value(60)).current;

  const handleEnqueue = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const emoji = PEOPLE[Math.floor(Math.random() * PEOPLE.length)];
    const id = idCounter++;
    setQueue(prev => [...prev, { emoji, id }]);
    slideIn.setValue(60);
    Animated.spring(slideIn, { toValue: 0, useNativeDriver: true, tension: 150 }).start();
    setMessage(`${emoji} joined the back of the queue! O(1)`);
  };

  const handleDequeue = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (queue.length === 0) { setMessage('Queue is empty — no one to serve!'); return; }
    const front = queue[0].emoji;
    setQueue(prev => prev.slice(1));
    setMessage(`${front} was served from the FRONT! FIFO — O(1)`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Queue Visualizer — FIFO 🚶</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.queueScroll}>
        <View style={styles.queueRow}>
          {queue.length === 0 && <Text style={styles.empty}>Queue is empty</Text>}
          {queue.map((item, idx) => (
            <Animated.View
              key={item.id}
              style={[
                styles.person,
                idx === 0 && styles.front,
                idx === queue.length - 1 && styles.back,
                idx === queue.length - 1 && { transform: [{ translateX: slideIn }] },
              ]}
            >
              <Text style={styles.emoji}>{item.emoji}</Text>
              {idx === 0 && <Text style={styles.frontLabel}>FRONT</Text>}
              {idx === queue.length - 1 && queue.length > 1 && <Text style={styles.backLabel}>BACK</Text>}
            </Animated.View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.labels}>
        <Text style={styles.dequeueArrow}>⬅ Dequeue exits here</Text>
        <Text style={styles.enqueueArrow}>Enqueue enters here ➡</Text>
      </View>
      <View style={styles.messageBox}>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.fifo}>First In, First Out</Text>
      </View>
      <View style={styles.btns}>
        <TouchableOpacity style={[styles.btn, styles.enqBtn]} onPress={handleEnqueue}>
          <Text style={styles.btnText}>➡ Enqueue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.deqBtn]} onPress={handleDequeue}>
          <Text style={styles.btnText}>⬅ Dequeue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 4, alignItems: 'center' },
  title: { color: '#7c3aed', fontWeight: '700', fontSize: 16, marginBottom: 12 },
  queueScroll: { width: '100%', marginBottom: 8 },
  queueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: '#0f0f1a',
    borderRadius: 12,
    minHeight: 80,
    borderWidth: 2,
    borderColor: '#2d2d4a',
  },
  empty: { color: '#94a3b8', fontStyle: 'italic', fontSize: 14, padding: 20 },
  person: {
    alignItems: 'center',
    backgroundColor: '#1e1e3a',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#334155',
    minWidth: 60,
  },
  front: { borderColor: '#10b981', backgroundColor: '#10b98120' },
  back: { borderColor: '#7c3aed', backgroundColor: '#7c3aed20' },
  emoji: { fontSize: 28 },
  frontLabel: { color: '#10b981', fontSize: 9, fontWeight: '700', marginTop: 2 },
  backLabel: { color: '#7c3aed', fontSize: 9, fontWeight: '700', marginTop: 2 },
  labels: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 8, paddingHorizontal: 4 },
  dequeueArrow: { color: '#10b981', fontSize: 11 },
  enqueueArrow: { color: '#7c3aed', fontSize: 11 },
  messageBox: { backgroundColor: '#0f0f1a', borderRadius: 10, padding: 10, marginBottom: 12, width: '100%', alignItems: 'center' },
  message: { color: '#e2e8f0', fontSize: 13, textAlign: 'center' },
  fifo: { color: '#06b6d4', fontSize: 12, marginTop: 4, fontWeight: '600' },
  btns: { flexDirection: 'row', gap: 12 },
  btn: { borderRadius: 10, paddingHorizontal: 22, paddingVertical: 12, borderWidth: 1 },
  enqBtn: { backgroundColor: '#7c3aed33', borderColor: '#7c3aed' },
  deqBtn: { backgroundColor: '#10b98133', borderColor: '#10b981' },
  btnText: { color: '#e2e8f0', fontWeight: '700', fontSize: 14 },
});
