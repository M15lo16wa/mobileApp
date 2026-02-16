import { Tabs } from 'expo-router';
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#005A9C' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Dossier',
          tabBarIcon: ({ color }) => <FontAwesome5 name="file-medical" size={20} color={color} />,
        }}
      />
    </Tabs>
  );
}
