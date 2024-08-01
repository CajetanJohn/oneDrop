import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../utils/SetTheme'; 
import Splash from '../screens/Splash';
import DrawerNavigator from './Drawer';
import SongDetails from '../screens/(modals)/SongDetails';


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { currentTheme } = useTheme(); // Get current theme

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: currentTheme.headerBackgroundColor, 
        },
        headerTintColor: currentTheme.textColor,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerDividerStyle: {
          backgroundColor: currentTheme.dividerColor,
        }
      }}
    >
      <Stack.Screen
        name="Main"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }} // Hide header for Splash screen
      />
      <Stack.Screen
        name="SongDetails"
        component={SongDetails}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
