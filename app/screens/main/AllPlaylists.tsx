import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Dimensions } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useTheme } from '../../lib/utils/SetTheme';
import MusicNoteIcon from '../../assets/icons/MusicNoteIcon';
import playlistStore from '../../lib/store/playlistStore';
import selectionControl from '../../lib/control/SelectionControl';
import { ACTIVITY_TYPE, MODAL_TYPE } from '../../lib/constants/Variables';
import modalStore from '../../lib/control/modalControl';
import { RadioButton } from '../../components/inputs/RadioButton';


const screenHeight = Dimensions.get('window').height;

// Playlist Item Component for Default Playlists
const DefaultPlaylistItem = observer(({ item, onClick }) => {
  const { currentTheme } = useTheme();

  return (
    <Pressable onPress={() => onClick(item.id)} style={styles.playlistItem}>

        <View style={[styles.iconContainer, { backgroundColor: currentTheme.tertiaryBackground }]}>
          <MusicNoteIcon size={45} color={currentTheme.secondaryIconColor} />
        </View>
        <View style={styles.textContainer}>
          <Text style={{ color: currentTheme.textColor, fontSize: currentTheme.smallFont }}>{item.playlistName}</Text>
          <Text style={{ color: currentTheme.fadedText, fontSize: currentTheme.tinyFont }}>{item.tracks.length} tracks</Text>
        </View>
    </Pressable>
  );
})

// Playlist Item Component for Custom Playlists

const CustomPlaylistItem = observer(({ item, onClick }) => {
  const { currentTheme } = useTheme();
  const itemType = "playlist";
  const activity = {
    active:true,
    activityType:ACTIVITY_TYPE.SELECTING_CUSTOM_PLAYLISTS,
  }


  const selected = selectionControl.isItemSelected(item.id, activity.activityType);
 
 
  const onPress = useCallback(()=>{
    
    if (selectionControl.getSelectionStatus?.active) {
      selectionControl.selectItem(item.id)
      return
    } else {
      onClick(item.id)
    }
  }, [selectionControl.getSelectionData])

  // Handle the long press event
  const onLongPress = useCallback(() => {
    if (!selectionControl.getSelectionStatus.active) {
      const newStatus = {
        activityType: activity.activityType,
        srcId:'',
      };
      selectionControl.setActivity(newStatus);      
      onPress();
    }
  }, [selected]);

  // Memoize the JSX output
  const renderedItem = (
    <Pressable
      style={[
        styles.listItem,
        { backgroundColor: selected ? currentTheme.selectedBackground : 'transparent' }
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View style={[styles.icon, { backgroundColor: currentTheme.tertiaryBackground }]}>
        <MusicNoteIcon size={20} color={currentTheme.secondaryIconColor} />
      </View>
      <View style={[styles.listItemTextContainer, { borderBottomColor: currentTheme.fadedText }]}>
        <Text style={{ color: currentTheme.textColor, fontSize: currentTheme.smallFont }}>
          {item.playlistName}
        </Text>
        {selectionControl.getSelectionStatus?.active ? (
          <RadioButton size={20} isSelected={selected} onPress={onClick} />
        ) : (
          <Text style={{ color: currentTheme.fadedText, fontSize: currentTheme.tinyFont }}>
            {item.tracks.length} tracks
          </Text>
        )}
      </View>
    </Pressable>
  );

  return renderedItem;
});



const AllPlaylists = observer(() => {
  const { getScreenProps } = selectionControl;
  const { currentTheme } = useTheme();

  // Fetch default and custom playlists from the playlist store
  const defaultPlaylists = playlistStore.getAllPlaylistsByCategory('default');
  const customPlaylists = playlistStore.getAllPlaylistsByCategory('custom'); 

  const onClick = (playlistId) => {
    // Set the modal status
    modalStore.openModal({
      modalType:MODAL_TYPE.VIEWING_PLAYLIST_DETAILS,
      playlistId:playlistId
    });
  };

  const renderDefaultPlaylistItem = ({ item }) => (
    <DefaultPlaylistItem item={item} onClick={onClick} />
  );

  const renderCustomPlaylistItem = ({ item }) => (
    <CustomPlaylistItem item={item} onClick={onClick} />
  );

  return (
    <View style={[styles.screen, { backgroundColor: currentTheme.secondaryBackground, marginTop: getScreenProps.headerHeight, height:screenHeight - getScreenProps.headerHeight }]}>
      <View style={styles.scrollContainer}>
        <FlatList horizontal 
          data={defaultPlaylists}
          renderItem={renderDefaultPlaylistItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      
      <View style={styles.listContainer}>
        {customPlaylists.length > 0 ? (
          <FlatList
            data={customPlaylists}
            renderItem={renderCustomPlaylistItem}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={styles.import}>
            <Text style={{ color: currentTheme.textColor, fontSize: currentTheme.tinyFont, textAlign: 'center' }}>
              Create some playlists, and they'll appear here. {`\n`} You can also get saved playlists from device, events, or online streams
            </Text>
          </View>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent:'center',
    gap:0
  },
  scrollContainer: {
    marginBottom: 0,
    alignItems: "center",
    paddingVertical:15,
    margin:0,
  },
  playlistItem: {
    marginHorizontal: 8,
    alignItems: 'center',
    paddingVertical: 10,
    gap: 15,
    marginTop:10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    borderRadius: 20,
  },
  textContainer: {
    alignItems: 'center',
    gap:5
  },
  listContainer: {
    paddingHorizontal: 10,
    flex:1,
    
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  listItemTextContainer: {
    flex: 1,
    marginLeft: 10,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  icon: {
    width: 47,
    height: 47,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems:"center"
  },
  import: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",
    marginVertical:"auto"

  },
  selectedItem: {
  },
});

export default AllPlaylists;
