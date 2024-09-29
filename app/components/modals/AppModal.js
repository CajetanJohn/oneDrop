import React, { useEffect, useState } from 'react';
import { Modal, BackHandler, SafeAreaView, StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react';
import PlaylistDetails from './PlaylistDetails';
import PlaylistName from './PlaylistName';
import SelectAudios from './SelectAudios';
import SelectPlaylist from './SelectPlaylist';
import { useTheme } from '../../lib/utils/SetTheme';
import { MODAL_TYPE } from '../../lib/constants/Variables';
import modalStore from '../../lib/control/modalControl';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchNavigation from '../../screens/search/navigator';

const AppModal = observer(() => {
  const status = modalStore.getModalData;
  const { currentTheme } = useTheme();
  const [backPressHandled, setBackPressHandled] = useState(false);

  // Get the safe area insets for top, bottom, left, right
  const insets = useSafeAreaInsets();

  
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
      case MODAL_TYPE.SEARCHING:
        return <SearchNavigation onClose={handleClose} />;
      default:
        return null;
    }
  };

  // Back handler logic
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (status?.isOpen && !backPressHandled) {
        setBackPressHandled(true); // Prevent multiple triggers
        handleClose();       
        return true;
      }
      return false;
    });

    // Reset back press handler after the modal is closed or when the modal stack updates
    return () => {
      setBackPressHandled(false); // Reset backPressHandled when unmounting or modal updates
      backHandler.remove();
    };
  }, [status?.isOpen, backPressHandled]); // Dependencies: handle back presses only when the modal is open

  const handleClose = () => {
    modalStore.closeCurrentModal();
    setBackPressHandled(false); // Reset the flag after the close
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={status?.isOpen}
      onRequestClose={handleClose}
      statusBarTranslucent={true}
    >
      {/* Add padding using insets */}
      <View style={{ 
        flex: 1, 
        backgroundColor: currentTheme.background,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
        {child()}
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({});

export default AppModal;
