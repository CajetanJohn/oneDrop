import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OnlinePlayList from '../screens/(tabs)/OnlinePlayList';
import Music from '../screens/(tabs)/Music';
import { useTheme } from '../utils/SetTheme';

// Create top tab navigator
const TopTabNavigator = createMaterialTopTabNavigator();

const TopTab = () => {
  const { currentTheme } = useTheme(); // Get the current theme

  return (
    <TopTabNavigator.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: currentTheme.background, // Background color of the tab bar
          borderBottomWidth: 0,
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
          textTransform: 'none',
          marginHorizontal: 10,
          paddingVertical: 5,
          color: currentTheme.textColor, // Color of the tab labels
        },
        tabBarIndicatorStyle: {
          backgroundColor: currentTheme.iconColor, // Color of the active tab indicator
        },
        tabBarActiveTintColor: currentTheme.iconColor, // Color of the active tab label
        tabBarInactiveTintColor: currentTheme.dividerColor, // Color of the inactive tab label
      }}
    >
      <TopTabNavigator.Screen name="Music" component={Music} options={{ tabBarLabel: 'For you' }} />
      <TopTabNavigator.Screen name="OnlinePlayList" component={OnlinePlayList} options={{ tabBarLabel: 'Stream online' }} />
    </TopTabNavigator.Navigator>
  );
};

export default TopTab;
