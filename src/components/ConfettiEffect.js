import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const COLORS = ['#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];
const PARTICLE_COUNT = 30;

function Particle({ color, startX }) {
  const y = useRef(new Animated.Value(-20)).current;
  const x = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const dx = (Math.random() - 0.5) * 200;
    Animated.parallel([
      Animated.timing(y, { toValue: height * 0.6, duration: 2000, useNativeDriver: true }),
      Animated.timing(x, { toValue: dx, duration: 2000, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0, duration: 2000, useNativeDriver: true }),
      Animated.timing(rotate, { toValue: 720, duration: 2000, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: startX,
        width: 10,
        height: 10,
        borderRadius: 2,
        backgroundColor: color,
        opacity,
        transform: [
          { translateY: y },
          { translateX: x },
          { rotate: rotate.interpolate({ inputRange: [0, 720], outputRange: ['0deg', '720deg'] }) },
        ],
      }}
    />
  );
}

export default function ConfettiEffect({ visible }) {
  if (!visible) return null;
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <Particle
          key={i}
          color={COLORS[i % COLORS.length]}
          startX={Math.random() * width}
        />
      ))}
    </View>
  );
}
