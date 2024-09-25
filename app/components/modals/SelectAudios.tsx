import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { TrackList } from '../../screens/main/DeviceAudio'
import LeftArrowIcon from '../../assets/icons/LeftArrowIcon'
import { useTheme } from '../../lib/utils/SetTheme';
import selectionControl from '../../lib/control/SelectionControl'
import { observer } from 'mobx-react-lite';
import playlistStore from '../../lib/store/playlistStore';
import modalStore from '../../lib/control/modalControl';
import generateUniqueId from '../../lib/utils/generateUniqueId';
import { RadioButton } from '../inputs/RadioButton';
import CloseIcon from '../../assets/icons/CloseIcon';
import { MODAL_TYPE } from '../../lib/constants/Variables';


const EdgeIcon = observer(({onClose})=>{
  const { currentTheme } = useTheme()
  const playlistId = generateUniqueId()


    const createPlaylist = ()=>{
      if(modalStore.modal[MODAL_TYPE.ADDING_AUDIOS_TO_PLAYLIST].playlistId.trim() !== ''){
        playlistStore.addTrackToPlaylist(
          modalStore.modal[MODAL_TYPE.ADDING_AUDIOS_TO_PLAYLIST].playlistId,
          selectionControl.getSelectionData?.itemsSelected || []
        )      
      }
      else{
        const playlist = {
          playlistName: modalStore.getPlaylistName,
          tracks:selectionControl.getSelectionData?.itemsSelected || [],
          id:playlistId
        }
        playlistStore.createPlaylist(playlist); 
      }
           
      modalStore.closeAllModals();
      
    }

    return (
        <View style={{gap:15, flexDirection:"row", alignItems:"center", backgroundColor:"transparent"}}>
          <RadioButton isSelected={selectionControl.areAllItemsSelected}  onPress={()=>selectionControl.selectAllItems()}/>
                
          {selectionControl.getSelectionData?.itemsSelected?.length > 0 ? (
            <Pressable onPress={createPlaylist} style={styles.doneButton}>
              <Text>Done</Text>
            </Pressable>
            ) : (
           null
            )}
        </View>
    )
})



const SelectAudios = ({onClose}) => {
    const {currentTheme} = useTheme();

  return (
    <View style={{backgroundColor:'transparent'}}>
         <View style={[styles.header, { backgroundColor: currentTheme.background }]}>
            <TouchableOpacity onPress={()=>onClose()}>
              <LeftArrowIcon  size={30} color={currentTheme.iconColor}/>
            </TouchableOpacity>

            <EdgeIcon onClose={onClose}/>

          </View>   
            <TrackList  playlistId={"111"} />
      </View>
  )
}


const styles = StyleSheet.create({
    header: {
      position: "absolute",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems:"center",
      paddingHorizontal: 15,
      paddingVertical:15,
      top: 0,
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
    Container: {
      width: 130,
      height: 130,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      borderRadius: 20,
      gap: 4,
      marginBottom: 10,
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
    doneButton:{
      backgroundColor:"blue",
      padding:5
    }
  });

export default SelectAudios