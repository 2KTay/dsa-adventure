import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { saveLCConfidence, addXP } from '../utils/storage';
import { XP_VALUES } from '../utils/xp';

export default function LeetCodeCard({ problem, initialConfidence = 0, onXPEarned }) {
  const [stage, setStage] = useState(0);
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [quizActive, setQuizActive] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizResults, setQuizResults] = useState([]);
  const [confidence, setConfidence] = useState(initialConfidence);
  const [xpEarned, setXpEarned] = useState(false);

  const diffColor = { Easy: '#10b981', Medium: '#f59e0b', Hard: '#ef4444' }[problem.difficulty];

  const handleRevealSolution = async () => {
    setShowSolution(true);
    if (!xpEarned) {
      const result = await addXP(XP_VALUES.LC_SOLVE);
      setXpEarned(true);
      onXPEarned && onXPEarned(XP_VALUES.LC_SOLVE, result);
    }
    setTimeout(() => setQuizActive(true), 500);
  };

  const handleAnswer = async (optionIdx) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedAnswer(optionIdx);
    const correct = optionIdx === problem.quiz[quizIndex].answer;
    const newResults = [...quizResults, correct];
    setQuizResults(newResults);

    if (correct) {
      const result = await addXP(XP_VALUES.QUIZ_CORRECT);
      onXPEarned && onXPEarned(XP_VALUES.QUIZ_CORRECT, result);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      if (quizIndex + 1 < problem.quiz.length) {
        setQuizIndex(quizIndex + 1);
      } else {
        setQuizActive(false);
      }
    }, 1200);
  };

  const handleConfidence = async (rating) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setConfidence(rating);
    await saveLCConfidence(problem.id, rating);
  };

  const currentQuiz = quizActive ? problem.quiz[quizIndex] : null;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.number}>#{problem.number}</Text>
        <Text style={styles.title}>{problem.title}</Text>
        <View style={[styles.diffBadge, { backgroundColor: diffColor + '33', borderColor: diffColor }]}>
          <Text style={[styles.diffText, { color: diffColor }]}>{problem.difficulty}</Text>
        </View>
      </View>

      {/* Story */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>📖 The Story</Text>
        <Text style={styles.storyText}>{problem.story}</Text>
      </View>

      {/* Problem */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>🎯 The Problem</Text>
        <Text style={styles.bodyText}>{problem.problem}</Text>
      </View>

      {/* Walk Me Through */}
      <TouchableOpacity
        style={[styles.btn, showWalkthrough && styles.btnActive]}
        onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setShowWalkthrough(!showWalkthrough); }}
      >
        <Text style={styles.btnText}>🚶 Walk Me Through It</Text>
      </TouchableOpacity>
      {showWalkthrough && (
        <View style={styles.reveal}>
          <Text style={styles.bodyText}>{problem.walkthrough}</Text>
        </View>
      )}

      {/* Hint */}
      <TouchableOpacity
        style={[styles.btn, showHint && styles.btnActive]}
        onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setShowHint(!showHint); }}
      >
        <Text style={styles.btnText}>💡 Give Me a Hint</Text>
      </TouchableOpacity>
      {showHint && (
        <View style={styles.reveal}>
          <Text style={styles.bodyText}>{problem.hint}</Text>
        </View>
      )}

      {/* Show Solution */}
      <TouchableOpacity
        style={[styles.btn, styles.solutionBtn, showSolution && styles.btnActive]}
        onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); handleRevealSolution(); }}
      >
        <Text style={styles.btnText}>👀 Show Solution</Text>
      </TouchableOpacity>
      {showSolution && (
        <View style={styles.reveal}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Text style={styles.code}>{problem.solution}</Text>
          </ScrollView>
          <View style={styles.complexityBox}>
            <Text style={styles.complexityText}>📊 {problem.complexity}</Text>
          </View>
        </View>
      )}

      {/* Quiz */}
      {quizActive && currentQuiz && (
        <View style={styles.quiz}>
          <Text style={styles.quizHeader}>🏆 Mini Quiz ({quizIndex + 1}/{problem.quiz.length})</Text>
          <Text style={styles.quizQ}>{currentQuiz.question}</Text>
          {currentQuiz.options.map((opt, i) => {
            let bg = '#1e1e3a';
            if (selectedAnswer !== null) {
              if (i === currentQuiz.answer) bg = '#10b98133';
              else if (i === selectedAnswer) bg = '#ef444433';
            }
            return (
              <TouchableOpacity
                key={i}
                style={[styles.quizOpt, { backgroundColor: bg }]}
                onPress={() => handleAnswer(i)}
                disabled={selectedAnswer !== null}
              >
                <Text style={styles.quizOptText}>{opt}</Text>
              </TouchableOpacity>
            );
          })}
          {selectedAnswer !== null && (
            <Text style={styles.explanation}>{currentQuiz.explanation}</Text>
          )}
        </View>
      )}

      {/* Completed Quiz Summary */}
      {showSolution && !quizActive && quizResults.length === problem.quiz.length && (
        <View style={styles.quizDone}>
          <Text style={styles.quizDoneText}>
            Quiz: {quizResults.filter(Boolean).length}/{problem.quiz.length} correct ✓
          </Text>
        </View>
      )}

      {/* Confidence Rating */}
      {showSolution && (
        <View style={styles.confidenceSection}>
          <Text style={styles.confLabel}>Rate your confidence:</Text>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity key={star} onPress={() => handleConfidence(star)}>
                <Text style={[styles.star, star <= confidence && styles.starActive]}>★</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e3a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2d2d4a',
  },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 },
  number: { color: '#94a3b8', fontSize: 13, fontWeight: '600' },
  title: { color: '#e2e8f0', fontSize: 16, fontWeight: '700', flex: 1 },
  diffBadge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2, borderWidth: 1 },
  diffText: { fontSize: 12, fontWeight: '700' },
  section: { marginBottom: 12 },
  sectionLabel: { color: '#7c3aed', fontSize: 13, fontWeight: '700', marginBottom: 4 },
  storyText: { color: '#e2e8f0', fontSize: 14, lineHeight: 20, fontStyle: 'italic' },
  bodyText: { color: '#cbd5e1', fontSize: 13, lineHeight: 20 },
  btn: {
    backgroundColor: '#0f0f1a',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  btnActive: { borderColor: '#7c3aed', backgroundColor: '#1e1e3a' },
  solutionBtn: { borderColor: '#06b6d4' },
  btnText: { color: '#e2e8f0', fontWeight: '600', fontSize: 14 },
  reveal: {
    backgroundColor: '#0f0f1a',
    borderRadius: 10,
    padding: 12,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#2d2d4a',
  },
  code: { color: '#e2e8f0', fontFamily: 'monospace', fontSize: 12, lineHeight: 20 },
  complexityBox: {
    marginTop: 8,
    backgroundColor: '#1e1e3a',
    borderRadius: 6,
    padding: 8,
  },
  complexityText: { color: '#94a3b8', fontSize: 12 },
  quiz: { backgroundColor: '#0f0f1a', borderRadius: 12, padding: 14, marginTop: 12, borderWidth: 1, borderColor: '#7c3aed' },
  quizHeader: { color: '#7c3aed', fontWeight: '700', fontSize: 14, marginBottom: 8 },
  quizQ: { color: '#e2e8f0', fontSize: 13, lineHeight: 18, marginBottom: 10 },
  quizOpt: {
    padding: 10,
    borderRadius: 8,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#334155',
  },
  quizOptText: { color: '#e2e8f0', fontSize: 13 },
  explanation: { color: '#94a3b8', fontSize: 12, marginTop: 8, fontStyle: 'italic' },
  quizDone: { backgroundColor: '#10b98133', borderRadius: 8, padding: 10, marginTop: 8, alignItems: 'center' },
  quizDoneText: { color: '#10b981', fontWeight: '700', fontSize: 14 },
  confidenceSection: { alignItems: 'center', marginTop: 14 },
  confLabel: { color: '#94a3b8', fontSize: 12, marginBottom: 6 },
  stars: { flexDirection: 'row', gap: 8 },
  star: { fontSize: 28, color: '#334155' },
  starActive: { color: '#f59e0b' },
});
