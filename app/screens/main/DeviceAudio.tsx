import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../../lib/utils/SetTheme';
import AudioItem from '../../components/AudioItem';
import { observer } from 'mobx-react-lite';
import selectionControl from '../../lib/control/SelectionControl';
import playlistStore from '../../lib/store/playlistStore';
import { reaction } from 'mobx';
import { ACTIVITY_TYPE } from '../../lib/constants/Variables';


const activity = {
  selectionActivity:ACTIVITY_TYPE.SELECTING_DEVICE_AUDIO,
  status:"onLongPress",
  active:false,
};



export const TrackList = ({ playlistId = '111'}) => {
  const [playlist, setPlaylist] = useState({ tracks: [], playlistName: '' });
  const {currentTheme} = useTheme();

  useEffect(() => {
    const disposePlaylist = reaction(
      () => playlistStore.playlists.get(playlistId),
      (updatedPlaylist) => {
        if (updatedPlaylist) {
          selectionControl.inView(playlist)
          setPlaylist(updatedPlaylist);
        }
      },
      { fireImmediately: true }
    );

    return () => disposePlaylist();
  }, []);

 
  const hasTracks = playlist?.tracks.length > 0;
  
  return (
    <>
    
    {hasTracks ? (
      <FlatList
      data={playlist.tracks}
      renderItem={({ item, index }) => (
        <AudioItem audio={item} index={index} playlistId={playlist?.id} activity={activity}/>
      )}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
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


const DeviceAudioScreen = observer(() => {
  const { currentTheme } = useTheme();
  const { getScreenProps } = selectionControl;

  return (
    <View style={[styles.screen, { backgroundColor: currentTheme.secondaryBackground, marginTop: getScreenProps.headerHeight }]}>
       <TrackList playlistId={"111"} />
    </View>
  );
});


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow:'hidden',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flexGrow: 1,
  },
});

export default DeviceAudioScreen;
