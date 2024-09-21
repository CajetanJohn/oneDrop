import React, { useCallback, useRef, useState } from 'react';
import { View, Pressable, StyleSheet, Text,Animated, TouchableOpacity } from 'react-native';
import { useTheme } from '../lib/utils/SetTheme';
import Menu from '../assets/icons/menu';
import { ALL_SAVED_PLAYLIST_SCREEN, CREATE_PLAYLIST } from '@env';
import SearchIcon from '../assets/icons/SearchIcon';
import selectionControl from '../lib/control/SelectionControl';
import AddIcon from '../assets/icons/AddIcon';
import { observer } from 'mobx-react-lite';
import { Tooltip } from 'react-native-elements';
import modalStore from '../lib/control/modalControl';
import { MODAL_TYPE } from '../lib/constants/Variables';

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
    <Pressable onPress={onPress} ref={createPlaylitsTRef} style={styles.icon}>
          <AddIcon size={21} color={currentTheme.iconColor} />
    </Pressable>
  )
})

export const SearchButton = () => {
    const { currentTheme } = useTheme();
  
    const handleSearchPress = () => {
      console.log("Search pressed");
    };
  
    return (
      <Pressable onPress={handleSearchPress} style={styles.icon}>
        <SearchIcon size={22} color={currentTheme.iconColor} />
      </Pressable>
    );
  };


  
  export const MenuButton = () => {
    const { currentTheme } = useTheme();
    const [scaleAnim] = useState(new Animated.Value(0));
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  
    const handleOpenTooltip = () => {
      setIsTooltipVisible(true);
  
      scaleAnim.setValue(0);
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };
  
    const handleCloseTooltip = () => {
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsTooltipVisible(false));
    };
  
    return (
      <View style={styles.toolTipContainer}>
        <Tooltip
          popover={
            isTooltipVisible && (
              <Animated.View
                style={[
                  styles.tooltipContent,
                  {
                    transform: [{ scale: scaleAnim }],
                    transformOrigin: 'top right',
                    backgroundColor: currentTheme.tertiaryBackground
                  },
                ]}
              >
                <Pressable onPress={() => console.log('Settings clicked')} style={styles.option}>
                  <Text style={styles.optionText}>Settings</Text>
                </Pressable>
                <Pressable onPress={() => console.log('Sound & Effects clicked')} style={styles.option}>
                  <Text style={styles.optionText}>Sound & Effects</Text>
                </Pressable>
                <Pressable onPress={() => console.log('Profile clicked')} style={styles.option}>
                  <Text style={styles.optionText}>Profile</Text>
                </Pressable>
                {/* Button to close tooltip */}
                <Pressable onPress={handleCloseTooltip} style={styles.option}>
                  <Text style={styles.optionText}>Close</Text>
                </Pressable>
              </Animated.View>
            )
          }
          backgroundColor="transparent"
          height={150}
          width={300}
          withPointer={false}
          placement="auto"
          onOpen={handleOpenTooltip}
          containerStyle={{ position: 'absolute', top:20 }}
          overlayColor='transparent'
        >
          
          <View>
            <Menu color={currentTheme.iconColor} size={24} />
          </View>
        </Tooltip>
      </View>
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
      gap:5,
    },
    icon: {
      padding: 10,
      borderRadius: 50,
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




  