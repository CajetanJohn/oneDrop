import * as MediaLibrary from 'expo-media-library';
import playlistStore from '../../store/playlistStore';

export const getAudioFiles = async () => {
    try {
        // Request permissions
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access media library was denied');
            return;
        }

        // Fetch audio files with additional metadata
        const audioFiles = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            first: 1000, // Fetches up to 1000 files (adjust if necessary)
        });
        useEffect(() => {
            let count = 0
          console.log('rerendered', count++);
          
        
          return () => {
            second
          }
        }, [third])
        

        console.log(); // Log the fetched audio files

        // Extract and map track data
        const tracks = audioFiles.assets.map(asset => ({
            id: asset.id,
            uri: asset.uri,
            title: asset.filename || 'Unknown Title',
            duration: asset.duration || 0,
            album: asset.albumId || 'Unknown Album',
            artist: asset.artist || 'Unknown Artist',
            creationTime: asset.creationTime, // Timestamp when the file was created
            mediaType: asset.mediaType,
        }));

        // Playlist details
        const playlistName = "Device Tracks";
        const playlistId = "111";
        const category = "device";

        // Check if the playlist already exists
        const existingPlaylist = playlistStore.getPlaylistDetails(playlistId);
        if (existingPlaylist) {
            const existingTracks = existingPlaylist.tracks;
            const existingTracksIds = existingTracks.map(track => track.id);

            // Check if the playlist has changed
            const newTracksIds = tracks.map(track => track.id);
            if (
                existingTracks.length === tracks.length &&
                existingTracksIds.every(id => newTracksIds.includes(id))
            ) {
                console.log('Data is the same, no update needed');
                return;
            }

            // Update the playlist with new tracks
            playlistStore.addPlaylist({ playlistId, playlistName, tracks, category });
            console.log('Playlist updated with new tracks');
        } else {
            // Create a new playlist
            playlistStore.addPlaylist({ playlistId, playlistName, tracks, category });
            console.log('New playlist added');
        }

    } catch (error) {
        console.error('Error fetching or dispatching audio files:', error);
    }
};
