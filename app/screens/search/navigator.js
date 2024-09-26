import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { observer } from 'mobx-react-lite';
import OnlineSearchScreen from './OnlineSearch';
import LocalSearchScreen from './LocalSearchScreen';
import SearchCustomHeader from '../../components/SearchCustomHeader';
import selectionControl from '../../lib/control/SelectionControl';

const Tab = createMaterialTopTabNavigator();

const SearchNavigation = observer(() => {
  return (
    <>
      <SearchCustomHeader />

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'yellow', // Color of the active tab title
          tabBarStyle: {
            backgroundColor: 'orange', // Background color of the tab bar
            borderBottomWidth: 0, // No border at the bottom
            elevation: 0, // No shadow/elevation for Android
          },
          tabBarLabelStyle: {
            fontWeight: 'bold', // Optional: make the label bold
          },
          tabBarIndicatorStyle: {
            backgroundColor: 'red', // Background color of the active tab
            borderRadius: 10, // Rounded corners for the active tab
            height: '100%', // Make the indicator take the full height of the tab
          },
          tabBarItemStyle: {
            borderRadius: 10, // Border radius for each tab item
          },
          tabBarPressColor: 'transparent', // Disable the press hue change
        }}
        onTabPress={({ route }) => selectionControl.setSearchSource(route.name)}
      >
        <Tab.Screen name="Local" component={LocalSearchScreen} />
        <Tab.Screen name="Online" component={OnlineSearchScreen} />
      </Tab.Navigator>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SearchNavigation;
