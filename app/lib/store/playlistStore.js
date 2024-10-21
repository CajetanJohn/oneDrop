import { makeAutoObservable, observable, computed, action, reaction } from 'mobx';

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
      updateRecentlyAdded: action,
    });

    // Reaction to automatically update 'Recently Added' when 'Device Tracks' changes
    reaction(
      () => this.playlists.get('111')?.tracks.length, // Observes the length of 'Device Tracks' playlist
      () => this.updateRecentlyAdded()
    );
  }

  // Automatically update the 'Recently Added' playlist whenever the 'Device Tracks' changes
  updateRecentlyAdded() {
    const deviceTracksPlaylist = this.playlists.get('111');
    if (!deviceTracksPlaylist) return;

    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);

    const recentlyAddedTracks = deviceTracksPlaylist.tracks.filter(track => 
      new Date(track.modificationTime) >= sevenDaysAgo
    );

    const recentlyAddedPlaylist = this.playlists.get('333');
    recentlyAddedPlaylist.tracks.replace(recentlyAddedTracks);
    recentlyAddedPlaylist.playlistLength = recentlyAddedTracks.length;
    recentlyAddedPlaylist.lastModified = new Date().toISOString();
  }

  // Action to add a new playlist
  addPlaylist({ playlistName, tracks = [], category = 'custom', id }) {
    const existingPlaylist = Array.from(this.playlists.values()).find(p => p.playlistName === playlistName);

    if (existingPlaylist) {
      existingPlaylist.tracks.replace(tracks);
      existingPlaylist.playlistLength = tracks.length;
      existingPlaylist.lastModified = new Date().toISOString();
    } else {
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

  // Action to delete playlists by playlistId(s)
  deletePlaylist(playlistId) {
    const playlistIds = Array.isArray(playlistId) ? playlistId : [playlistId];
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
    console.log("tracks", tracks);
    
    const playlist = this.playlists.get(playlistId);
    if (!playlist) {
      return { error: 'Playlist not found' };
    }

    const deviceTracksPlaylist = this.playlists.get('111');
    if (!deviceTracksPlaylist) {
      return { error: 'Device Tracks playlist not found' };
    }

    const existingTrackIds = playlist.tracks.map(track => track.id);
    const newTracks = tracks.filter(track => !existingTrackIds.includes(track));
    if (newTracks.length === 0) {
      return { error: 'No new tracks to add' };
    }

    const fetchedTracks = deviceTracksPlaylist.tracks.filter(deviceTrack =>
      newTracks.some(newTrack => newTrack === deviceTrack.id)
    );

    const updatedTracks = [...playlist.tracks, ...fetchedTracks];
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

    if (playlistId === '111') {
      return { error: 'Cannot remove audio files from device playlist' };
    }

    const trackIdsToRemove = Array.isArray(tracks) ? tracks : [tracks];
    const updatedTracks = playlist.tracks.filter(track => !trackIdsToRemove.includes(track.id));
    if (updatedTracks.length === playlist.tracks.length) {
      return { error: 'No tracks were found to remove from the playlist' };
    }

    playlist.tracks.replace(updatedTracks);
    playlist.playlistLength = updatedTracks.length;
    playlist.lastModified = new Date().toISOString();
    return { success: true, removedTracks: trackIdsToRemove.length - updatedTracks.length };
  }

  // Computed value to get all playlists' details
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
