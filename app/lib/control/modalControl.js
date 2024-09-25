import { ACTIVITY_TYPE, MODAL_TYPE } from "../constants/Variables";
import { makeAutoObservable, runInAction, action, computed } from 'mobx';
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
          selectionActivity: ACTIVITY_TYPE.SELECTING_DEVICE_AUDIO,
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


  async closeCurrentModal() {
    const modalStackLength = this.modal.modalStack.length;

    if(modalStackLength <= 1 ){
      await this.closeAllModals();
      return
    }

    else{
      this.modal.modalStack.pop();
      this.modal.modalType = this.modal.modalStack.pop();
      
    }
  }
  

  async closeAllModals() {
    runInAction(() => {

      this.modal[this.modal.modalType].playlistId = '';
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


    runInAction(() => {
      this.modal[MODAL_TYPE.CREATING_A_NEW_PLAYLIST].playlistName = 'nextPlaylistName';
    });
  }



}

const modalStore = new ModalStore();
export default modalStore;
