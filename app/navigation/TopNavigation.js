import React, { useRef, useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from '../utils/SetTheme';
import Music from '../screens/(tabs)/Music';
import OnlinePlayList from '../screens/(tabs)/OnlinePlayList';
import Events from '../screens/(tabs)/Events';
import { Text, View, Animated, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

// Create a Tab Navigator
const TopTabNavigator = createMaterialTopTabNavigator();

// Custom Tab Bar Label Component
const CustomTabBarLabel = ({ children, focused, onLayout, onPress }) => {
  const { currentTheme } = useTheme();
  return (
    <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 16 }}>
      <View onLayout={onLayout}>
        <Text
          style={{
            fontWeight: focused ? 'bold' : 'normal',
            fontSize: focused ? 16 : 14,
            color: focused ? currentTheme.iconColor : 'grey',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// Custom Tab Bar Component
const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { currentTheme } = useTheme();
  const [tabWidths, setTabWidths] = useState({});
  const scrollX = useRef(new Animated.Value(0)).current;
  const tabBarRef = useRef(null);

  const onTabLayout = (index, width) => {
    setTabWidths(prev => ({ ...prev, [index]: width }));
  };

  
  useEffect(() => {
    const activeIndex = state.index;
    const activeTabWidth = tabWidths[activeIndex] || 0;
    const tabBarWidth = tabBarRef.current?.offsetWidth || Dimensions.get('window').width;

    // Calculate total width of tabs before the active tab
    const totalWidthBeforeActive = Object.values(tabWidths)
      .slice(0, activeIndex)
      .reduce((acc, width) => acc + width, 0);

    // Calculate the center offset of the active tab
    const centerOffset = (tabBarWidth / 2) - (activeTabWidth / 2) - totalWidthBeforeActive;

    Animated.spring(scrollX, {
      toValue: centerOffset,
      useNativeDriver: true,
    }).start();
  }, [state.index, tabWidths]);
  
  
  return (
    <View style={[styles.tabBarContainer, { backgroundColor: currentTheme.background }]} ref={tabBarRef}>
      <Animated.View
        style={[styles.tabBarScrollContainer, { transform: [{ translateX: scrollX }] }]}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;
          const isActive = index === state.index;

          return (
            <View
              key={index}
              style={styles.tabItem}
              onLayout={event => onTabLayout(index, event.nativeEvent.layout.width)}
            >
              <CustomTabBarLabel
                focused={isActive}
                onPress={() => navigation.navigate(route.name)}
              >
                {label}
              </CustomTabBarLabel>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

// Main Tab Navigator Component
const TopTab = () => {
  const { currentTheme } = useTheme();

  return (
    <TopTabNavigator.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: currentTheme.background,
          elevation: 0, // Remove shadow effect (Android)
          shadowOpacity: 0, // Remove shadow effect (iOS)
          position: 'absolute', // Fix position to keep it at the top
          top: 0,
          left: 0,
          right: 0,
        },
        tabBarIndicatorStyle: {
          backgroundColor: 'transparent', // Hide the default indicator
        },
        swipeEnabled: true, // Enable swipe gestures
      }}
    >
      <TopTabNavigator.Screen
        name="Tracks"
        component={Music}
        options={{ tabBarLabel: 'For you' }}
      />
      <TopTabNavigator.Screen
        name="OnlinePlayList"
        component={OnlinePlayList}
        options={{ tabBarLabel: 'Stream online' }}
      />
      <TopTabNavigator.Screen
        name="Events"
        component={Events}
        options={{ tabBarLabel: 'Events' }}
      />
    </TopTabNavigator.Navigator>
  );
};

// Styles
const styles = StyleSheet.create({
  tabBarContainer: {
    overflow: 'hidden', // Prevent overflow from affecting layout
    backgroundColor: 'transparent', // Ensure background is transparent to avoid covering content
    position: 'absolute', // Fixed position to keep it at the top
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1, // Ensure it stays above other content
  },
  tabBarScrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabItem: {
    paddingVertical: 10,
    // paddingHorizontal is handled in CustomTabBarLabel to ensure click area
  },
});

export default TopTab;
