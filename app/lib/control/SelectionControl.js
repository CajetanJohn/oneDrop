import { makeAutoObservable, observable, action, computed, runInAction, reaction } from 'mobx';
import playlistStore from '../store/playlistStore';
import { ACTIVITY_TYPE } from '../constants/Variables';

class SelectionControl {
  screenProps = {
    headerHeight: 0,
    inView: {},
  };

  selection = {
    activityType: '',
    active:false,

    [ACTIVITY_TYPE.SELECTING_DEVICE_AUDIO]: {
      itemsSelected: [],
      srcItems: [],
      srcId: '111',
    },

    [ACTIVITY_TYPE.SELECTING_AUDIO_FILES_IN_A_CUSTOM_PLAYLIST]: {
      itemsSelected: [],
      srcItems: [],
      srcId: '',
    },

    [ACTIVITY_TYPE.SELECTING_CUSTOM_PLAYLISTS]: {
      itemsSelected: [],
      playlistName: '',
      srcItems: [],
      srcId: '',
    },

    [ACTIVITY_TYPE.SELECTED_EVENTS]: {
      itemsSelected: [],
    },

  };

  constructor() {
    makeAutoObservable(this, {
      screenProps: observable,
      selection: observable,
      setActivity: action,
      turnOffSelection: action,
      setHeaderHeight: action,
      addToItems: action,
      removeFromItems: action,
      selectAllItems: action,
      deselectAllItems: action,
      getActivityData: computed,
      getScreenProps: computed,
      getActivityStatus: computed,
      areAllItemsSelected: computed,
    });

    reaction(
      () => this.selection.activityType,
      async (activityType) => {
        this.populateActivityData(activityType);
        //calling the below  at this point will close the activated selection activity. selection wont be activated
        //await this.turnOffSelection();
      }
    );

    reaction(
      () => this.selection[ACTIVITY_TYPE.SELECTING_CUSTOM_PLAYLISTS].itemsSelected,
      async (items) => {
        if( items.length < 1 ){
          await this.turnOffSelection();
        }
      }
    );
  }
  


  setHeaderHeight(height) {
    this.screenProps.headerHeight = height;
  }



  inView(object) {
    this.screenProps.inView = object;
  }



  async turnOffSelection() {
    const activeType = this.selection.activityType;
    if (!activeType) return;
    const selectionData = this.getSelectionData;
    if (this.selection.active) {
      this.selection.active = false;
      this.selection.activityType = "";
      selectionData.itemsSelected = [];
      selectionData.srcItems = [];
    }
  }


  setActivity(status) {
    const { activityType, srcId = '111' } = status;

      this.selection.activityType = activityType;
      this.selection.active =  true;
      this.selection[activityType].srcId = srcId || '';
      this.populateActivityData(activityType)
  }


  populateActivityData(activityType) {
    if (activityType.trim() === '') return;
    const { srcId } = this.selection[activityType];
    switch (activityType) {

      case ACTIVITY_TYPE.SELECTING_DEVICE_AUDIO:
      case ACTIVITY_TYPE.SELECTING_AUDIO_FILES_IN_A_CUSTOM_PLAYLIST:
        const playlist = playlistStore.playlists.get(srcId);
        runInAction(() => {
          this.selection[activityType].itemsSelected = [];
          this.selection[activityType].srcItems = playlist?.tracks.map(track => track.id) || [];
        });
        break;

      case ACTIVITY_TYPE.SELECTING_CUSTOM_PLAYLISTS:
        const customPlaylists = playlistStore.getAllPlaylistsByCategory('custom');
        runInAction(() => {
          this.selection[activityType].srcItems = customPlaylists?.map(playlist => playlist.id) || [];
        });
        break;

      default:
        break;
    }
  }

  

  get getSelectionData() {
    const { activityType } = this.selection;
    if (activityType.trim() === ''){return null}
    return this.selection[activityType] || null;
  }



  get getSelectionStatus() {
    return {
      activityType:this.selection.activityType,
      active:this.selection.active
    }
  }



  get areAllItemsSelected() {
    const { activityType } = this.selection;
    if (activityType.trim() === '') return false;
    return this.selection[activityType]?.itemsSelected.length === this.selection[activityType]?.srcItems.length;
  }


  selectItem(itemId) {
    const selectedItems = this.getSelectionData.itemsSelected;
    if (!selectedItems) return;
    if (!this.isItemSelected(itemId)) {
      selectedItems.push(itemId);
    } else {

      const index = selectedItems.indexOf(itemId);
      if (index > -1) {
        selectedItems.splice(index, 1);
      }
    }
  }



  selectAllItems() {
    const selectionData = this.getSelectionData;
    if (!selectionData.srcItems || selectionData.srcItems.length === 0) {
      return;
    }
    if (this.areAllItemsSelected) {
      selectionData.itemsSelected = [];
    } else {
      runInAction(() => {
        selectionData.itemsSelected = [...selectionData.srcItems];
      });
    }
  }



  isItemSelected(itemId) {
    return this.getSelectionData?.itemsSelected?.includes(itemId) || false;
  }




  get getScreenProps() {
    return this.screenProps;
  }



}



const selectionControl = new SelectionControl();
export default selectionControl;
