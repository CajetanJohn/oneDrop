import { ACTIVITY_TYPE, MODAL_TYPE } from "../constants/Variables";
import { makeAutoObservable, runInAction, action, reaction, computed } from 'mobx';
import playlistStore from '../store/playlistStore';
import selectionControl from "./SelectionControl";


class ModalStore {

  modal = {

    modalType: '',
    isOpen: false,
    modalStack : [],

    [MODAL_TYPE.CREATING_A_NEW_PLAYLIST]: {
      playlistName: '',
      itemsToInsert: [],
    },

    [MODAL_TYPE.CHOOSING_SPECIFIC_PLAYLIST_TO_ADD_SELECTED_AUDIOS_TO]: {
      itemsToInsert: [],
      allPlaylists: [],
    },

    [MODAL_TYPE.ADDING_AUDIOS_TO_PLAYLIST]: {
      itemsToInsert: [],
      playlistId: '',
    },

    [MODAL_TYPE.VIEWING_PLAYLIST_DETAILS]: {
      playlistId: '',
    },
    



  };


  constructor() {
    makeAutoObservable(this, {
      modal: true,
      openModal: true,
      getModalData: true,
      setPlaylistName: action,
      getPlaylistName: computed,
      closeCurrentModal:action,
    });

  }



  async openModal({ modalType, playlistId }) {
    runInAction(() => {

      if (modalType) {
        this.modal.modalStack.push(modalType);
      }
      this.modal.modalType = modalType;
      this.modal.isOpen = true;

    });
 

    switch (modalType) {

      case MODAL_TYPE.CREATING_A_NEW_PLAYLIST:
        await this.calculateAndSetPlaylistName();
        break;

      case MODAL_TYPE.CHOOSING_SPECIFIC_PLAYLIST_TO_ADD_SELECTED_AUDIOS_TO:
        break;

      case MODAL_TYPE.ADDING_AUDIOS_TO_PLAYLIST:
        this.modal[modalType].playlistId = this.modal[MODAL_TYPE.VIEWING_PLAYLIST_DETAILS].playlistId
        const newStatus = {
          srcId: "111",
          activityType: ACTIVITY_TYPE.SELECTING_DEVICE_AUDIO,
        };
        selectionControl.setActivity(newStatus);
        break;

      case MODAL_TYPE.VIEWING_PLAYLIST_DETAILS:
        this.modal[modalType].playlistId = playlistId;
        break;

      default:
        break;
    }
  }


  closeCurrentModal() {

    if (this.modal.modalStack.length > 0) {
      const previousModalType = this.modal.modalStack.pop();
      this.modal.modalType = previousModalType;
      this.modal.isOpen = true;
      return;

    } else {
      this.closeAllModals();
    }
  }
  

  async closeAllModals() {
    runInAction(() => {
      this.modal.modalStack = [];
      this.modal.isOpen = false;
      this.modal.modalType = '';
      this.calculateAndSetPlaylistName();
      selectionControl.turnOffSelection();
    });
  }


  get getModalData() {
    return { modalType: this.modal.modalType, isOpen: this.modal.isOpen };
  }


  setPlaylistName(name) {
    runInAction(() => {
      if (this.modal.modalType === MODAL_TYPE.CREATING_A_NEW_PLAYLIST) {
        this.modal[MODAL_TYPE.CREATING_A_NEW_PLAYLIST].playlistName = name;
      }
    });
  }


  get getPlaylistName() {
    return this.modal[MODAL_TYPE.CREATING_A_NEW_PLAYLIST]?.playlistName || '';
  }


  async calculateAndSetPlaylistName() {

    const customPlaylists = playlistStore.getAllPlaylistsByCategory('custom');
    const customPlaylistNames = customPlaylists
      .map(playlist => playlist.playlistName)
      .filter(name => /^Playlist_\d{3}$/.test(name))
      .sort();


    let nextPlaylistName = 'Playlist_001';
    if (customPlaylistNames.length > 0) {
      const highestNumber = Math.max(...customPlaylistNames.map(name => parseInt(name.split('_')[1], 10)));
      nextPlaylistName = `Playlist_${String(highestNumber + 1).padStart(3, '0')}`;
    }

    runInAction(() => {
      this.modal[MODAL_TYPE.CREATING_A_NEW_PLAYLIST].playlistName = nextPlaylistName;
    });
  }



}

const modalStore = new ModalStore();
export default modalStore;
