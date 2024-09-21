import AudioItem from "./AudioItem";
import { observer } from "mobx-react-lite";
import playlistStore from "../lib/store/playlistStore";
import { reaction } from "mobx";
import { ACTIVITY_TYPE } from "../lib/constants/Variables";
import { View,  StyleSheet, FlatList, Text } from 'react-native';
import { useState } from "react";
import { useTheme } from "../lib/utils/SetTheme";


export const TrackList = observer(({ playlistId = '111'}) => {
    const [playlist] = useState(playlistStore.playlists.get(playlistId));
    const {currentTheme} = useTheme();

  /*
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
    */
  
   
    const hasTracks = playlist?.tracks.length > 0;
    
    return (
      <>
      
      {hasTracks ? (
        <FlatList
          data={playlist.tracks}
          renderItem={({ item, index }) => (
            <AudioItem audio={item} index={index} playlistId={playlist?.id} />
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
  })
  

  const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        flexGrow: 1,
      },
  })