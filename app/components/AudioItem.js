import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, LayoutAnimation, UIManager, StyleSheet } from 'react-native';
import { reaction } from 'mobx';
import { useTheme } from '../lib/utils/SetTheme';

export const AudioItem = ({ playlistId = '111' }) => {
  const [playlist, setPlaylist] = useState({ tracks: [], playlistName: '' });
  const { currentTheme } = useTheme();

  return (

    <View style={[styles.emptyContainer, { backgroundColor: currentTheme.secondaryBackground }]}>
      <Text style={{ color: currentTheme.textColor }}>No tracks available</Text>
    </View>

  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
