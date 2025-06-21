import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/Stack/Appnavigation';

export default function App() {
  return (
    <NavigationContainer>
      <RootStack></RootStack>
    </NavigationContainer>
  );

}
