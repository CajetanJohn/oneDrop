// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider } from './app/utils/SetTheme';
import DrawerNavigator from './app/navigation/Drawer';


const AppNavigator = () => (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );

export default function App() {
    return (
        <ThemeProvider>
            <AppNavigator />
        </ThemeProvider>
    );
}
