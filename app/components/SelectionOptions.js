import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import ShareIcon from '../assets/icons/ShareIcon';
import TrashIcon from '../assets/icons/TrashIcon';
import CloseIcon from '../assets/icons/CloseIcon';
import { useTheme } from '../lib/utils/SetTheme';
import selectionControl from '../lib/control/SelectionControl';
import { observer } from 'mobx-react-lite';
import AddIcon from '../assets/icons/AddIcon';
import { ACTIVITY_TYPE, MODAL_TYPE } from '../lib/constants/Variables';
import modalStore from '../lib/control/modalControl';
import { RadioButton } from './inputs/RadioButton';
import playlistStore from '../lib/store/playlistStore';
// SelectAllRadioButton Component


const SelectAllRadioButton = observer(() => {
  const toggleSelection = () => {
    selectionControl.selectAllItems();
  };

  return (
    <RadioButton
      isSelected={selectionControl.areAllItemsSelected}
      onPress={toggleSelection}
    />
  );
});



export const SelectPlaylistButton = observer(() => {
  const { currentTheme } = useTheme();
  const SelectPlaylistButtonRef = useRef(null);

  let isShown =( selectionControl.getSelectionData?.itemsSelected?.length > 0 &&
  selectionControl.getSelectionStatus?.activityType !== ACTIVITY_TYPE.SELECTING_CUSTOM_PLAYLISTS
)
  if(!isShown){
    return false
  }
  // onPress function to toggle popover visibility
  const onPress =()=>{
    modalStore.openModal({
      modalType: MODAL_TYPE.CHOOSING_SPECIFIC_PLAYLIST_TO_ADD_SELECTED_AUDIOS_TO,
      playlistId:"111",
    })
  }

  return (
    <View>
      <TouchableOpacity onPress={onPress} ref={SelectPlaylistButtonRef} style={styles.button}>
          <AddIcon size={20} color={currentTheme.iconColor} />
        </TouchableOpacity>
    </View>
  );
});

// ShareIcon Component
export const ShareSelectedIcon = () => {
  const { currentTheme } = useTheme();

  const logSelectedTracks = () => {
    console.log(selectionControl.getSelectionData?.itemsSelected || null);
  };

  return (
    <TouchableOpacity onPress={logSelectedTracks}>
      <ShareIcon color={currentTheme.iconColor} size={18} />
    </TouchableOpacity>
  );
};

// TrashIcon Component
export const TrashSelectedIcon = () => {
  const { currentTheme } = useTheme();

  const logSelectedTracks = () => {

    if(selectionControl.getSelectionStatus?.activityType === ACTIVITY_TYPE.SELECTING_CUSTOM_PLAYLISTS){
      playlistStore.deletePlaylist(selectionControl.getSelectionData?.itemsSelected)
    }
    else if(selectionControl.getSelectionStatus?.activityType === ACTIVITY_TYPE.SELECTING_DEVICE_AUDIO){
      playlistStore.deleteTrackFromPlaylist(
        modalStore?.modal[MODAL_TYPE.VIEWING_PLAYLIST_DETAILS].playlistId || '111',
        selectionControl.getSelectionData?.itemsSelected
      )
    }
    
  };

  return (
    <TouchableOpacity onPress={logSelectedTracks}>
      <TrashIcon color={currentTheme.iconColor} size={17} />
    </TouchableOpacity>
  );
};

// CloseIcon Component
export const CloseSelectionModeIcon = () => {
  const { currentTheme } = useTheme();

  const closeSelectionMode = async () => {
    await selectionControl.turnOffSelection();
  };

  return (
    <TouchableOpacity onPress={closeSelectionMode}>
      <CloseIcon color={currentTheme.iconColor} size={30} />
    </TouchableOpacity>
  );
};


// Main SelectionOptions Component
const SelectionOptions = observer(() => {
  return (
    <View style={styles.optionContainers}>
      <SelectPlaylistButton />
      <SelectAllRadioButton />
      <ShareSelectedIcon />
      <TrashSelectedIcon />
      <CloseSelectionModeIcon />
    </View>
  );
});

// Styles for icons container
const styles = StyleSheet.create({
  optionContainers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    gap: 20,
  }
});

export default SelectionOptions;
