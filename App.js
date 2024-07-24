import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import PlaylistScreen from './src/screens/playlist/PlaylistScreen';
import AccountScreen from './src/screens/AccountScreen';
import EventScreen from './src/screens/EventScreen';
import SettingsScreen from './src/screens/SettingScreen';
import LogIn from './src/screens/LogIn'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>

      <Tab.Screen name="Playlist" component={PlaylistScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen name="Event" component={EventScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Login" component={LogIn} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Playlist">
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
