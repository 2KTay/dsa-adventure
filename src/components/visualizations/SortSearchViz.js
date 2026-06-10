import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Slider } from 'react-native';
import * as Haptics from 'expo-haptics';

const INITIAL_BARS = [64, 34, 25, 12, 22, 11, 90, 45, 78, 33];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

export default function SortSearchViz({ type = 'bubble' }) {
  const [bars, setBars] = useState(INITIAL_BARS.map((v, i) => ({ val: v, id: i, color: '#7c3aed' })));
  const [message, setMessage] = useState('Tap Run to start!');
  const [steps, setSteps] = useState(0);
  const [speed, setSpeed] = useState(300);
  const [searchTarget, setSearchTarget] = useState('25');
  const [running, setRunning] = useState(false);
  const runRef = useRef(true);

  const setColor = (newBars, idx, color) => {
    const b = newBars.map((bar, i) => i === idx ? { ...bar, color } : bar);
    setBars([...b]);
    return b;
  };

  const setColors = (newBars, indices, color) => {
    const b = newBars.map((bar, i) => indices.includes(i) ? { ...bar, color } : bar);
    setBars([...b]);
    return b;
  };

  const swap = (arr, i, j) => {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  };

  const reset = () => {
    runRef.current = false;
    setTimeout(() => {
      const shuffled = [...INITIAL_BARS].sort(() => Math.random() - 0.5);
      setBars(shuffled.map((v, i) => ({ val: v, id: i, color: '#7c3aed' })));
      setMessage('Array reset! Tap Run to start.');
      setSteps(0);
      runRef.current = true;
    }, 100);
  };

  const runBubble = async () => {
    setRunning(true);
    runRef.current = true;
    let arr = bars.map(b => ({ ...b }));
    const n = arr.length;
    let stepCount = 0;
    for (let i = 0; i < n && runRef.current; i++) {
      for (let j = 0; j < n - i - 1 && runRef.current; j++) {
        arr = setColors(arr, [j, j + 1], '#f59e0b');
        setMessage(`Comparing ${arr[j].val} and ${arr[j + 1].val}`);
        await sleep(speed);
        if (arr[j].val > arr[j + 1].val) {
          swap(arr, j, j + 1);
          arr = setColors(arr, [j, j + 1], '#ef4444');
          setMessage(`${arr[j + 1].val} > ${arr[j].val} — SWAP!`);
          await sleep(speed);
        }
        arr = setColors(arr, [j, j + 1], '#7c3aed');
        stepCount++;
        setSteps(stepCount);
      }
      arr = setColor(arr, n - i - 1, '#10b981');
    }
    arr.forEach((_, i) => { arr = setColor(arr, i, '#10b981'); });
    setMessage(`Sorted! ${stepCount} comparisons`);
    setRunning(false);
  };

  const runLinear = async () => {
    setRunning(true);
    runRef.current = true;
    const target = parseInt(searchTarget);
    let arr = bars.map(b => ({ ...b, color: '#7c3aed' }));
    setBars([...arr]);
    let found = false;
    for (let i = 0; i < arr.length && runRef.current; i++) {
      arr = setColor(arr, i, '#f59e0b');
      setMessage(`Checking index ${i}: ${arr[i].val} === ${target}?`);
      setSteps(i + 1);
      await sleep(speed);
      if (arr[i].val === target) {
        arr = setColor(arr, i, '#10b981');
        setMessage(`Found ${target} at index ${i}! (${i + 1} steps)`);
        found = true;
        break;
      } else {
        arr = setColor(arr, i, '#334155');
      }
    }
    if (!found) setMessage(`${target} not found after ${arr.length} checks`);
    setRunning(false);
  };

  const runBinary = async () => {
    setRunning(true);
    runRef.current = true;
    const sorted = [...bars].sort((a, b) => a.val - b.val);
    setBars(sorted.map(b => ({ ...b, color: '#7c3aed' })));
    await sleep(500);
    const target = parseInt(searchTarget);
    let arr = sorted.map(b => ({ ...b }));
    let left = 0, right = arr.length - 1;
    let stepCount = 0;
    while (left <= right && runRef.current) {
      const mid = Math.floor((left + right) / 2);
      stepCount++;
      setSteps(stepCount);
      arr = arr.map((b, i) => ({
        ...b,
        color: i < left || i > right ? '#1e1e3a' : i === mid ? '#f59e0b' : '#7c3aed',
      }));
      setBars([...arr]);
      setMessage(`left=${left} mid=${mid} right=${right} — arr[${mid}]=${arr[mid].val}`);
      await sleep(speed);
      if (arr[mid].val === target) {
        arr = setColor(arr, mid, '#10b981');
        setMessage(`Found ${target} at index ${mid} in ${stepCount} steps! (log₂n ≈ ${Math.ceil(Math.log2(arr.length))})`);
        break;
      } else if (target < arr[mid].val) {
        arr = setColor(arr, mid, '#ef444466');
        right = mid - 1;
        setMessage(`${target} < ${arr[mid].val} — search LEFT half`);
      } else {
        arr = setColor(arr, mid, '#ef444466');
        left = mid + 1;
        setMessage(`${target} > ${arr[mid].val} — search RIGHT half`);
      }
      await sleep(speed);
    }
    if (!bars.some(b => b.color === '#10b981')) {
      setMessage(`${target} not found!`);
    }
    setRunning(false);
  };

  const runMerge = async () => {
    setRunning(true);
    runRef.current = true;
    let arr = bars.map(b => ({ ...b }));
    const n = arr.length;
    let stepCount = 0;

    const mergeSegment = async (a, left, mid, right) => {
      const L = a.slice(left, mid + 1);
      const R = a.slice(mid + 1, right + 1);
      let i = 0, j = 0, k = left;
      while (i < L.length && j < R.length) {
        if (L[i].val <= R[j].val) { a[k] = { ...L[i], color: '#f59e0b' }; i++; }
        else { a[k] = { ...R[j], color: '#f59e0b' }; j++; }
        k++;
        setBars([...a]);
        setMessage(`Merging: placing ${a[k - 1].val}`);
        stepCount++;
        setSteps(stepCount);
        await sleep(speed);
      }
      while (i < L.length) { a[k++] = { ...L[i++], color: '#7c3aed' }; }
      while (j < R.length) { a[k++] = { ...R[j++], color: '#7c3aed' }; }
      for (let x = left; x <= right; x++) a[x] = { ...a[x], color: '#10b981' };
      setBars([...a]);
      await sleep(speed / 2);
    };

    for (let size = 1; size < n; size *= 2) {
      for (let left = 0; left < n; left += 2 * size) {
        const mid = Math.min(left + size - 1, n - 1);
        const right = Math.min(left + 2 * size - 1, n - 1);
        if (mid < right) await mergeSegment(arr, left, mid, right);
        if (!runRef.current) break;
      }
    }
    setMessage(`Merge Sort complete! ${stepCount} operations`);
    setRunning(false);
  };

  const getRunFn = () => {
    if (type === 'linear') return runLinear;
    if (type === 'binary') return runBinary;
    if (type === 'merge') return runMerge;
    return runBubble;
  };

  const maxVal = Math.max(...bars.map(b => b.val));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {type === 'linear' ? 'Linear Search' : type === 'binary' ? 'Binary Search' : type === 'merge' ? 'Merge Sort' : 'Bubble Sort'} Visualizer
      </Text>
      {(type === 'linear' || type === 'binary') && (
        <View style={styles.searchRow}>
          <Text style={styles.searchLabel}>Search for:</Text>
          <TextInput
            style={styles.searchInput}
            value={searchTarget}
            onChangeText={setSearchTarget}
            keyboardType="number-pad"
            maxLength={3}
          />
        </View>
      )}
      <View style={styles.chart}>
        {bars.map((bar, idx) => (
          <View key={bar.id} style={styles.barWrapper}>
            <View style={[styles.bar, { height: (bar.val / maxVal) * 140 + 10, backgroundColor: bar.color }]} />
            <Text style={styles.barVal}>{bar.val}</Text>
          </View>
        ))}
      </View>
      <View style={styles.messageBox}>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.steps}>Steps: {steps}</Text>
      </View>
      <View style={styles.speedRow}>
        <Text style={styles.speedLabel}>Speed: {speed > 400 ? 'Slow' : speed > 150 ? 'Medium' : 'Fast'}</Text>
      </View>
      <View style={styles.btns}>
        <TouchableOpacity
          style={[styles.btn, styles.runBtn, running && styles.disabled]}
          onPress={running ? undefined : getRunFn()}
          disabled={running}
        >
          <Text style={styles.btnText}>{running ? '⏳ Running...' : '▶ Run'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.slowBtn]} onPress={() => setSpeed(600)}>
          <Text style={styles.btnText}>🐢 Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.fastBtn]} onPress={() => setSpeed(80)}>
          <Text style={styles.btnText}>⚡ Fast</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.resetBtn]} onPress={reset}>
          <Text style={styles.btnText}>↺ Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 4 },
  title: { color: '#7c3aed', fontWeight: '700', fontSize: 15, marginBottom: 10, textAlign: 'center' },
  searchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'center', gap: 8 },
  searchLabel: { color: '#94a3b8', fontSize: 13 },
  searchInput: { backgroundColor: '#1e1e3a', borderRadius: 8, padding: 6, color: '#e2e8f0', width: 60, borderWidth: 1, borderColor: '#334155', textAlign: 'center', fontSize: 14 },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#0f0f1a',
    borderRadius: 12,
    padding: 10,
    minHeight: 160,
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#2d2d4a',
    marginBottom: 10,
  },
  barWrapper: { alignItems: 'center', gap: 2 },
  bar: { width: 22, borderRadius: 4, minHeight: 10 },
  barVal: { color: '#94a3b8', fontSize: 9 },
  messageBox: { backgroundColor: '#0f0f1a', borderRadius: 10, padding: 10, marginBottom: 8, alignItems: 'center' },
  message: { color: '#e2e8f0', fontSize: 12, textAlign: 'center' },
  steps: { color: '#7c3aed', fontSize: 12, marginTop: 2 },
  speedRow: { alignItems: 'center', marginBottom: 8 },
  speedLabel: { color: '#94a3b8', fontSize: 12 },
  btns: { flexDirection: 'row', gap: 6, justifyContent: 'center', flexWrap: 'wrap' },
  btn: { borderRadius: 8, paddingHorizontal: 12, paddingVertical: 9, borderWidth: 1, borderColor: '#334155', backgroundColor: '#1e1e3a' },
  runBtn: { borderColor: '#7c3aed', backgroundColor: '#7c3aed33' },
  slowBtn: { borderColor: '#f59e0b' },
  fastBtn: { borderColor: '#10b981' },
  resetBtn: { borderColor: '#ef4444' },
  disabled: { opacity: 0.5 },
  btnText: { color: '#e2e8f0', fontWeight: '600', fontSize: 13 },
});
