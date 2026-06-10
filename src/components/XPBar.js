import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { getLevelProgress } from '../utils/xp';

export default function XPBar({ xp = 0 }) {
  const { label, progress, nextThreshold, current } = getLevelProgress(xp);
  const barWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(barWidth, {
      toValue: progress,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.level}>Level: {label}</Text>
        <Text style={styles.xpText}>{current} XP</Text>
      </View>
      <View style={styles.track}>
        <Animated.View
          style={[
            styles.fill,
            {
              width: barWidth.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
      <Text style={styles.next}>{nextThreshold - current} XP to next level</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', paddingHorizontal: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  level: { color: '#e2e8f0', fontWeight: '700', fontSize: 14 },
  xpText: { color: '#7c3aed', fontWeight: '700', fontSize: 14 },
  track: {
    height: 8,
    backgroundColor: '#1e1e3a',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#7c3aed',
    borderRadius: 4,
  },
  next: { color: '#94a3b8', fontSize: 11, marginTop: 3 },
});
