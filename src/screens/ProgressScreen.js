import React, { useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { loadProgress } from '../utils/storage';
import { BADGES } from '../utils/xp';
import { TOPICS } from '../data/topics';
import { LEETCODE_PROBLEMS } from '../data/leetcode';
import ProgressRing from '../components/ProgressRing';
import XPBar from '../components/XPBar';
import BadgeCard from '../components/BadgeCard';

export default function ProgressScreen() {
  const [data, setData] = React.useState(null);

  useFocusEffect(
    useCallback(() => { loadProgress().then(setData); }, [])
  );

  if (!data) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Loading progress...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const { completedTopics, topicProgress, xp, streak, lcConfidence, unlockedBadges } = data;
  const overall = completedTopics.length / TOPICS.length;

  // Weak topics: LC problems with confidence <= 2
  const weakTopics = Object.entries(lcConfidence || {})
    .filter(([, rating]) => rating <= 2)
    .map(([id]) => LEETCODE_PROBLEMS.find(p => p.id === id))
    .filter(Boolean);

  const categoryStats = [
    { label: 'Data Structures', keys: ['arrays','stacks','queues','linkedlists','hashtables','trees','bst','graphs'], color: '#7c3aed' },
    { label: 'Search', keys: ['linearsearch','binarysearch'], color: '#0ea5e9' },
    { label: 'Sorting', keys: ['bubblesort','selectionsort','insertionsort','quicksort','mergesort','countingsort','radixsort'], color: '#f59e0b' },
  ].map(cat => ({
    ...cat,
    done: cat.keys.filter(k => completedTopics.includes(k)).length,
    total: cat.keys.length,
  }));

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f1a" />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.title}>📊 Your Progress</Text>

        {/* Overall */}
        <View style={styles.overallCard}>
          <ProgressRing progress={overall} size={110} label="Overall" color="#7c3aed" />
          <View style={styles.overallStats}>
            <XPBar xp={xp} />
            <View style={styles.streakRow}>
              <Text style={styles.statLabel}>🔥 Streak</Text>
              <Text style={styles.statVal}>{streak?.count || 0} days</Text>
            </View>
            <View style={styles.streakRow}>
              <Text style={styles.statLabel}>✅ Completed</Text>
              <Text style={styles.statVal}>{completedTopics.length}/{TOPICS.length}</Text>
            </View>
          </View>
        </View>

        {/* Category Breakdown */}
        <Text style={styles.sectionTitle}>Category Breakdown</Text>
        {categoryStats.map(cat => (
          <View key={cat.label} style={styles.catCard}>
            <View style={styles.catRow}>
              <Text style={[styles.catLabel, { color: cat.color }]}>{cat.label}</Text>
              <Text style={styles.catProgress}>{cat.done}/{cat.total}</Text>
            </View>
            <View style={styles.track}>
              <View style={[styles.fill, { width: `${(cat.done / cat.total) * 100}%`, backgroundColor: cat.color }]} />
            </View>
          </View>
        ))}

        {/* Topic-Level Progress */}
        <Text style={styles.sectionTitle}>Topic Detail</Text>
        {TOPICS.map(topic => {
          const tp = topicProgress?.[topic.key] || {};
          const steps = [
            { key: 'learnDone', label: '🐣' },
            { key: 'vizDone', label: '🎮' },
            { key: 'codeDone', label: '💻' },
            { key: 'lcDone', label: '🏆' },
          ];
          const done = steps.filter(s => tp[s.key]).length;
          return (
            <View key={topic.key} style={styles.topicRow}>
              <Text style={styles.topicEmoji}>{topic.emoji}</Text>
              <Text style={styles.topicName}>{topic.name}</Text>
              <View style={styles.steps}>
                {steps.map(s => (
                  <Text key={s.key} style={{ opacity: tp[s.key] ? 1 : 0.25 }}>{s.label}</Text>
                ))}
              </View>
            </View>
          );
        })}

        {/* Weak Topics */}
        {weakTopics.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>⚠️ Review These</Text>
            {weakTopics.map(p => (
              <View key={p.id} style={styles.weakCard}>
                <Text style={styles.weakNum}>#{p.number}</Text>
                <Text style={styles.weakTitle}>{p.title}</Text>
                <Text style={styles.weakConf}>Confidence: {'★'.repeat(lcConfidence[p.id])}{'☆'.repeat(5 - lcConfidence[p.id])}</Text>
              </View>
            ))}
          </>
        )}

        {/* Badges */}
        <Text style={styles.sectionTitle}>🏆 Badges</Text>
        <View style={styles.badgeGrid}>
          {BADGES.map(badge => (
            <BadgeCard
              key={badge.id}
              badge={badge}
              unlocked={unlockedBadges.includes(badge.id)}
            />
          ))}
        </View>
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f0f1a' },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { color: '#94a3b8', fontSize: 16 },
  scroll: { flex: 1 },
  content: { padding: 16 },
  title: { color: '#e2e8f0', fontSize: 22, fontWeight: '800', marginBottom: 16 },
  overallCard: { flexDirection: 'row', backgroundColor: '#1e1e3a', borderRadius: 16, padding: 16, gap: 16, marginBottom: 16, alignItems: 'center' },
  overallStats: { flex: 1, gap: 10 },
  streakRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statLabel: { color: '#94a3b8', fontSize: 13 },
  statVal: { color: '#e2e8f0', fontWeight: '700', fontSize: 13 },
  sectionTitle: { color: '#7c3aed', fontWeight: '700', fontSize: 15, marginTop: 16, marginBottom: 10 },
  catCard: { backgroundColor: '#1e1e3a', borderRadius: 10, padding: 12, marginBottom: 8 },
  catRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  catLabel: { fontWeight: '700', fontSize: 14 },
  catProgress: { color: '#e2e8f0', fontSize: 13, fontWeight: '600' },
  track: { height: 6, backgroundColor: '#0f0f1a', borderRadius: 3, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 3 },
  topicRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e1e3a', borderRadius: 10, padding: 10, marginBottom: 6, gap: 8 },
  topicEmoji: { fontSize: 18 },
  topicName: { color: '#e2e8f0', fontSize: 13, flex: 1 },
  steps: { flexDirection: 'row', gap: 4 },
  weakCard: { backgroundColor: '#1e1e3a', borderRadius: 10, padding: 12, marginBottom: 8, borderLeftWidth: 3, borderLeftColor: '#f59e0b' },
  weakNum: { color: '#94a3b8', fontSize: 11 },
  weakTitle: { color: '#e2e8f0', fontSize: 14, fontWeight: '600', marginBottom: 4 },
  weakConf: { color: '#f59e0b', fontSize: 12 },
  badgeGrid: { flexDirection: 'row', flexWrap: 'wrap' },
});
