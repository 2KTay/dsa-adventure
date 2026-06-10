import { Animated } from 'react-native';

export function springIn(anim, toValue = 1, delay = 0) {
  return Animated.spring(anim, {
    toValue,
    useNativeDriver: true,
    tension: 100,
    friction: 8,
    delay,
  });
}

export function bounceIn(anim) {
  anim.setValue(0);
  return Animated.spring(anim, {
    toValue: 1,
    useNativeDriver: true,
    tension: 200,
    friction: 5,
  });
}

export function pulseAnimation(anim) {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(anim, { toValue: 1.1, duration: 600, useNativeDriver: true }),
      Animated.timing(anim, { toValue: 1.0, duration: 600, useNativeDriver: true }),
    ])
  );
}

export function slideIn(anim, fromValue = 50) {
  anim.setValue(fromValue);
  return Animated.spring(anim, {
    toValue: 0,
    useNativeDriver: true,
    tension: 80,
    friction: 10,
  });
}

export function fadeIn(anim, duration = 400) {
  anim.setValue(0);
  return Animated.timing(anim, {
    toValue: 1,
    duration,
    useNativeDriver: true,
  });
}

export function shake(anim) {
  anim.setValue(0);
  return Animated.sequence([
    Animated.timing(anim, { toValue: 10, duration: 50, useNativeDriver: true }),
    Animated.timing(anim, { toValue: -10, duration: 50, useNativeDriver: true }),
    Animated.timing(anim, { toValue: 8, duration: 50, useNativeDriver: true }),
    Animated.timing(anim, { toValue: -8, duration: 50, useNativeDriver: true }),
    Animated.timing(anim, { toValue: 0, duration: 50, useNativeDriver: true }),
  ]);
}

export function staggerChildren(animations, delay = 100) {
  return Animated.stagger(delay, animations.map(anim => springIn(anim)));
}
