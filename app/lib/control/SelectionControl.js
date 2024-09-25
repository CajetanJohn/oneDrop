import { makeAutoObservable, observable, action, computed, runInAction, reaction } from 'mobx';
import playlistStore from '../store/playlistStore';
import { ACTIVITY_TYPE } from '../constants/Variables';

class SelectionControl {
  screenProps = {
    headerHeight: 0,
    inView: {},
  };

  selection = {
    selectionActivity: '',
    active: false,

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
      clearSelection: action,
    });

    reaction(
      () => this.selection.selectionActivity,
      async (selectionActivity) => {
        this.populateActivityData(selectionActivity);
      }
    );

    reaction(
      () => this.selection[ACTIVITY_TYPE.SELECTING_CUSTOM_PLAYLISTS].itemsSelected,
      async (items) => {
        if (items.length < 1) {
          await this.turnOffSelection();
        }
      }
    );
  }

  setHeaderHeight = (height) => {
    this.screenProps.headerHeight = height;
  };

  inView = (object) => {
    this.screenProps.inView = object;
  };

  turnOffSelection = async () => {
    const activeType = this.selection.selectionActivity;
    if (!activeType) return;
    const selectionData = this.getSelectionData;
    if (this.selection.active) {
      this.selection.active = false;
      this.selection.selectionActivity = '';
      selectionData.itemsSelected = [];
      selectionData.srcItems = [];
    }
  };

  setActivity = (status) => {
    const { selectionActivity, srcId = '111' } = status;

    this.selection.selectionActivity = selectionActivity;
    this.selection.active = true;
    this.selection[selectionActivity].srcId = srcId || '';
    this.populateActivityData(selectionActivity);
  };

  populateActivityData = (selectionActivity) => {
    if (!selectionActivity) return;
    const { srcId } = this.selection[selectionActivity];
    switch (selectionActivity) {
      case ACTIVITY_TYPE.SELECTING_DEVICE_AUDIO:
      case ACTIVITY_TYPE.SELECTING_AUDIO_FILES_IN_A_CUSTOM_PLAYLIST:
        const playlist = playlistStore.playlists.get(srcId);
        runInAction(() => {
          this.selection[selectionActivity].itemsSelected = [];
          this.selection[selectionActivity].srcItems = playlist?.tracks.map(track => track.id) || [];
        });
        break;

      case ACTIVITY_TYPE.SELECTING_CUSTOM_PLAYLISTS:
        const customPlaylists = playlistStore.getAllPlaylistsByCategory('custom');
        runInAction(() => {
          this.selection[selectionActivity].srcItems = customPlaylists?.map(playlist => playlist.id) || [];
        });
        break;

      default:
        break;
    }
  };

  get getSelectionData() {
    const { selectionActivity } = this.selection;
    return this.selection[selectionActivity] || null;
  }

  get getSelectionStatus() {
    return {
      selectionActivity: this.selection.selectionActivity,
      active: this.selection.active,
    };
  }

  get areAllItemsSelected() {
    const { selectionActivity } = this.selection;
    if (!selectionActivity) return false;
    return this.selection[selectionActivity]?.itemsSelected.length === this.selection[selectionActivity]?.srcItems.length;
  }

  selectItem = (itemId) => {
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
  };

  selectAllItems = () => {
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
  };

  isItemSelected = (itemId) => {
    return this.getSelectionData?.itemsSelected?.includes(itemId) || false;
  };

  clearSelection = () => {
    const { selectionActivity } = this.getSelectionStatus;
    this.selection[selectionActivity].itemsSelected = [];
    return;
  };

  get getScreenProps() {
    return this.screenProps;
  }

  
}

const selectionControl = new SelectionControl();
export default selectionControl;
