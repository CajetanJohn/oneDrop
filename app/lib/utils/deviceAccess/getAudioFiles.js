// audioUtils.js

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

        // Fetch audio files
        const audioFiles = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            // Add pagination or other implementations here if needed
        });

        console.log(audioFiles.assets); // Log the audio files

        // Extract track data
        const tracks = audioFiles.assets.map(asset => ({
            id: asset.id,
            uri: asset.uri,
            title: asset.filename,
            // Add more properties if needed
        }));

        // Playlist details
        const playlistName = "Device Tracks";
        const playlistId = "111";
        const category = "device";
        const id = "111"

        // Check if the playlist already exists
        const existingPlaylist = playlistStore.getPlaylistDetails(playlistId);
        if (existingPlaylist) {
            const existingTracks = existingPlaylist.tracks;
            const existingTracksIds = existingTracks.map(track => track.id);

            // Check if the playlist is the same
            const newTracksIds = tracks.map(track => track.id);
            if (
                existingTracks.length === tracks.length &&
                existingTracksIds.every(id => newTracksIds.includes(id))
            ) {
                console.log('Data is the same, no update needed');
                return;
            }

            // Update the playlist
            playlistStore.createPlaylist({playlistName, tracks, category});
            console.log('Playlist updated with new tracks');
        } else {
            // Add a new playlist
            playlistStore.createPlaylist({playlistName, tracks, category});
        }

    } catch (error) {
        console.error('Error fetching or dispatching audio files:', error);
    }
};
