import { makeAutoObservable, observable, computed, action } from 'mobx';

class PlaylistStore {
  playlists = observable.map({
    '111': {
      playlistName: 'Device Tracks',
      tracks: observable.array([]),
      dateCreated: new Date().toISOString(),
      category: 'device',
      id: '111',
      playlistLength: 0,
      lastModified: null,
    },
    '222': {
      playlistName: 'Favorites',
      tracks: observable.array([]),
      dateCreated: new Date().toISOString(),
      category: 'default',
      id: '222',
      playlistLength: 0,
      lastModified: null,
    },
    '333': {
      playlistName: 'Recently Added',
      tracks: observable.array([]),
      dateCreated: new Date().toISOString(),
      category: 'default',
      id: '333',
      playlistLength: 0,
      lastModified: null,
    },
    '444': {
      playlistName: 'Most Played',
      tracks: observable.array([]),
      dateCreated: new Date().toISOString(),
      category: 'default',
      id: '444',
      playlistLength: 0,
      lastModified: null,
    },
    '555': {
      playlistName: 'Recently Played',
      tracks: observable.array([]),
      dateCreated: new Date().toISOString(),
      category: 'default',
      id: '555',
      playlistLength: 0,
      lastModified: null,
    },
  });

  constructor() {
    makeAutoObservable(this, {
      playlists: observable,
      addPlaylist: action,
      deletePlaylist: action,
      getPlaylistDetails: action,
      addTrackToPlaylist: action,
      deleteTrackFromPlaylist: action,
      playlistNameExists: action,
      createPlaylist:action
    });
  }


  createPlaylist({ playlistName, tracks = [], category = 'custom', id }) {
    const deviceTracksPlaylist = this.playlists.get('111');
    
    if (!deviceTracksPlaylist) {
      return { error: 'Device Tracks playlist not found' };
    }
  
    // Ensure tracks is an array of IDs; if it's a string, convert it to an array
    const trackIds = Array.isArray(tracks) ? tracks : [tracks];
  
    // Fetch the track details from the "Device Tracks" playlist
    const fetchedTracks = deviceTracksPlaylist.tracks.filter(track => 
      trackIds.includes(track.id)
    );
  
    // Check if playlist with the same name exists
    const existingPlaylist = Array.from(this.playlists.values()).find(p => p.playlistName === playlistName);
  
    if (existingPlaylist) {
      // Update existing playlist with new tracks
      existingPlaylist.tracks.replace(fetchedTracks);
      existingPlaylist.playlistLength = fetchedTracks.length;
      existingPlaylist.lastModified = new Date().toISOString();
    } else {
      // Add new playlist with fetched track details
      const newId = id ? id : String(Date.now());
      const newPlaylist = {
        playlistName,
        tracks: observable.array(fetchedTracks),
        dateCreated: new Date().toISOString(),
        category,
        id: newId,
        playlistLength: fetchedTracks.length,
        lastModified: null,
      };
  
      this.playlists.set(newId, newPlaylist);
      console.log('New playlist added');
    }
  }
  

  // Action to add a new playlist or create a template playlist
  addPlaylist({ playlistName, tracks = [], category = 'custom', id }) {
    const existingPlaylist = Array.from(this.playlists.values()).find(p => p.playlistName === playlistName);

    if (existingPlaylist) {
      // Update existing playlist
      existingPlaylist.tracks.replace(tracks);
      existingPlaylist.playlistLength = tracks.length;
      existingPlaylist.lastModified = new Date().toISOString();
    } else {
      // Add new playlist
      const newId = id ? id : String(Date.now());
      const newPlaylist = {
        playlistName,
        tracks: observable.array(tracks),
        dateCreated: new Date().toISOString(),
        category,
        id: newId,
        playlistLength: tracks.length,
        lastModified: null,
      };
      this.playlists.set(newId, newPlaylist);
      console.log('New playlist added');
    }
  }

  // Action to delete a playlist by playlistId
  // Action to delete playlists by playlistId(s)
deletePlaylist(playlistId) {
  // Ensure playlistId is an array; if it's a string or single ID, convert it to an array
  const playlistIds = Array.isArray(playlistId) ? playlistId : [playlistId];
console.log("called");

  // Loop through each playlistId and delete if it exists in the store
  playlistIds.forEach(id => {
    if (this.playlists.has(id)) {
      this.playlists.delete(id);
      console.log(`Playlist with id ${id} has been deleted.`);
    } else {
      console.log(`Playlist with id ${id} not found.`);
    }
  });
}


  // Action to fetch and observe a playlist's details
  getPlaylistDetails(playlistId) {
    return this.playlists.get(playlistId);
  }

  // Action to add tracks to a playlist
  addTrackToPlaylist(playlistId, tracks) {
    const playlist = this.playlists.get(playlistId);
    
    if (!playlist) {
      return { error: 'Playlist not found' };
    }
  
    // Get the 'Device Tracks' playlist to fetch the track details
    const deviceTracksPlaylist = this.playlists.get('111');
    
    if (!deviceTracksPlaylist) {
      return { error: 'Device Tracks playlist not found' };
    }
  
    // Filter out tracks that already exist in the playlist by ID
    const existingTrackIds = playlist.tracks.map(track => track.id);
    const newTracks = tracks.filter(track => !existingTrackIds.includes(track));
  
    console.log("New tracks to add:", newTracks, "Existing tracks:", existingTrackIds);
    
    // Log how many tracks are already in the playlist
    const existingCount = tracks.length - newTracks.length;
    if (existingCount > 0) {
      console.log(`${existingCount} track(s) are already present in the playlist.`);
    }
  
    // If no new tracks to add, return
    if (newTracks.length === 0) {
      return { error: 'No new tracks to add' };
    }
  
    // Fetch the new track details from 'Device Tracks' playlist
    const fetchedTracks = deviceTracksPlaylist.tracks.filter(deviceTrack => 
      newTracks.some(newTrack => newTrack === deviceTrack.id)
    );
    
  
    if (fetchedTracks.length === 0) {
      return { error: 'No matching tracks found in Device Tracks' };
    }
  
    // Concatenate the new track details with the existing tracks
    const updatedTracks = [...playlist.tracks, ...fetchedTracks];
  
    // Update the playlist
    playlist.tracks.replace(updatedTracks);
    playlist.playlistLength = updatedTracks.length;
    playlist.lastModified = new Date().toISOString();
  
    return { success: true, addedTracks: fetchedTracks };
  }
  
  // Action to delete a track from a playlist
  deleteTrackFromPlaylist(playlistId, tracks) {
    const playlist = this.playlists.get(playlistId);
  
    if (!playlist) {
      return { error: 'Playlist not found' };
    }
  
    // If playlistId is "111", log and return
    if (playlistId === '111') {
      console.log('Trying to remove audio files from device');
      return { error: 'Cannot remove audio files from device playlist' };
    }
  
    // Ensure tracks is an array; if it's a string, convert it to an array
    const trackIdsToRemove = Array.isArray(tracks) ? tracks : [tracks];
  
    // Find and remove tracks from the playlist that match the track IDs
    const updatedTracks = playlist.tracks.filter(track => !trackIdsToRemove.includes(track.id));
  
    // If no tracks were removed, return error
    if (updatedTracks.length === playlist.tracks.length) {
      return { error: 'No tracks were found to remove from the playlist' };
    }
  
    // Update the playlist with the remaining tracks
    playlist.tracks.replace(updatedTracks);
    playlist.playlistLength = updatedTracks.length;
    playlist.lastModified = new Date().toISOString();
  
    return { success: true, removedTracks: trackIdsToRemove.length - updatedTracks.length };
  }
  
  // Computed value to get all playlists' details (used for rendering the overview)
  get allPlaylistsData() {
    return Array.from(this.playlists.values()).map(playlist => ({
      playlistName: playlist.playlistName,
      id: playlist.id,
      dateCreated: playlist.dateCreated,
      lastModified: playlist.lastModified,
      playlistLength: playlist.playlistLength,
      category: playlist.category,
    }));
  }

  // Computed value to get the total number of playlists
  get totalPlaylists() {
    return this.playlists.size;
  }

  // Action to check if a playlist name already exists
  playlistNameExists(playlistName) {
    return Array.from(this.playlists.values()).some(playlist => playlist.playlistName === playlistName);
  }

  // Computed value to get all playlists by a specific category
  getAllPlaylistsByCategory(category) {
    return Array.from(this.playlists.values()).filter(playlist => playlist.category === category);
  }
}

const playlistStore = new PlaylistStore();
export default playlistStore;
