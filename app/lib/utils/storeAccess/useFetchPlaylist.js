import { useSelector } from 'react-redux';
import { fetchPlaylistById } from '../../lib/store/store';
/**
 * Custom hook to fetch a playlist from the Redux store based on ID
 * @param {string} id - The ID of the playlist to fetch
 * @returns {Object} - The playlist data
 */
export const useFetchPlaylist = (id) => {
    const playlist = useSelector(state => fetchPlaylistById(state, id));

    if (!playlist) {
        throw new Error(`Playlist with ID ${id} not found`);
    }

    return playlist;
};
