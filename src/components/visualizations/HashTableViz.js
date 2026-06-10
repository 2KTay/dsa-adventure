import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Animated, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

const SLOT_COUNT = 7;

function simpleHash(key) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h + key.charCodeAt(i)) % SLOT_COUNT;
  return h;
}

const INITIAL_ENTRIES = [
  { key: 'Alice', value: '555-1234' },
  { key: 'Bob', value: '555-5678' },
  { key: 'Carol', value: '555-9999' },
];

export default function HashTableViz() {
  const [table, setTable] = useState(() => {
    const t = Array.from({ length: SLOT_COUNT }, () => []);
    INITIAL_ENTRIES.forEach(({ key, value }) => {
      const slot = simpleHash(key);
      t[slot] = [...t[slot], { key, value }];
    });
    return t;
  });
  const [inputKey, setInputKey] = useState('');
  const [activeSlot, setActiveSlot] = useState(null);
  const [message, setMessage] = useState('Type a key and tap Insert to see hashing!');
  const arrowAnim = useState(new Animated.Value(0))[0];

  const animateArrow = (slot) => {
    arrowAnim.setValue(0);
    Animated.timing(arrowAnim, { toValue: slot, duration: 500, useNativeDriver: false }).start();
  };

  const handleInsert = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (!inputKey.trim()) return;
    const key = inputKey.trim();
    const slot = simpleHash(key);
    setActiveSlot(slot);
    animateArrow(slot);
    const value = Math.floor(Math.random() * 9000 + 1000).toString();
    const newTable = table.map((s, i) => {
      if (i !== slot) return s;
      const filtered = s.filter(e => e.key !== key);
      return [...filtered, { key, value }];
    });
    setTable(newTable);
    const collision = table[slot].length > 0 && !table[slot].some(e => e.key === key);
    setMessage(
      collision
        ? `"${key}" hashes to slot ${slot}. Collision! Chained with existing entries.`
        : `"${key}" hashes to slot ${slot}. Stored value: ${value}`
    );
    setInputKey('');
    setTimeout(() => setActiveSlot(null), 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hash Table Visualizer 🗝️</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={inputKey}
          onChangeText={setInputKey}
          placeholder="Enter a key (e.g. Dave)"
          placeholderTextColor="#94a3b8"
          returnKeyType="done"
          onSubmitEditing={handleInsert}
        />
        <TouchableOpacity style={styles.insertBtn} onPress={handleInsert}>
          <Text style={styles.insertBtnText}>Insert</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tableContainer}>
        {table.map((slot, idx) => (
          <View key={idx} style={[styles.slot, activeSlot === idx && styles.slotActive]}>
            <Text style={styles.slotIdx}>[{idx}]</Text>
            <View style={styles.slotEntries}>
              {slot.length === 0 ? (
                <Text style={styles.empty}>—</Text>
              ) : (
                slot.map((entry, ei) => (
                  <Text key={ei} style={styles.entry}>
                    {entry.key}: {entry.value}
                    {ei < slot.length - 1 ? ' → ' : ''}
                  </Text>
                ))
              )}
            </View>
          </View>
        ))}
      </View>
      <View style={styles.messageBox}>
        <Text style={styles.message}>{message}</Text>
      </View>
      <Text style={styles.note}>Hash function: sum of char codes mod {SLOT_COUNT}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 4 },
  title: { color: '#7c3aed', fontWeight: '700', fontSize: 16, marginBottom: 12, textAlign: 'center' },
  inputRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  input: {
    flex: 1, backgroundColor: '#1e1e3a', borderRadius: 10, padding: 10,
    color: '#e2e8f0', fontSize: 14, borderWidth: 1, borderColor: '#334155',
  },
  insertBtn: { backgroundColor: '#7c3aed', borderRadius: 10, paddingHorizontal: 16, justifyContent: 'center' },
  insertBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  tableContainer: { backgroundColor: '#0f0f1a', borderRadius: 12, padding: 8, marginBottom: 12, borderWidth: 1, borderColor: '#2d2d4a' },
  slot: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 2,
    backgroundColor: '#1e1e3a',
  },
  slotActive: { backgroundColor: '#7c3aed33', borderWidth: 1, borderColor: '#7c3aed' },
  slotIdx: { color: '#94a3b8', fontWeight: '700', fontSize: 13, width: 28 },
  slotEntries: { flex: 1, flexDirection: 'row', flexWrap: 'wrap' },
  empty: { color: '#334155', fontSize: 13 },
  entry: { color: '#e2e8f0', fontSize: 12 },
  messageBox: { backgroundColor: '#1e1e3a', borderRadius: 10, padding: 10, marginBottom: 8 },
  message: { color: '#e2e8f0', fontSize: 13, textAlign: 'center' },
  note: { color: '#94a3b8', fontSize: 11, textAlign: 'center' },
});
