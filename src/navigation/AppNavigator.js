import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import TopicScreen from '../screens/TopicScreen';
import ProgressScreen from '../screens/ProgressScreen';
import QuizScreen from '../screens/QuizScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function LearnStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Topic" component={TopicScreen} />
    </Stack.Navigator>
  );
}

const TABS = [
  { name: 'Learn', component: LearnStack, icon: '📚' },
  { name: 'Progress', component: ProgressScreen, icon: '📊' },
  { name: 'Quiz', component: QuizScreen, icon: '⚡' },
];

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#0f0f1a',
            borderTopColor: '#1e1e3a',
            borderTopWidth: 1,
            height: 60,
            paddingBottom: 8,
          },
          tabBarActiveTintColor: '#7c3aed',
          tabBarInactiveTintColor: '#94a3b8',
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color, fontSize: 11, fontWeight: focused ? '700' : '400' }}>
              {route.name}
            </Text>
          ),
          tabBarIcon: ({ focused }) => {
            const tab = TABS.find(t => t.name === route.name);
            return <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.6 }}>{tab?.icon}</Text>;
          },
        })}
      >
        {TABS.map(tab => (
          <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
