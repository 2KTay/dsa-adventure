# 🐍 DSA Adventure

Interactive DSA learning app with LeetCode interview prep. Kid-friendly explanations + real interview problems.

## Run Locally
```bash
git clone https://github.com/2KTay/dsa-adventure
cd dsa-adventure
npm install
npx expo start
# Scan QR code with Expo Go app on your phone
```

## Build APK (Android)
```bash
npx eas build --platform android
```

## Build for iOS
```bash
npx eas build --platform ios
```

## Features
- 17 DSA topics from Arrays to Radix Sort
- Interactive visualizations for every topic (animated bar charts, tree/graph renderers, stack/queue animations)
- Kid-friendly analogies (pancake stacks, lunch lines, treasure hunts)
- 20+ LeetCode problems with story → walkthrough → hint → solution → quiz flow
- XP system, badges, daily streak
- Progress tracking with confidence ratings
- Syntax-highlighted Python code blocks
- Dark theme throughout

## Tech Stack
- Expo (managed workflow) with React Native
- React Navigation (bottom tabs + stack)
- AsyncStorage for progress tracking
- React Native Animated API for visualizations
- react-native-svg for tree and graph renderings
- expo-haptics for haptic feedback
