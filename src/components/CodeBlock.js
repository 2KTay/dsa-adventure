import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import * as Clipboard from 'expo-clipboard';

function tokenize(line) {
  const tokens = [];
  const keywords = /\b(def|return|if|else|elif|for|while|in|not|and|or|import|from|class|True|False|None|pass|break|continue|lambda|yield)\b/g;
  const strings = /(["'])(?:(?=(\\?))\2.)*?\1/g;
  const numbers = /\b\d+(\.\d+)?\b/g;
  const comments = /#.*/g;
  const funcNames = /\b([a-zA-Z_]\w*)\s*(?=\()/g;

  let annotated = line;
  const markers = [];

  let m;
  comments.lastIndex = 0;
  while ((m = comments.exec(line)) !== null) {
    markers.push({ start: m.index, end: m.index + m[0].length, type: 'comment', text: m[0] });
  }

  if (markers.length === 0) {
    strings.lastIndex = 0;
    while ((m = strings.exec(line)) !== null) {
      markers.push({ start: m.index, end: m.index + m[0].length, type: 'string', text: m[0] });
    }
    keywords.lastIndex = 0;
    while ((m = keywords.exec(line)) !== null) {
      if (!markers.some(mk => m.index >= mk.start && m.index < mk.end)) {
        markers.push({ start: m.index, end: m.index + m[0].length, type: 'keyword', text: m[0] });
      }
    }
    numbers.lastIndex = 0;
    while ((m = numbers.exec(line)) !== null) {
      if (!markers.some(mk => m.index >= mk.start && m.index < mk.end)) {
        markers.push({ start: m.index, end: m.index + m[0].length, type: 'number', text: m[0] });
      }
    }
    funcNames.lastIndex = 0;
    while ((m = funcNames.exec(line)) !== null) {
      if (!markers.some(mk => m.index >= mk.start && m.index < mk.end)) {
        markers.push({ start: m.index, end: m.index + m[0].length - 1, type: 'func', text: m[1] });
      }
    }
  }

  markers.sort((a, b) => a.start - b.start);

  let pos = 0;
  for (const marker of markers) {
    if (pos < marker.start) {
      tokens.push({ type: 'plain', text: line.slice(pos, marker.start) });
    }
    tokens.push(marker);
    pos = marker.end;
  }
  if (pos < line.length) {
    tokens.push({ type: 'plain', text: line.slice(pos) });
  }

  return tokens;
}

const tokenColors = {
  keyword: '#c084fc',
  func: '#60a5fa',
  string: '#34d399',
  number: '#fb923c',
  comment: '#94a3b8',
  plain: '#e2e8f0',
};

export default function CodeBlock({ code, timeComplexity, spaceComplexity }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    Clipboard.setStringAsync(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.chips}>
          {timeComplexity && (
            <View style={styles.chip}>
              <Text style={styles.chipText}>⏱ {timeComplexity}</Text>
            </View>
          )}
          {spaceComplexity && (
            <View style={[styles.chip, styles.spaceChip]}>
              <Text style={styles.chipText}>💾 {spaceComplexity}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.copyBtn} onPress={handleCopy}>
          <Text style={styles.copyText}>{copied ? '✓ Copied!' : '📋 Copy'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.codeArea}>
          {lines.map((line, idx) => (
            <View key={idx} style={styles.lineRow}>
              <Text style={styles.lineNum}>{idx + 1}</Text>
              <View style={styles.lineContent}>
                {tokenize(line).map((token, ti) => (
                  <Text key={ti} style={[styles.codeText, { color: tokenColors[token.type] || '#e2e8f0' }]}>
                    {token.text}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0d0d1a',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2d2d4a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#1a1a2e',
    borderBottomWidth: 1,
    borderBottomColor: '#2d2d4a',
    flexWrap: 'wrap',
    gap: 6,
  },
  chips: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', flex: 1 },
  chip: {
    backgroundColor: '#1e1e3a',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#7c3aed',
  },
  spaceChip: { borderColor: '#06b6d4' },
  chipText: { color: '#e2e8f0', fontSize: 11 },
  copyBtn: {
    backgroundColor: '#1e1e3a',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  copyText: { color: '#94a3b8', fontSize: 12 },
  codeArea: { padding: 12 },
  lineRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 1 },
  lineNum: { color: '#4a5568', fontSize: 12, width: 28, fontFamily: 'monospace', textAlign: 'right', marginRight: 8 },
  lineContent: { flexDirection: 'row', flexWrap: 'wrap' },
  codeText: { fontSize: 13, fontFamily: 'monospace' },
});
