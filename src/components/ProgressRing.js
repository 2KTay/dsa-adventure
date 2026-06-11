import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

export default function ProgressRing({ progress = 0, size = 120, strokeWidth = 10, color = '#7c3aed', label }) {
  const animWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animWidth, {
      toValue: progress,
      duration: 900,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Background track */}
      <View style={[styles.track, { width: size, height: size, borderRadius: size / 2, borderWidth: strokeWidth, borderColor: '#1e1e3a' }]} />
      {/* Filled arc — clipped left half */}
      <Animated.View
        style={[
          styles.fill,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: color,
            borderRightColor: animWidth.interpolate({ inputRange: [0, 0.5, 1], outputRange: ['transparent', 'transparent', color] }),
            borderBottomColor: animWidth.interpolate({ inputRange: [0, 0.25, 1], outputRange: ['transparent', color, color] }),
            transform: [{
              rotate: animWidth.interpolate({ inputRange: [0, 1], outputRange: ['-90deg', '270deg'] }),
            }],
          },
        ]}
      />
      {/* Label */}
      <View style={styles.labelContainer}>
        <Text style={styles.percent}>{Math.round(progress * 100)}%</Text>
        {label && <Text style={styles.label}>{label}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  track: {
    position: 'absolute',
  },
  fill: {
    position: 'absolute',
  },
  labelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  percent: {
    color: '#e2e8f0',
    fontSize: 22,
    fontWeight: 'bold',
  },
  label: {
    color: '#94a3b8',
    fontSize: 11,
    marginTop: 2,
  },
});
