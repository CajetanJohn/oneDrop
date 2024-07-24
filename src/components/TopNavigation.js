import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';

const TopNavigation = ({ selectedTab, setSelectedTab }) => {
  const myMusicUnderline = useRef(new Animated.Value(1)).current; // Start underlined
  const onlineMusicUnderline = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (selectedTab === 'MyMusic') {
      Animated.timing(myMusicUnderline, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.timing(onlineMusicUnderline, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(myMusicUnderline, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.timing(onlineMusicUnderline, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [selectedTab]);

  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => setSelectedTab('MyMusic')} style={styles.navButton}>
        <View style={styles.navContent}>
          <Text style={[styles.navText, selectedTab === 'MyMusic' && styles.activeTabText]}>
            My Music
          </Text>
          <Animated.View style={[styles.underline, {
            transform: [{
              translateX: myMusicUnderline.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0]
              })
            }]
          }]} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSelectedTab('OnlineMusic')} style={styles.navButton}>
        <View style={styles.navContent}>
          <Text style={[styles.navText, selectedTab === 'OnlineMusic' && styles.activeTabText]}>
            Online Music
          </Text>
          <Animated.View style={[styles.underline, {
            transform: [{
              translateX: onlineMusicUnderline.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 0]
              })
            }]
          }]} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ddd',
  },
  navButton: {
    flex: 1,
    overflow: 'hidden',
  },
  navContent: {
    alignItems: 'center',
    position: 'relative',
  },
  navText: {
    fontSize: 18,
    paddingVertical: 10,
  },
  activeTabText: {
    fontWeight: 'bold', // Optional: Make active tab text bold
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
    width: '100%',
    backgroundColor: '#000',
  },
});

export default TopNavigation;
