import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Text, View, Animated, StyleSheet, Dimensions, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { observer } from 'mobx-react';
import { useTheme } from '../../lib/utils/SetTheme';
import selectionControl from '../../lib/control/SelectionControl';
import CustomHeader from '../../components/CustomHeader';
import {
  DEVICE_AUDIO_SCREEN,
  STREAM_ONLINE_SCREEN,
  ALL_SAVED_PLAYLIST_SCREEN,
  EVENT_SCREEN,
} from '@env';
import AppModal from '../../components/modals/AppModal';
import DeviceAudioScreen from './DeviceAudio';
import StreamOnline from './StreamOnline';
import EventsScreen from './Events';
import AllPlaylists from './AllPlaylists';
import { SafeAreaView } from 'react-native-safe-area-context';

// Custom Tab Bar Label Component
const CustomTabBarLabel = React.memo(({ children, focused, onPress }) => {
  const { currentTheme } = useTheme();
  return (
    <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 8 }}>
      <Text
        style={{
          fontWeight: focused ? '400' : '350',
          fontSize: !focused ? currentTheme.tinyFont : currentTheme.smallFont + 4,
          color: focused ? currentTheme.textColor : currentTheme.fadedText,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
});

const MainNavigation = observer(() => {
  const { currentTheme } = useTheme();
  const layout = Dimensions.get('window');
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [tabWidths, setTabWidths] = useState({});
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: DEVICE_AUDIO_SCREEN, title: 'Device Music' },
    { key: STREAM_ONLINE_SCREEN, title: 'Stream' },
    { key: ALL_SAVED_PLAYLIST_SCREEN, title: 'Playlist' },
    { key: EVENT_SCREEN, title: 'Events' },
  ]);

  const onTabLayout = useCallback((index, width) => {
    setTabWidths(prev => ({ ...prev, [index]: width }));
  }, []);

  const centerOffset = useMemo(() => {
    const activeIndex = index;
    const activeTabWidth = tabWidths[activeIndex] || 0;
    const tabBarWidth = layout.width;

    const totalWidthBeforeActive = Object.values(tabWidths)
      .slice(0, activeIndex)
      .reduce((acc, width) => acc + width, 0);

    return (tabBarWidth / 2) - (activeTabWidth / 2) - totalWidthBeforeActive;
  }, [index, tabWidths, layout.width]);

  useEffect(() => {
    Animated.spring(scrollX, {
      toValue: centerOffset,
      useNativeDriver: true,
    }).start();
  }, [centerOffset]);


 useEffect(() => {
    // Define the async function
    const asyncEffect = async () => {
      try {
        if(selectionControl.getSelectionStatus.active){
        await selectionControl.turnOffSelection()
      };
      } catch (error) {
      }
    };


    return () => {
      asyncEffect()
    };
  }, [routes[index]?.key]);

  


  const renderTabBar = props => {
    return (
      <View
        style={[styles.tabBarContainer]}
        onLayout={event => {
          const height = event.nativeEvent.layout.height;
          selectionControl.setHeaderHeight(height);
        }}
      >
        <StatusBar backgroundColor="transparent" barStyle={currentTheme.statusBarStyle} />
        <CustomHeader currentPage={routes[index].key} />
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabBarScrollContainer}
          scrollEventThrottle={16}
          style={{ transform: [{ translateX: scrollX }] }}
        >
          {props.navigationState.routes.map((route, i) => {
            const focused = i === props.navigationState.index;
            const onPress = () => setIndex(i);

            return (
              <View key={i} style={styles.tabItem} onLayout={event => onTabLayout(i, event.nativeEvent.layout.width)} >
                <CustomTabBarLabel focused={focused} onPress={onPress}>
                  {route.title}
                </CustomTabBarLabel>
              </View>
            );
          })}
        </Animated.ScrollView>
      </View>
    );
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case DEVICE_AUDIO_SCREEN:
        return <DeviceAudioScreen />;
      case STREAM_ONLINE_SCREEN:
        return <StreamOnline />;
      case ALL_SAVED_PLAYLIST_SCREEN:
        return <AllPlaylists />;
      case EVENT_SCREEN:
        return <EventsScreen />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[styles.screen, {backgroundColor:currentTheme.background}]}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        swipeEnabled={true}
      />
      <AppModal>
        <Text>Your custom modal content here</Text>
      </AppModal>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  screen:{
    flex:1
  },
  
  tabBarContainer: {
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },

  tabBarScrollContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  tabItem: {
    marginVertical: 20,
  },
});

export default MainNavigation;
