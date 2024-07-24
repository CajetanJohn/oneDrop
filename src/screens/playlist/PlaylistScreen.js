import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MyMusic from './MyMusic';
import OnlineMusic from './OnlineMusic';
import TopNavigation from '../../components/TopNavigation';

function PlaylistScreen() {
  const [selectedTab, setSelectedTab] = useState('MyMusic');

  return (
    <View style={styles.container}>
      <TopNavigation selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === 'MyMusic' ? <MyMusic /> : <OnlineMusic />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PlaylistScreen;
