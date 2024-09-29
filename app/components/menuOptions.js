import React, { useCallback, useRef, useState } from 'react';
import { View, Pressable, StyleSheet, Text, Animated, TouchableOpacity } from 'react-native';
import { useTheme } from '../lib/utils/SetTheme';
import Menu from '../assets/icons/menu';
import { ALL_SAVED_PLAYLIST_SCREEN, CREATE_PLAYLIST } from '@env';
import SearchIcon from '../assets/icons/SearchIcon';
import selectionControl from '../lib/control/SelectionControl';
import AddIcon from '../assets/icons/AddIcon';
import { observer } from 'mobx-react-lite';
import modalStore from '../lib/control/modalControl';
import { MODAL_TYPE } from '../lib/constants/Variables';
import AnimatedPressable from './AnimatedPressable';
import CustomPopover from './PopOver';



export const CreatePlaylistButton = observer(({currentPage})=>{
  const createPlaylitsTRef = useRef(null);
  const {currentTheme} = useTheme();

if (currentPage !== ALL_SAVED_PLAYLIST_SCREEN ) return null;

  const onPress =()=>{

    modalStore.openModal({
      modalType: MODAL_TYPE.CREATING_A_NEW_PLAYLIST,
      playlistId:"111",
    })
  }

  return(
    <AnimatedPressable onPress={onPress} ref={createPlaylitsTRef} style={styles.icon}>
      <AddIcon size={21} color={currentTheme.iconColor} />
    </AnimatedPressable>
  )
})

export const SearchButton = () => {
    const { currentTheme } = useTheme();
  
    const handleSearchPress = () => {
      modalStore.openModal({
        modalType: MODAL_TYPE.SEARCHING,
      })
    };
  
    return (
      <AnimatedPressable onPress={handleSearchPress} style={styles.icon}>
        <SearchIcon size={22} color={currentTheme.iconColor} />
      </AnimatedPressable>
    );
  };


  
  export const MenuButton = () => {
    const { currentTheme } = useTheme();
    const [isPopoverVisible, setPopoverVisible] = useState(false);
    const MenuRef = useRef(null);
  
    const options = [
      { title: 'Profile', onPress: () => { console.log('profile'); } },
      { title: 'Sound and Effects', onPress: () => { console.log('sound and effects'); } },
      { title: 'Settings', onPress: () => { console.log('settings'); } },
    ];
  
    const togglePopover = () => {
      setPopoverVisible(prev => !prev);
    };
   
    return (
      <>
        <AnimatedPressable  onPress={togglePopover}>
          <Text style={{width:0, height:0}} ref={MenuRef}>{null}</Text>
          <Menu color={currentTheme.iconColor} />
        </AnimatedPressable>

        <CustomPopover
          options={options}
          ref={MenuRef} 
          isVisible={isPopoverVisible} 
          onClose={() => setPopoverVisible(false)} />
      </>
    );
  };
  
  
  
export default function MenuOptions({currentPage}){
    console.log(currentPage);
    

    return (
        <View style={styles.controlContainer}>
        <CreatePlaylistButton currentPage={currentPage}/>
        <SearchButton/>
        <MenuButton/>
        </View>
    )
  }


  const styles = StyleSheet.create({
    controlContainer:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 50,
      gap:10,
    },
    option: {
      padding: 10,
    },
    optionText: {
      fontSize: 16,
      color: 'black',
    },




    toolTipContainer: {
    },
    tooltipContent: {
      backgroundColor: 'blue',
      borderRadius: 20,
      flex:1,
      flexGrow:1,
      width:300,
      
    },
    optionText: {
      color: '#fff',
      fontSize: 16,
    },
  })




  