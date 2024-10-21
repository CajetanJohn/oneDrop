import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { observer } from 'mobx-react-lite';
import playlistStore from '../../lib/store/playlistStore'; // Assuming this is where the store is located
import { FontAwesome } from '@expo/vector-icons'; // Icons from FontAwesome
import { useTheme } from '../../lib/utils/SetTheme';
import selectionControl from '../../lib/control/SelectionControl';
import modalStore from '../../lib/control/modalControl';
import { MODAL_TYPE } from '../../lib/constants/Variables';
import LeftArrowIcon from '../../assets/icons/LeftArrowIcon';
import HeartIcon from '../../assets/icons/HeartIcon';
import AnimatedPressable from '../AnimatedPressable';

const SelectPlaylist = observer(({ onClose }) => {
  const { currentTheme } = useTheme(); // Get current theme
  const [playlists, setPlaylists] = React.useState([]);

  // Fetch custom and favourite playlists on mount or when store updates
  useEffect(() => {
    const fetchPlaylists = () => {
      const customPlaylists = playlistStore.getAllPlaylistsByCategory('custom');
      const favouritePlaylist = playlistStore.playlists.get('222')
      const combinedPlaylists = [favouritePlaylist, ...customPlaylists];
      setPlaylists(combinedPlaylists);
    };

    fetchPlaylists();

    // Clean up the observer
    return () => fetchPlaylists();
  }, []);

  // Render each playlist item
  const renderPlaylistItem = ({ item }) => {
    const isFavourite = item.id === '222'; // Assuming the favourite playlist has a unique id
    const icon = isFavourite ? 'heart' : 'music-note'; // Icons for favourite and custom playlists

    const onPress = ()=>{
        playlistStore.addTrackToPlaylist(item.id, selectionControl.getSelectionData?.itemsSelected || modalStore.modal[MODAL_TYPE.CHOOSING_SPECIFIC_PLAYLIST_TO_ADD_SELECTED_AUDIOS_TO].itemsToInsert)
        onClose();
    }
    return (
      <Pressable style={styles.playlistItem} onPress={onPress}>

        <View style={[styles.iconContainer, { backgroundColor: currentTheme.tertiaryBackground }]}>
        {
          isFavourite ? 
          <HeartIcon
          size={24} 
          color={currentTheme.iconColor} 
        />
        :
        <></>

        }
        </View>


        
        
        <View style={styles.textContainer}>
          <Text style={[styles.playlistName, { color: currentTheme.textColor }]}>
            {item.playlistName}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <AnimatedPressable onPress={onClose}>
          <LeftArrowIcon
            size={19} 
            color={currentTheme.iconColor} 
          />
        </AnimatedPressable>
        
        <Text style={[styles.headerText, { color: currentTheme.textColor }]}>
          Select Playlist
        </Text>
      </View>

      {/* Playlist List */}
      <FlatList
        data={playlists}
        renderItem={renderPlaylistItem}
        keyExtractor={(item) => item?.id}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
  },
  iconContainer: {
    padding: 15,
    borderRadius: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  textContainer: {
    marginLeft: 10,
  },
  playlistName: {
    fontSize: 16,
  },
  playlistId: {
    fontSize: 12,
    color: 'grey',
  },
});

export default SelectPlaylist;
