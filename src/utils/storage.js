import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  COMPLETED: 'completedTopics',
  PROGRESS: 'topicProgress',
  LC_CONFIDENCE: 'lcConfidence',
  XP: 'xp',
  LEVEL: 'level',
  STREAK: 'streak',
  LAST_TOPIC: 'lastTopic',
  BADGES: 'unlockedBadges',
};

export async function load(key) {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function save(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export async function loadProgress() {
  const [completed, progress, xp, level, streak, lastTopic, badges, lcConf] = await Promise.all([
    load(KEYS.COMPLETED),
    load(KEYS.PROGRESS),
    load(KEYS.XP),
    load(KEYS.LEVEL),
    load(KEYS.STREAK),
    load(KEYS.LAST_TOPIC),
    load(KEYS.BADGES),
    load(KEYS.LC_CONFIDENCE),
  ]);
  return {
    completedTopics: completed || [],
    topicProgress: progress || {},
    xp: xp || 0,
    level: level || 'Beginner',
    streak: streak || { count: 0, lastDate: null },
    lastTopic: lastTopic || null,
    unlockedBadges: badges || [],
    lcConfidence: lcConf || {},
  };
}

export async function markTopicStep(topicKey, step) {
  const progress = (await load(KEYS.PROGRESS)) || {};
  if (!progress[topicKey]) progress[topicKey] = {};
  progress[topicKey][step] = true;
  await save(KEYS.PROGRESS, progress);

  const steps = ['learnDone', 'vizDone', 'codeDone', 'lcDone'];
  const allDone = steps.every(s => progress[topicKey][s]);
  if (allDone) {
    const completed = (await load(KEYS.COMPLETED)) || [];
    if (!completed.includes(topicKey)) {
      completed.push(topicKey);
      await save(KEYS.COMPLETED, completed);
    }
  }
  return allDone;
}

export async function addXP(amount) {
  const current = (await load(KEYS.XP)) || 0;
  const newXP = current + amount;
  await save(KEYS.XP, newXP);
  const newLevel = getLevel(newXP);
  await save(KEYS.LEVEL, newLevel);
  return { xp: newXP, level: newLevel };
}

export function getLevel(xp) {
  if (xp <= 100) return 'Beginner';
  if (xp <= 300) return 'Coder';
  if (xp <= 600) return 'Developer';
  if (xp <= 1000) return 'Engineer';
  return 'Wizard';
}

export async function saveLCConfidence(questionId, rating) {
  const conf = (await load(KEYS.LC_CONFIDENCE)) || {};
  conf[questionId] = rating;
  await save(KEYS.LC_CONFIDENCE, conf);
}

export async function updateStreak() {
  const streak = (await load(KEYS.STREAK)) || { count: 0, lastDate: null };
  const today = new Date().toDateString();
  if (streak.lastDate === today) return streak;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const newCount = streak.lastDate === yesterday ? streak.count + 1 : 1;
  const newStreak = { count: newCount, lastDate: today };
  await save(KEYS.STREAK, newStreak);
  return newStreak;
}

export async function unlockBadge(badge) {
  const badges = (await load(KEYS.BADGES)) || [];
  if (!badges.includes(badge)) {
    badges.push(badge);
    await save(KEYS.BADGES, badges);
    return true;
  }
  return false;
}

export async function saveLastTopic(topicKey) {
  await save(KEYS.LAST_TOPIC, topicKey);
}
