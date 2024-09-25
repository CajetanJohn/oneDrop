import React, { useRef, useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, Animated, FlatList, Platform, Modal, TouchableOpacity } from 'react-native';
import { useTheme } from '../../lib/utils/SetTheme';
import playlistStore from '../../lib/store/playlistStore';
import { MaterialIcons } from '@expo/vector-icons';
import { ACTIVITY_TYPE } from '../../lib/constants/Variables';
import AudioItem from '../AudioItem';
import selectionControl from '../../lib/control/SelectionControl';
import MusicNoteIcon from '../../assets/icons/MusicNoteIcon';
import { PopulatePLaylist } from '../SelectionOptions';
import AddToFavoritesButton from '../interaction/AddToFavoritesButton';



const headerHeight = 110;
const iconedViewHeight = 280;






import { observer } from 'mobx-react-lite';
import SelectionOptions, { AddToPlaylist } from '../SelectionOptions';


const PlaylistDetails = observer(({ playlistId, onClose }) => {

    const activity = {
        selectionActivity:ACTIVITY_TYPE.SELECTING_AUDIO_FILES_IN_A_CUSTOM_PLAYLIST,
        status:"onLongPress",
        active:false,
      };


      //console.log(selectionControl.getSelectionData?.itemsSelected.length);
      

    
    const { currentTheme } = useTheme();
    const [playlist, setPlaylist] = useState(playlistStore.playlists.get(playlistId));

    useEffect(() => {
        const playlistData = playlistStore.playlists.get(playlistId);
        
        setPlaylist(playlistData);
    }, []);

    const onClick = () => {
        selectionControl.selectAllItems();
    };
    

    const scrollY = useRef(new Animated.Value(0)).current;

    const iconedViewTranslateY = scrollY.interpolate({
        inputRange: [0, iconedViewHeight + iconedViewHeight],
        outputRange: [0, -iconedViewHeight],
        extrapolate: 'clamp',
    });

    const iconedViewOpacity = scrollY.interpolate({
        inputRange: [0, iconedViewHeight / 2],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const headerTextOpacity = scrollY.interpolate({
        inputRange: [0, iconedViewHeight],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const containerHeight = scrollY.interpolate({
        inputRange: [0, iconedViewHeight],
        outputRange: [headerHeight + iconedViewHeight, headerHeight],
        extrapolate: 'clamp',
    });

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
    );

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.animatedView, { height: containerHeight, backgroundColor: 'green' }]}>
                <View style={[styles.header, { backgroundColor: "red" }]}>

                    <View style={styles.headerTextLeft}>
                        <TouchableOpacity onPress={onClose}>
                            <MaterialIcons name="chevron-left" size={40} color={currentTheme.iconColor} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: "column" }}>
                            <Animated.Text style={{ color: currentTheme.textColor, fontSize: currentTheme.mediumFont, opacity: headerTextOpacity }}>
                                {playlist?.playlistName || "Uknown playlist"}
                            </Animated.Text>
                            <Animated.Text style={{ color: currentTheme.textColor, fontSize: currentTheme.smallFont, opacity: headerTextOpacity }}>
                                {playlist?.tracks?.length || 0} track{playlist?.tracks?.length !== 1 ? 's' : ''}
                            </Animated.Text>
                        </View>
                    </View>

                    <View style={styles.headerTextRight}>
                        {
                        selectionControl.getSelectionStatus?.active 
                        && selectionControl.getSelectionStatus.selectionActivity === activity.selectionActivity
                        ? (
                            <SelectionOptions/>
                        ) : (
                            <>
                                <AddToFavoritesButton />
                                <PopulatePLaylist/>
                            </>
                        )}
                    </View>

                </View>

                <Animated.View style={[styles.iconedView, { transform: [{ translateY: iconedViewTranslateY }], backgroundColor: "transparent" }]}>
                    <Animated.View style={[styles.iconContainer, { backgroundColor: currentTheme.tertiaryBackground, opacity: iconedViewOpacity }]}>
                        <MusicNoteIcon size={70} color={currentTheme.iconColor} />
                    </Animated.View>

                    <Animated.Text style={{ fontSize: currentTheme.mediumFont, opacity: iconedViewOpacity, color: currentTheme.textColor }}>
                        {playlist.playlistName || 'unknown'}
                    </Animated.Text>
                    <Animated.Text style={{ fontSize: currentTheme.tinyFont, opacity: iconedViewOpacity, color: currentTheme.textColor }}>
                        {playlist?.tracks?.length || 0} track{playlist?.tracks?.length !== 1 ? 's' : ''}
                    </Animated.Text>
                </Animated.View>

                <View style={[styles.border, { backgroundColor: currentTheme.secondaryBackground }]}></View>
            </Animated.View>
            

            <View style={[styles.listContainer, { backgroundColor: currentTheme.secondaryBackground }]}>
                {playlist?.tracks.length > 0 ? (
                    <Animated.FlatList
                        data={playlist?.tracks || []}
                        renderItem={({ item, index }) => (
                            <AudioItem audio={item} index={index} playlistId={playlistId} activity={activity} />
                        )}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={[
                            styles.recyclerListContainer,
                            {
                                paddingTop: iconedViewHeight + headerHeight,
                            },
                        ]}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <View style={[styles.emptyContainer, { backgroundColor: currentTheme.secondaryBackground, paddingTop: iconedViewHeight + headerHeight }]}>
                        <Text style={{ color: currentTheme.textColor }}>No tracks available</Text>
                    </View>
                )}
            </View>
        </View>
    );
});


const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    animatedView: {
      flexDirection: 'column',
      position: 'absolute',
      justifyContent: "center",
      left: 0,
      right: 0,
      elevation: 1005,
      zIndex: 1005,
      gap: 0,
      paddingTop: 0,
    },
    listContainer: {
        flex:1,
    },
    header: {
      position: "absolute",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 15,
      top: 20,
      width: "100%",
      elevation: 1005,
      zIndex: 1005,
    },
    headerTextLeft: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
    },
    headerTextRight: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 25,
    },
    border: {
      height: 20,
      width: "100%",
      position: "absolute",
      bottom: -3,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    iconedView: {
      alignItems: 'center',
      justifyContent: 'center',
      height: iconedViewHeight,
      position: "absolute",
      width: "100%",
      bottom: 0,
      elevation: 1002,
      zIndex: 1002,
      gap:10
    },
    iconContainer: {
      width: 130,
      height: 130,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      borderRadius: 20,
      gap: 4,
      marginBottom: 10,
    },
    recyclerListContainer: {
      backgroundColor:"transparent",
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      flexGrow: 1,
      paddingTop:60,
      backgroundColor:"red"
    },
    closeButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 5,
    },
    closeButtonText: {
      color: '#fff',
      fontSize: 16,
    },
  });

export default PlaylistDetails;
