import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Animated,
  StyleSheet, SafeAreaView, StatusBar,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { TOPICS } from '../data/topics';
import { LEETCODE_PROBLEMS } from '../data/leetcode';
import { markTopicStep, addXP, unlockBadge } from '../utils/storage';
import { XP_VALUES, BADGES, getRandomEncouragement } from '../utils/xp';
import CodeBlock from '../components/CodeBlock';
import LeetCodeCard from '../components/LeetCodeCard';
import ConfettiEffect from '../components/ConfettiEffect';

import ArrayViz from '../components/visualizations/ArrayViz';
import StackViz from '../components/visualizations/StackViz';
import QueueViz from '../components/visualizations/QueueViz';
import LinkedListViz from '../components/visualizations/LinkedListViz';
import HashTableViz from '../components/visualizations/HashTableViz';
import TreeViz from '../components/visualizations/TreeViz';
import GraphViz from '../components/visualizations/GraphViz';
import SortSearchViz from '../components/visualizations/SortSearchViz';

const VIZ_MAP = {
  arrays: <ArrayViz />,
  stacks: <StackViz />,
  queues: <QueueViz />,
  linkedlists: <LinkedListViz />,
  hashtables: <HashTableViz />,
  trees: <TreeViz />,
  bst: <TreeViz />,
  graphs: <GraphViz />,
  linearsearch: <SortSearchViz type="linear" />,
  binarysearch: <SortSearchViz type="binary" />,
  bubblesort: <SortSearchViz type="bubble" />,
  selectionsort: <SortSearchViz type="bubble" />,
  insertionsort: <SortSearchViz type="bubble" />,
  quicksort: <SortSearchViz type="bubble" />,
  mergesort: <SortSearchViz type="merge" />,
  countingsort: <SortSearchViz type="bubble" />,
  radixsort: <SortSearchViz type="bubble" />,
};

const TABS = [
  { key: 'learn', label: '🐣 Learn It' },
  { key: 'viz', label: '🎮 Visualize' },
  { key: 'code', label: '💻 Code' },
  { key: 'lc', label: '🏆 LeetCode' },
];

export default function TopicScreen({ route, navigation }) {
  const { topicKey } = route.params;
  const topic = TOPICS.find(t => t.key === topicKey);
  const problems = LEETCODE_PROBLEMS.filter(p => p.topicKey === topicKey);

  const [activeTab, setActiveTab] = useState('learn');
  const [flippedConcepts, setFlippedConcepts] = useState([]);
  const [toast, setToast] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [xpInfo, setXpInfo] = useState(null);
  const toastAnim = useRef(new Animated.Value(0)).current;
  const tabIndicator = useRef(new Animated.Value(0)).current;

  if (!topic) return null;

  const showToast = (msg) => {
    setToast(msg);
    toastAnim.setValue(0);
    Animated.sequence([
      Animated.timing(toastAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(1800),
      Animated.timing(toastAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  const handleTabChange = async (tab) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveTab(tab);
    const tabIdx = TABS.findIndex(t => t.key === tab);
    Animated.spring(tabIndicator, { toValue: tabIdx, useNativeDriver: true, tension: 120 }).start();

    const stepMap = { viz: 'vizDone', code: 'codeDone' };
    if (stepMap[tab]) {
      const xpAmt = tab === 'viz' ? XP_VALUES.VIZ_TAB : XP_VALUES.CODE_TAB;
      const allDone = await markTopicStep(topicKey, stepMap[tab]);
      const result = await addXP(xpAmt);
      setXpInfo(result);
      showToast(`+${xpAmt} XP! ${getRandomEncouragement()}`);
      if (allDone) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        const badge = BADGES.find(b => b.topicKey === topicKey);
        if (badge) {
          const newBadge = await unlockBadge(badge.id);
          if (newBadge) showToast(`🏆 Badge unlocked: ${badge.label}!`);
        }
      }
    }
  };

  const handleConceptFlip = async (idx) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (!flippedConcepts.includes(idx)) {
      const newFlipped = [...flippedConcepts, idx];
      setFlippedConcepts(newFlipped);
      if (newFlipped.length === topic.concepts.length) {
        await markTopicStep(topicKey, 'learnDone');
        const result = await addXP(XP_VALUES.LEARN_TAB);
        setXpInfo(result);
        showToast(`+${XP_VALUES.LEARN_TAB} XP! All concepts learned!`);
      }
    }
  };

  const handleXPEarned = (amount, result) => {
    setXpInfo(result);
    showToast(`+${amount} XP!`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f1a" />
      <ConfettiEffect visible={showConfetti} />

      {/* Toast */}
      <Animated.View style={[styles.toast, { opacity: toastAnim, transform: [{ translateY: toastAnim.interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }) }] }]}>
        <Text style={styles.toastText}>{toast}</Text>
      </Animated.View>

      {/* Back Button + Header */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); navigation.goBack(); }} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.topicInfo}>
          <Text style={styles.topicEmoji}>{topic.emoji}</Text>
          <Text style={styles.topicName}>{topic.name}</Text>
        </View>
        <View style={[styles.catBadge, { backgroundColor: topic.color + '33' }]}>
          <Text style={[styles.catText, { color: topic.color }]}>{topic.category.split(' ')[0]}</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        {TABS.map((tab, idx) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => handleTabChange(tab.key)}
          >
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* LEARN TAB */}
        {activeTab === 'learn' && (
          <View>
            <View style={styles.analogyCard}>
              <Text style={styles.analogyIcon}>{topic.emoji}</Text>
              <Text style={styles.analogyText}>"{topic.analogy}"</Text>
            </View>
            <Text style={styles.topicDesc}>{topic.description}</Text>
            <Text style={styles.tapHint}>Tap each card to reveal the concept!</Text>
            {topic.concepts.map((concept, idx) => {
              const flipped = flippedConcepts.includes(idx);
              return (
                <TouchableOpacity
                  key={idx}
                  style={[styles.conceptCard, flipped && styles.conceptFlipped]}
                  onPress={() => handleConceptFlip(idx)}
                >
                  <View style={styles.conceptHeader}>
                    <Text style={styles.conceptTitle}>{concept.title}</Text>
                    {flipped ? <Text style={styles.gotIt}>✅</Text> : <Text style={styles.tapMe}>Tap!</Text>}
                  </View>
                  {flipped && <Text style={styles.conceptBody}>{concept.body}</Text>}
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* VIZ TAB */}
        {activeTab === 'viz' && (
          <View style={styles.vizContainer}>
            {VIZ_MAP[topicKey] || <Text style={styles.noViz}>Visualizer coming soon!</Text>}
          </View>
        )}

        {/* CODE TAB */}
        {activeTab === 'code' && (
          <View>
            <View style={styles.codeHeader}>
              <Text style={styles.codeLang}>🐍 Python</Text>
            </View>
            <CodeBlock
              code={topic.code}
              timeComplexity={topic.timeComplexity}
              spaceComplexity={topic.spaceComplexity}
            />
            <View style={styles.interviewNote}>
              <Text style={styles.interviewTitle}>💡 Interview Pattern</Text>
              <Text style={styles.interviewText}>
                This structure appears frequently in coding interviews. Knowing when to use {topic.name} vs alternatives is key to choosing optimal solutions.
              </Text>
            </View>
          </View>
        )}

        {/* LEETCODE TAB */}
        {activeTab === 'lc' && (
          <View>
            <Text style={styles.lcHeader}>
              {problems.length > 0
                ? `${problems.length} Problem${problems.length > 1 ? 's' : ''} — Story → Walkthrough → Solution → Quiz`
                : 'No problems for this topic yet!'}
            </Text>
            {problems.map((problem, idx) => (
              <LeetCodeCard
                key={problem.id}
                problem={problem}
                onXPEarned={handleXPEarned}
              />
            ))}
          </View>
        )}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f0f1a' },
  toast: {
    position: 'absolute', top: 50, left: 20, right: 20, zIndex: 100,
    backgroundColor: '#7c3aed', borderRadius: 12, padding: 12, alignItems: 'center',
  },
  toastText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  topBar: { flexDirection: 'row', alignItems: 'center', padding: 12, gap: 10 },
  backBtn: { padding: 6 },
  backText: { color: '#7c3aed', fontWeight: '700', fontSize: 14 },
  topicInfo: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 },
  topicEmoji: { fontSize: 22 },
  topicName: { color: '#e2e8f0', fontWeight: '800', fontSize: 18 },
  catBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  catText: { fontSize: 11, fontWeight: '700' },
  tabBar: { flexDirection: 'row', backgroundColor: '#1e1e3a', marginHorizontal: 12, borderRadius: 12, padding: 4 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 10 },
  tabActive: { backgroundColor: '#7c3aed' },
  tabLabel: { color: '#94a3b8', fontSize: 11, fontWeight: '600', textAlign: 'center' },
  tabLabelActive: { color: '#fff', fontWeight: '800' },
  scroll: { flex: 1 },
  content: { padding: 16 },
  analogyCard: {
    backgroundColor: '#1e1e3a', borderRadius: 14, padding: 16,
    marginBottom: 12, flexDirection: 'row', alignItems: 'center', gap: 12,
    borderWidth: 1, borderColor: '#7c3aed33',
  },
  analogyIcon: { fontSize: 32 },
  analogyText: { color: '#c084fc', fontStyle: 'italic', fontSize: 15, flex: 1, lineHeight: 22 },
  topicDesc: { color: '#cbd5e1', fontSize: 14, lineHeight: 22, marginBottom: 12 },
  tapHint: { color: '#94a3b8', fontSize: 12, textAlign: 'center', marginBottom: 10 },
  conceptCard: {
    backgroundColor: '#1e1e3a', borderRadius: 12, padding: 14, marginBottom: 10,
    borderWidth: 1, borderColor: '#334155',
  },
  conceptFlipped: { borderColor: '#7c3aed' },
  conceptHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  conceptTitle: { color: '#e2e8f0', fontWeight: '700', fontSize: 14, flex: 1 },
  gotIt: { fontSize: 16 },
  tapMe: { color: '#7c3aed', fontSize: 12, fontWeight: '600' },
  conceptBody: { color: '#94a3b8', fontSize: 13, marginTop: 8, lineHeight: 20 },
  vizContainer: { minHeight: 300 },
  noViz: { color: '#94a3b8', textAlign: 'center', padding: 40, fontSize: 14 },
  codeHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' },
  codeLang: { color: '#94a3b8', fontSize: 13, fontWeight: '600' },
  interviewNote: { backgroundColor: '#1e1e3a', borderRadius: 12, padding: 14, marginTop: 12, borderLeftWidth: 3, borderLeftColor: '#06b6d4' },
  interviewTitle: { color: '#06b6d4', fontWeight: '700', fontSize: 14, marginBottom: 6 },
  interviewText: { color: '#94a3b8', fontSize: 13, lineHeight: 20 },
  lcHeader: { color: '#94a3b8', fontSize: 13, marginBottom: 12, textAlign: 'center' },
});
