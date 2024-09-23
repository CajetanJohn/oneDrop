import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, LayoutAnimation, UIManager, StyleSheet } from 'react-native';
import { AudioItem } from './AudioItem';
import { useTheme } from '../lib/utils/SetTheme';
import selectionControl from '../lib/control/SelectionControl';
import playlistStore from '../lib/store/playlistStore';
import { reaction } from 'mobx';


UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);


export const TrackList = ({ playlistId = '111' }) => {
  const [playlist, setPlaylist] = useState({ tracks: [], playlistName: '' });
  const { currentTheme } = useTheme();

  useEffect(() => {
    
    const disposePlaylist = reaction(
      () => playlistStore.playlists.get(playlistId),
      (updatedPlaylist) => {
        if (updatedPlaylist) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          selectionControl.inView(playlist);
          setPlaylist(updatedPlaylist);
        }
      },
      { fireImmediately: true }
    );

    return () => disposePlaylist();
  }, [playlistId]);

  const hasTracks = playlist?.tracks.length > 0;

  return (
    <>
      {hasTracks ? (

        <FlatList data={playlist.tracks}
          renderItem={({ item, index }) => (
            <AudioItem audio={item} index={index} playlistId={playlist?.id} />
          )}
          keyExtractor={(item) => item.id.toString()} showsVerticalScrollIndicator={false} 
          contentContainerStyle={playlist.tracks.length === 0 ? styles.emptyContainer : null}
        />

      ) : (

        <View style={[styles.emptyContainer, { backgroundColor: currentTheme.secondaryBackground }]}>
          <Text style={{ color: currentTheme.textColor }}>No tracks available</Text>
        </View>

      )}
    </>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});