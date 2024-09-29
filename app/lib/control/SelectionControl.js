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

  search = {
    active:false,
    searchingFrom:'',
    searchText:'',

    sourceData:{
      localData:[],
      onlineData:['Online Song 1', 'On8line Song 2', 'Online Song 3'],
    }
  }

  constructor() {
    makeAutoObservable(this, {
      screenProps: observable,
      selection: observable,
      getActivityData: computed,
      getScreenProps: computed,
      getActivityStatus: computed,
      areAllItemsSelected: computed,
      filteredResults: computed,
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

    reaction(
      () => this.search.active,
      () => {
        const playlist = playlistStore.playlists.get('111');
        this.search.sourceData.localData = playlist.tracks || []
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
  
    // Check if activeType exists; if not, return early
    if (!activeType) return;
  
    // Safely access selectionData and ensure it exists
    const selectionData = this.getSelectionData;
    if (!selectionData) return; // Ensure selectionData is defined
  
    // Check if the selection is active
    if (this.selection.active) {
      this.selection.active = false; // Turn off selection
      this.selection.selectionActivity = ''; // Reset selection activity
  
      // Check if itemsSelected and srcItems exist before modifying
      if (Array.isArray(selectionData.itemsSelected)) {
        selectionData.itemsSelected = []; // Clear selected items
      }
  
      if (Array.isArray(selectionData.srcItems)) {
        selectionData.srcItems = []; // Clear source items
      }
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


  setSearchText = (text) => {
    this.search.active = true
    this.search.searchText = text;
  };

  setSearchSource = (tab) => {
    this.search.searchingFrom = tab;
  };

  get getSearchText (){
    return this.search.searchText
  }

  get filteredResults() {
    if(!this.search.active) return
    // Step 1: Determine the source data based on `searchingFrom` key
    const dataToFilter = this.search.searchingFrom === 'Local'
      ? playlistStore.playlists.get('111').tracks
      : playlistStore.playlists.get('111').tracks;
    
    // Step 2: If the search text is empty, return `null` to indicate no results
    const searchText = this.getSearchText.trim();
    if (searchText === '') return null;
  
    // Step 3: Normalize the search text
    const normalizedSearchText = this.normalizeString(searchText);
  
    // Step 4: Filter the data based on matching any of the fields: `filename`, `artist`, `album`, or `uri`
    return dataToFilter.filter((item) => {
      // Normalize each field and check for matches, ensuring each property exists
      return (
        (item.filename && this.normalizeString(item.filename).includes(normalizedSearchText)) ||
        (item.artist && this.normalizeString(item.artist).includes(normalizedSearchText)) ||
        (item.album && this.normalizeString(item.album).includes(normalizedSearchText)) ||
        (item.uri && this.normalizeString(item.uri).includes(normalizedSearchText))
      );
    });
  }
  
  // Helper function to normalize strings by removing unwanted characters
  normalizeString(string) {
    // Convert to lowercase and remove unwanted characters
    return string
      .toLowerCase()
      .replace(/[_\-\+\s]/g, ''); // Adjust the regex to include any additional characters you want to ignore
  }
  

}

const selectionControl = new SelectionControl();
export default selectionControl;
