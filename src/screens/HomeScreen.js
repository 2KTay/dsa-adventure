import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Animated,
  StyleSheet, SafeAreaView, StatusBar,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { TOPICS } from '../data/topics';
import { loadProgress, updateStreak, saveLastTopic } from '../utils/storage';
import ProgressRing from '../components/ProgressRing';
import XPBar from '../components/XPBar';
import ConfettiEffect from '../components/ConfettiEffect';

const SNAKE_FRAMES = ['🐍', '🐍', '🐉'];

export default function HomeScreen({ navigation }) {
  const [progressData, setProgressData] = useState({
    completedTopics: [], xp: 0, streak: { count: 0 }, lastTopic: null,
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const snakeScale = useRef(new Animated.Value(1)).current;
  const snakeY = useRef(new Animated.Value(0)).current;
  const frameIdx = useRef(0);
  const [snakeEmoji, setSnakeEmoji] = useState('🐍');
  const cardAnims = useRef(TOPICS.map(() => new Animated.Value(0))).current;

  useFocusEffect(
    useCallback(() => {
      loadProgress().then(data => {
        setProgressData(data);
        if (data.completedTopics.length > 0 && data.completedTopics.length % 5 === 0) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
      });
      updateStreak();
    }, [])
  );

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.spring(snakeY, { toValue: -12, useNativeDriver: true, tension: 80 }),
        Animated.spring(snakeY, { toValue: 0, useNativeDriver: true, tension: 80 }),
      ])
    ).start();

    const blink = setInterval(() => {
      frameIdx.current = (frameIdx.current + 1) % SNAKE_FRAMES.length;
      setSnakeEmoji(SNAKE_FRAMES[frameIdx.current]);
    }, 800);

    Animated.stagger(80, cardAnims.map(a => {
      a.setValue(0);
      return Animated.spring(a, { toValue: 1, useNativeDriver: true, tension: 100, friction: 8 });
    })).start();

    return () => clearInterval(blink);
  }, []);

  const overallProgress = progressData.completedTopics.length / TOPICS.length;

  const handleTopicPress = (topic) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    saveLastTopic(topic.key);
    navigation.navigate('Topic', { topicKey: topic.key });
  };

  const handleContinue = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const key = progressData.lastTopic || TOPICS[0].key;
    saveLastTopic(key);
    navigation.navigate('Topic', { topicKey: key });
  };

  const groupedTopics = [
    { label: '🗄️ Data Structures', color: '#7c3aed', keys: ['arrays','stacks','queues','linkedlists','hashtables','trees','bst','graphs'] },
    { label: '🔍 Search Algorithms', color: '#0ea5e9', keys: ['linearsearch','binarysearch'] },
    { label: '🔀 Sorting Algorithms', color: '#f59e0b', keys: ['bubblesort','selectionsort','insertionsort','quicksort','mergesort','countingsort','radixsort'] },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f1a" />
      <ConfettiEffect visible={showConfetti} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Animated.Text style={[styles.snake, { transform: [{ translateY: snakeY }] }]}>
            {snakeEmoji}
          </Animated.Text>
          <View style={styles.headerText}>
            <Text style={styles.appName}>DSA Adventure</Text>
            <Text style={styles.subtitle}>Master algorithms, one step at a time!</Text>
          </View>
          <View style={styles.streak}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <Text style={styles.streakCount}>{progressData.streak?.count || 0}</Text>
          </View>
        </View>

        {/* Progress Ring + XP */}
        <View style={styles.progressSection}>
          <ProgressRing progress={overallProgress} size={130} label="Complete" />
          <View style={styles.xpSection}>
            <XPBar xp={progressData.xp} />
            <Text style={styles.topicsCompleted}>
              {progressData.completedTopics.length}/{TOPICS.length} topics mastered
            </Text>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
          <Text style={styles.continueBtnText}>
            {progressData.lastTopic ? '▶ Continue Learning' : '🚀 Start Learning'}
          </Text>
        </TouchableOpacity>

        {/* Topic Grid */}
        {groupedTopics.map(group => (
          <View key={group.label} style={styles.group}>
            <Text style={[styles.groupLabel, { color: group.color }]}>{group.label}</Text>
            <View style={styles.topicGrid}>
              {group.keys.map((key, i) => {
                const topic = TOPICS.find(t => t.key === key);
                if (!topic) return null;
                const completed = progressData.completedTopics.includes(key);
                const animIdx = TOPICS.findIndex(t => t.key === key);
                return (
                  <Animated.View
                    key={key}
                    style={{
                      opacity: cardAnims[animIdx] || 1,
                      transform: [{ scale: cardAnims[animIdx] || 1 }],
                      width: '46%',
                    }}
                  >
                    <TouchableOpacity
                      style={[styles.topicCard, { borderColor: topic.color }]}
                      onPress={() => handleTopicPress(topic)}
                    >
                      <View style={styles.cardTop}>
                        <Text style={styles.topicEmoji}>{topic.emoji}</Text>
                        {completed && <Text style={styles.checkmark}>✅</Text>}
                      </View>
                      <Text style={styles.topicName}>{topic.name}</Text>
                      <View style={[styles.diffBadge, { backgroundColor: topic.color + '33' }]}>
                        <Text style={[styles.diffText, { color: topic.color }]}>{topic.difficulty}</Text>
                      </View>
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </View>
          </View>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f0f1a' },
  scroll: { flex: 1 },
  content: { padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 12 },
  snake: { fontSize: 48 },
  headerText: { flex: 1 },
  appName: { color: '#e2e8f0', fontSize: 22, fontWeight: '800' },
  subtitle: { color: '#94a3b8', fontSize: 13, marginTop: 2 },
  streak: { alignItems: 'center', backgroundColor: '#1e1e3a', borderRadius: 12, padding: 8, borderWidth: 1, borderColor: '#f59e0b33' },
  streakEmoji: { fontSize: 20 },
  streakCount: { color: '#f59e0b', fontWeight: '800', fontSize: 16 },
  progressSection: { flexDirection: 'row', alignItems: 'center', gap: 16, backgroundColor: '#1e1e3a', borderRadius: 16, padding: 16, marginBottom: 16 },
  xpSection: { flex: 1, gap: 8 },
  topicsCompleted: { color: '#94a3b8', fontSize: 12 },
  continueBtn: {
    backgroundColor: '#7c3aed',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  group: { marginBottom: 16 },
  groupLabel: { fontSize: 14, fontWeight: '700', marginBottom: 8 },
  topicGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'space-between' },
  topicCard: {
    backgroundColor: '#1e1e3a',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    minHeight: 90,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  topicEmoji: { fontSize: 26 },
  checkmark: { fontSize: 16 },
  topicName: { color: '#e2e8f0', fontWeight: '700', fontSize: 14, marginBottom: 6 },
  diffBadge: { borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2, alignSelf: 'flex-start' },
  diffText: { fontSize: 11, fontWeight: '600' },
});
