// StreamingOptionsView.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Define icons for each streaming platform
const platformIcons = {
  boomplay: 'music',       // FontAwesome icon
  spotify: 'spotify',      // FontAwesome icon
  youtube: 'youtube-play', // FontAwesome icon
};

const platforms = {
  boomplay: 'Boomplay',
  spotify: 'Spotify',
  youtube: 'YouTube',
};

const StreamingOptionsView = ({ accounts }) => {
  return (
    <View style={styles.container}>
      {accounts.map((account) => (
        <View key={account} style={styles.platformContainer}>
          <Icon name={platformIcons[account]} size={30} style={styles.icon} />
          <Text style={styles.platformName}>{platforms[account]}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  platformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  platformName: {
    fontSize: 18,
  },
});

export default StreamingOptionsView;
