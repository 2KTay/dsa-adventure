import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

const EMOJIS = ['🥞', '🍕', '📚', '🎮', '🎸', '🎯', '🏆'];

export default function StackViz() {
  const [stack, setStack] = useState(['🥞', '🍕', '📚']);
  const [message, setMessage] = useState('Push to add to top, Pop to remove from top!');
  const topAnim = useRef(new Animated.Value(0)).current;

  const spring = () => {
    topAnim.setValue(-30);
    Animated.spring(topAnim, { toValue: 0, useNativeDriver: true, tension: 200, friction: 6 }).start();
  };

  const handlePush = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    setStack(prev => [...prev, emoji]);
    spring();
    setMessage(`Pushed ${emoji} onto the top! Size: ${stack.length + 1}`);
  };

  const handlePop = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (stack.length === 0) { setMessage('Stack is empty — nothing to pop!'); return; }
    const top = stack[stack.length - 1];
    setStack(prev => prev.slice(0, -1));
    setMessage(`Popped ${top} from the top! O(1)`);
  };

  const handlePeek = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (stack.length === 0) { setMessage('Stack is empty!'); return; }
    setMessage(`Peek: top is ${stack[stack.length - 1]} — not removed!`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stack Visualizer — LIFO 🥞</Text>
      <View style={styles.stackContainer}>
        {stack.length === 0 && <Text style={styles.empty}>Stack is empty</Text>}
        {[...stack].reverse().map((item, idx) => (
          <Animated.View
            key={idx}
            style={[
              styles.block,
              idx === 0 && styles.topBlock,
              idx === 0 && { transform: [{ translateY: topAnim }] },
            ]}
          >
            <Text style={styles.emoji}>{item}</Text>
            {idx === 0 && <Text style={styles.topLabel}>← TOP</Text>}
          </Animated.View>
        ))}
      </View>
      <View style={styles.info}>
        <Text style={styles.infoText}>Size: {stack.length}</Text>
        <Text style={styles.lifo}>LIFO — Last In, First Out</Text>
      </View>
      <View style={styles.messageBox}>
        <Text style={styles.message}>{message}</Text>
      </View>
      <View style={styles.btns}>
        <TouchableOpacity style={[styles.btn, styles.pushBtn]} onPress={handlePush}>
          <Text style={styles.btnText}>⬆ Push</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.popBtn]} onPress={handlePop}>
          <Text style={styles.btnText}>⬇ Pop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.peekBtn]} onPress={handlePeek}>
          <Text style={styles.btnText}>👀 Peek</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 4, alignItems: 'center' },
  title: { color: '#7c3aed', fontWeight: '700', fontSize: 16, marginBottom: 12 },
  stackContainer: {
    backgroundColor: '#0f0f1a',
    borderRadius: 12,
    padding: 12,
    minHeight: 180,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderWidth: 2,
    borderColor: '#2d2d4a',
    marginBottom: 12,
  },
  empty: { color: '#94a3b8', fontStyle: 'italic', fontSize: 14 },
  block: {
    width: '90%',
    backgroundColor: '#1e1e3a',
    borderRadius: 10,
    padding: 12,
    marginTop: 4,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  topBlock: { borderColor: '#7c3aed', backgroundColor: '#2d1a4a' },
  emoji: { fontSize: 24 },
  topLabel: { color: '#7c3aed', fontSize: 12, fontWeight: '700', marginLeft: 10 },
  info: { flexDirection: 'row', gap: 16, marginBottom: 8 },
  infoText: { color: '#94a3b8', fontSize: 13 },
  lifo: { color: '#06b6d4', fontSize: 13, fontWeight: '600' },
  messageBox: { backgroundColor: '#0f0f1a', borderRadius: 10, padding: 10, marginBottom: 12, width: '100%' },
  message: { color: '#e2e8f0', fontSize: 13, textAlign: 'center' },
  btns: { flexDirection: 'row', gap: 10 },
  btn: { borderRadius: 10, paddingHorizontal: 20, paddingVertical: 12, borderWidth: 1 },
  pushBtn: { backgroundColor: '#10b98133', borderColor: '#10b981' },
  popBtn: { backgroundColor: '#ef444433', borderColor: '#ef4444' },
  peekBtn: { backgroundColor: '#06b6d433', borderColor: '#06b6d4' },
  btnText: { color: '#e2e8f0', fontWeight: '700', fontSize: 14 },
});
