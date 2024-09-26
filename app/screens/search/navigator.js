import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { observer } from 'mobx-react-lite';
import OnlineSearchScreen from './OnlineSearch';
import LocalSearchScreen from './LocalSearchScreen';
import SearchCustomHeader from '../../components/SearchCustomHeader';
import selectionControl from '../../lib/control/SelectionControl';
import { useTheme } from '../../lib/utils/SetTheme';
import { SEARCH_ONLINE, SEARCH_LOCALLY } from '@env';

const Tab = createMaterialTopTabNavigator();

const SearchNavigation = observer(() => {
  const { currentTheme } = useTheme();
  return (
    <>
      <SearchCustomHeader />

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: currentTheme.textColor,
          tabBarStyle: {
            backgroundColor: 'transparent',
            borderBottomWidth: 0,
            elevation: 0,
          },
          tabBarLabelStyle: {
            fontWeight: 'bold',
          },
          tabBarItemStyle: {
            borderRadius: 10,
          },
          tabBarPressColor: 'transparent',
          tabBarIndicatorStyle: {
            backgroundColor: currentTheme.textColor,
            height: 4,
            borderRadius: 2,
          },
        }}
        onTabPress={({ route }) => selectionControl.setSearchSource(route.name)}
      >
        {/* Custom tab titles */}
        <Tab.Screen
          name={SEARCH_LOCALLY}
          component={LocalSearchScreen}
          options={{ tabBarLabel: 'Search Locally' }} // Custom title for "Local" tab
        />
        <Tab.Screen
          name={SEARCH_ONLINE}
          component={OnlineSearchScreen}
          options={{ tabBarLabel: 'Search Online' }} // Custom title for "Online" tab
        />
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
