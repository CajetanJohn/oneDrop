import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../utils/SetTheme';
import Splash from '../screens/Splash';
import DrawerNavigator from './Drawer';
import TopTab from './TopNavigation';
import Notification from '../screens/(drawers)/settings/Notification';
import CurrentPLaying from '../screens/CurrentPlaying';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { currentTheme } = useTheme();
  const [showNotification, setShowNotification] = useState(false); // Manage notification visibility


  return (
    <>
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
          },
          statusBarStyle: currentTheme.statusBarStyle,
          statusBarBackgroundColor: currentTheme.statusBarBackgroundColor,
        }}
      >
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false, tabBarVisible: false }}
        />
        <Stack.Screen
          name="CurrentPlaying"
          component={CurrentPLaying}
          options={{ title: 'Now Playing' }} // Optionally set header title for CurrentPlaying
        />
        <Stack.Screen
          name="Homepage"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TopTab"
          component={TopTab}
        />
      </Stack.Navigator>

      {showNotification && <Notification />}
    </>
  );
};

export default StackNavigator;
