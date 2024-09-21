import React, { useEffect, useState } from 'react';
import { Modal, BackHandler, SafeAreaView, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import PlaylistDetails from './PlaylistDetails';
import PlaylistName from './PlaylistName';
import SelectAudios from './SelectAudios';
import SelectPlaylist from './SelectPlaylist';
import { useTheme } from '../../lib/utils/SetTheme';
import { MODAL_TYPE } from '../../lib/constants/Variables';
import modalStore from '../../lib/control/modalControl';



const AppModal = observer(() => {
  const status = modalStore.getModalData;
  const { currentTheme } = useTheme();
  const [backPressHandled, setBackPressHandled] = useState(false)

  useEffect(() => {
    console.log(status);
    
  }, [modalStore.getModalData])
  
  const child = () => {
    switch (status.modalType) {
      case MODAL_TYPE.CREATING_A_NEW_PLAYLIST:
        return <PlaylistName onClose={handleClose} />;
      case MODAL_TYPE.VIEWING_PLAYLIST_DETAILS:
        return <PlaylistDetails playlistId={modalStore?.modal[MODAL_TYPE.VIEWING_PLAYLIST_DETAILS].playlistId} onClose={handleClose} />;
      case MODAL_TYPE.ADDING_AUDIOS_TO_PLAYLIST:
        return <SelectAudios onClose={handleClose} />;
      case MODAL_TYPE.CHOOSING_SPECIFIC_PLAYLIST_TO_ADD_SELECTED_AUDIOS_TO:
        return <SelectPlaylist onClose={handleClose} />;
      default:
        return null;
    }
  };

  // Back handler logic
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    console.log('Closing modal, current modalType:', modalStore.modal.modalType);

      if (status?.isOpen && !backPressHandled) {

        setBackPressHandled(true);
        handleClose();       
        return true;
      }
      return false;
    });

    return () => {
      setBackPressHandled(false)
      backHandler.remove();
    };
  }, []); 

  const handleClose = () => {
    console.log("called");
    
    modalStore.closeCurrentModal();
    setBackPressHandled(false);
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={status?.isOpen}
      onRequestClose={handleClose}
      statusBarTranslucent={true}
    >
      <SafeAreaView style={[{ backgroundColor: "blue", flex: 1 }]}>
        {child()}
      </SafeAreaView>
    </Modal>
  );
});

const styles = StyleSheet.create({});

export default AppModal;
