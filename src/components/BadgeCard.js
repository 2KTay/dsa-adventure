import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BadgeCard({ badge, unlocked }) {
  return (
    <View style={[styles.card, !unlocked && styles.locked]}>
      <Text style={styles.label}>{unlocked ? badge.label : '🔒 ???'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e3a',
    borderRadius: 12,
    padding: 12,
    margin: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7c3aed',
    minWidth: 130,
  },
  locked: {
    borderColor: '#334155',
    opacity: 0.5,
  },
  label: {
    color: '#e2e8f0',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
