export const XP_VALUES = {
  LEARN_TAB: 10,
  VIZ_TAB: 15,
  CODE_TAB: 20,
  LC_SOLVE: 30,
  QUIZ_COMPLETE: 50,
  QUIZ_CORRECT: 10,
};

export const BADGES = [
  { id: 'first_stack', label: 'First Stack 🥞', topicKey: 'stacks' },
  { id: 'hash_hero', label: 'Hash Hero 🗝️', topicKey: 'hashtables' },
  { id: 'tree_climber', label: 'Tree Climber 🌳', topicKey: 'trees' },
  { id: 'graph_explorer', label: 'Graph Explorer 🗺️', topicKey: 'graphs' },
  { id: 'binary_ninja', label: 'Binary Ninja ⚡', topicKey: 'binarysearch' },
  { id: 'sort_master', label: 'Sort Master 🏆', topicKey: 'mergesort' },
  { id: 'array_ace', label: 'Array Ace 📦', topicKey: 'arrays' },
  { id: 'link_legend', label: 'Link Legend 🔗', topicKey: 'linkedlists' },
];

export const ENCOURAGEMENTS = [
  'You are crushing it! 🚀',
  'Keep it up, future engineer! 💪',
  'One step closer to the interview! 🎯',
  'You are on fire! 🔥',
  'That is the spirit! ⚡',
  'Algorithm master in training! 🧠',
  'Interview ready loading... 💾',
  'LeetCode legend incoming! 🏆',
];

export function getRandomEncouragement() {
  return ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
}

export function getLevelProgress(xp) {
  const thresholds = [0, 100, 300, 600, 1000, 2000];
  const labels = ['Beginner', 'Coder', 'Developer', 'Engineer', 'Wizard'];
  for (let i = 0; i < thresholds.length - 1; i++) {
    if (xp <= thresholds[i + 1]) {
      const progress = (xp - thresholds[i]) / (thresholds[i + 1] - thresholds[i]);
      return { label: labels[i], progress, nextThreshold: thresholds[i + 1], current: xp };
    }
  }
  return { label: 'Wizard', progress: 1, nextThreshold: 2000, current: xp };
}
