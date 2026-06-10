import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, Animated,
  StyleSheet, SafeAreaView, StatusBar,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { TOPICS } from '../data/topics';
import { LEETCODE_PROBLEMS } from '../data/leetcode';
import { addXP } from '../utils/storage';
import { XP_VALUES } from '../utils/xp';
import ConfettiEffect from '../components/ConfettiEffect';

function buildQuizBank() {
  const questions = [];
  LEETCODE_PROBLEMS.forEach(problem => {
    problem.quiz.forEach((q, qi) => {
      const topic = TOPICS.find(t => t.key === problem.topicKey);
      questions.push({
        ...q,
        id: `${problem.id}_${qi}`,
        topicName: topic?.name || '',
        topicEmoji: topic?.emoji || '',
        problemTitle: problem.title,
      });
    });
  });
  return questions.sort(() => Math.random() - 0.5);
}

export default function QuizScreen() {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [totalXP, setTotalXP] = useState(0);
  const flashAnim = useRef(new Animated.Value(0)).current;

  const startQuiz = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const qs = buildQuizBank().slice(0, 10);
    setQuestions(qs);
    setCurrentIdx(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setTotalXP(0);
    setStarted(true);
  };

  const handleAnswer = async (optIdx) => {
    if (selected !== null) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected(optIdx);
    const q = questions[currentIdx];
    const correct = optIdx === q.answer;

    flashAnim.setValue(0);
    Animated.sequence([
      Animated.timing(flashAnim, { toValue: 1, duration: 200, useNativeDriver: false }),
      Animated.timing(flashAnim, { toValue: 0, duration: 600, useNativeDriver: false }),
    ]).start();

    if (correct) {
      setScore(s => s + 1);
      const result = await addXP(XP_VALUES.QUIZ_CORRECT);
      setTotalXP(prev => prev + XP_VALUES.QUIZ_CORRECT);
    }

    setTimeout(async () => {
      if (currentIdx + 1 >= questions.length) {
        const result = await addXP(XP_VALUES.QUIZ_COMPLETE);
        setTotalXP(prev => prev + XP_VALUES.QUIZ_COMPLETE);
        setDone(true);
        if (score + (correct ? 1 : 0) >= 7) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
      } else {
        setCurrentIdx(i => i + 1);
        setSelected(null);
      }
    }, 1200);
  };

  if (!started) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" backgroundColor="#0f0f1a" />
        <ScrollView contentContainerStyle={styles.startContent}>
          <Text style={styles.bigEmoji}>⚡</Text>
          <Text style={styles.startTitle}>Lightning Quiz</Text>
          <Text style={styles.startSub}>
            Test your knowledge with 10 random questions from all DSA topics. Every correct answer earns XP!
          </Text>
          <View style={styles.rulesCard}>
            <Text style={styles.ruleTitle}>📋 Rules</Text>
            {[
              `✅ 10 questions from all topics`,
              `⚡ +${XP_VALUES.QUIZ_CORRECT} XP per correct answer`,
              `🏆 +${XP_VALUES.QUIZ_COMPLETE} XP for completing the quiz`,
              `📊 Score 7/10 or better to earn bonus XP`,
            ].map(r => <Text key={r} style={styles.rule}>{r}</Text>)}
          </View>
          <TouchableOpacity style={styles.startBtn} onPress={startQuiz}>
            <Text style={styles.startBtnText}>⚡ Start Quiz!</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const grade = score >= 9 ? '🏆 Excellent!' : score >= 7 ? '🎯 Great job!' : score >= 5 ? '📚 Keep studying!' : '💪 Practice more!';
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" backgroundColor="#0f0f1a" />
        <ConfettiEffect visible={showConfetti} />
        <ScrollView contentContainerStyle={styles.startContent}>
          <Text style={styles.bigEmoji}>{score >= 7 ? '🏆' : '📚'}</Text>
          <Text style={styles.doneTitle}>{grade}</Text>
          <Text style={styles.doneScore}>{score}/{questions.length} correct</Text>
          <View style={styles.resultCard}>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Score</Text>
              <Text style={styles.resultVal}>{pct}%</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>XP Earned</Text>
              <Text style={[styles.resultVal, { color: '#7c3aed' }]}>+{totalXP} XP</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Correct</Text>
              <Text style={[styles.resultVal, { color: '#10b981' }]}>{score}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Wrong</Text>
              <Text style={[styles.resultVal, { color: '#ef4444' }]}>{questions.length - score}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.startBtn} onPress={startQuiz}>
            <Text style={styles.startBtnText}>🔄 Try Again</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const q = questions[currentIdx];
  const progress = (currentIdx + 1) / questions.length;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f1a" />
      <ScrollView contentContainerStyle={styles.quizContent}>
        {/* Progress */}
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        <View style={styles.quizMeta}>
          <Text style={styles.quizNum}>{currentIdx + 1}/{questions.length}</Text>
          <Text style={styles.quizTopic}>{q.topicEmoji} {q.topicName}</Text>
          <Text style={styles.quizScore}>Score: {score}</Text>
        </View>

        {/* Problem Context */}
        <View style={styles.contextCard}>
          <Text style={styles.contextLabel}>From: {q.problemTitle}</Text>
          <View style={[styles.typeBadge, { backgroundColor: q.type === 'mcq' ? '#7c3aed33' : q.type === 'output' ? '#06b6d433' : '#f59e0b33' }]}>
            <Text style={styles.typeBadgeText}>
              {q.type === 'mcq' ? '📝 Multiple Choice' : q.type === 'output' ? '💻 What is the Output?' : '📝 Fill in the Blank'}
            </Text>
          </View>
        </View>

        {/* Question */}
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{q.question}</Text>
        </View>

        {/* Options */}
        {q.options.map((opt, idx) => {
          let bg = '#1e1e3a';
          let border = '#334155';
          if (selected !== null) {
            if (idx === q.answer) { bg = '#10b98133'; border = '#10b981'; }
            else if (idx === selected) { bg = '#ef444433'; border = '#ef4444'; }
          }
          return (
            <TouchableOpacity
              key={idx}
              style={[styles.option, { backgroundColor: bg, borderColor: border }]}
              onPress={() => handleAnswer(idx)}
              disabled={selected !== null}
            >
              <Text style={styles.optLetter}>{String.fromCharCode(65 + idx)}</Text>
              <Text style={styles.optText}>{opt}</Text>
              {selected !== null && idx === q.answer && <Text style={styles.correct}>✓</Text>}
              {selected !== null && idx === selected && idx !== q.answer && <Text style={styles.wrong}>✗</Text>}
            </TouchableOpacity>
          );
        })}

        {/* Explanation */}
        {selected !== null && (
          <View style={[styles.explanation, { borderColor: selected === q.answer ? '#10b981' : '#ef4444' }]}>
            <Text style={[styles.explainTitle, { color: selected === q.answer ? '#10b981' : '#ef4444' }]}>
              {selected === q.answer ? '✅ Correct!' : '❌ Not quite...'}
            </Text>
            <Text style={styles.explainText}>{q.explanation}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f0f1a' },
  startContent: { padding: 24, alignItems: 'center', paddingTop: 40 },
  bigEmoji: { fontSize: 64, marginBottom: 16 },
  startTitle: { color: '#e2e8f0', fontSize: 28, fontWeight: '800', marginBottom: 8, textAlign: 'center' },
  startSub: { color: '#94a3b8', fontSize: 15, lineHeight: 22, textAlign: 'center', marginBottom: 20 },
  rulesCard: { backgroundColor: '#1e1e3a', borderRadius: 14, padding: 16, width: '100%', marginBottom: 24 },
  ruleTitle: { color: '#7c3aed', fontWeight: '700', fontSize: 15, marginBottom: 10 },
  rule: { color: '#cbd5e1', fontSize: 13, lineHeight: 22 },
  startBtn: { backgroundColor: '#7c3aed', borderRadius: 14, paddingHorizontal: 40, paddingVertical: 16, width: '100%', alignItems: 'center' },
  startBtnText: { color: '#fff', fontWeight: '800', fontSize: 18 },
  doneTitle: { color: '#e2e8f0', fontSize: 26, fontWeight: '800', marginBottom: 8, textAlign: 'center' },
  doneScore: { color: '#94a3b8', fontSize: 18, marginBottom: 20 },
  resultCard: { backgroundColor: '#1e1e3a', borderRadius: 14, padding: 16, width: '100%', marginBottom: 24, gap: 8 },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  resultLabel: { color: '#94a3b8', fontSize: 15 },
  resultVal: { color: '#e2e8f0', fontWeight: '700', fontSize: 15 },
  quizContent: { padding: 16 },
  progressBar: { height: 6, backgroundColor: '#1e1e3a', borderRadius: 3, overflow: 'hidden', marginBottom: 12 },
  progressFill: { height: '100%', backgroundColor: '#7c3aed', borderRadius: 3 },
  quizMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  quizNum: { color: '#94a3b8', fontSize: 13, fontWeight: '600' },
  quizTopic: { color: '#7c3aed', fontSize: 13, fontWeight: '600' },
  quizScore: { color: '#10b981', fontSize: 13, fontWeight: '700' },
  contextCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 6 },
  contextLabel: { color: '#94a3b8', fontSize: 12 },
  typeBadge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  typeBadgeText: { color: '#e2e8f0', fontSize: 11, fontWeight: '600' },
  questionCard: { backgroundColor: '#1e1e3a', borderRadius: 14, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: '#334155' },
  questionText: { color: '#e2e8f0', fontSize: 15, lineHeight: 22, fontFamily: 'monospace' },
  option: {
    borderRadius: 12, padding: 14, marginBottom: 8,
    borderWidth: 1.5, flexDirection: 'row', alignItems: 'center', gap: 10,
  },
  optLetter: { color: '#94a3b8', fontWeight: '800', fontSize: 14, width: 22 },
  optText: { color: '#e2e8f0', fontSize: 14, flex: 1 },
  correct: { color: '#10b981', fontWeight: '800', fontSize: 18 },
  wrong: { color: '#ef4444', fontWeight: '800', fontSize: 18 },
  explanation: { backgroundColor: '#1e1e3a', borderRadius: 12, padding: 14, marginTop: 4, borderLeftWidth: 3 },
  explainTitle: { fontWeight: '800', fontSize: 14, marginBottom: 6 },
  explainText: { color: '#94a3b8', fontSize: 13, lineHeight: 20 },
});
