import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, SafeAreaView } from 'react-native';
import { ThemeProvider, useTheme } from './app/utils/SetTheme';
import StackNavigator from './app/navigation/Stacks';


const StatusBarManager = () => {
  const { currentTheme } = useTheme(); // Get the current theme from context

  return (
    <StatusBar
      barStyle={currentTheme.statusBarStyle} // Set status bar style based on the theme
      backgroundColor={currentTheme.statusBarBackgroundColor} // Set status bar background color based on the theme
    />
  );
};

const AppNavigator = () => (
  <NavigationContainer>
    <StatusBarManager />
    <SafeAreaView style={{ flex: 1 }}>
      <StackNavigator />
    </SafeAreaView>
  </NavigationContainer>
);

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
