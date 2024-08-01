import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, FontAwesome, SimpleLineIcons, MaterialIcons, MaterialCommunityIcons } from 'react-native-vector-icons';
import TopTab from './TopNavigation';
import History from '../screens/(tabs)/History';
import { useTheme } from '../utils/SetTheme';
import Events from '../screens/(tabs)/Events';

const BottomTabNavigator = createBottomTabNavigator();

const BottomTab = () => {
  const { currentTheme } = useTheme();

  return (
    <BottomTabNavigator.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: currentTheme.background, // Set tab bar background color
        },
        tabBarLabelStyle: {
          fontSize: 12,
          color: currentTheme.textColor, // Optional: Set tab bar label color if you have labels
        },
        tabBarIcon: ({ focused, color }) => ({
          color: color || currentTheme.iconColor,
        }),
      }}
    >
      <BottomTabNavigator.Screen
        name="Playlist"
        component={TopTab}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            focused ? (
              <FontAwesome name="music" size={24} color={currentTheme.iconColor} />
            ) : (
              <Feather name="music" size={24} color={currentTheme.iconColor} />
            )
          ),
          tabBarLabel: () => null,
        }}
      />
      <BottomTabNavigator.Screen
        name="Events"
        component={Events}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            focused ? (
              <MaterialIcons name="event" size={24} color={currentTheme.iconColor} />
            ) : (
              <SimpleLineIcons name="event" size={24} color={currentTheme.iconColor} />
            )
          ),
          tabBarLabel: () => null,
        }}
      />
      <BottomTabNavigator.Screen
        name="History"
        component={History}
        options={{
          headerShown:false,
          tabBarIcon: ({ focused }) => (
            focused ? (
              <FontAwesome name="history" size={24} color={currentTheme.iconColor} />
            ) : (
              <MaterialCommunityIcons name="history" size={24} color={currentTheme.iconColor} />
            )
          ),
          tabBarLabel: () => null,
        }}
      />
    </BottomTabNavigator.Navigator>
  );
};

export default BottomTab;
