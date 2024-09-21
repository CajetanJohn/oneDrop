import { useContext, useState, useCallback, useEffect } from 'react';
import { PlayBackAudioContext } from '../../control/audioPlayBackContext';


export const useFavorites = () => {
    const { accessState } = useContext(PlayBackAudioContext);
    const { favourites, setFavourites, currentPlayingAudio } = accessState;


    const isAudioInFavorites = useCallback((song) => {
        const audio = song ? song : currentPlayingAudio;
        if (!audio) return false;
        return favourites?.tracks.some(track => track.uri === audio.uri) || false;
    }, [ favourites]);

    const toggleFavorite = useCallback((song) => {
        const audio = song ? song : currentPlayingAudio;
        if (!audio) return;

        const isInFavorites = isAudioInFavorites(audio);

        if (isInFavorites) {
            // Remove audio from favorites
            setFavourites(prevFavourites => ({
                ...prevFavourites,
                tracks: prevFavourites.tracks.filter(track => track.uri !== audio.uri)
            }));
            // Dispatch action to update store
            
        } else {
            // Add audio to favorites
            setFavourites(prevFavourites => ({
                ...prevFavourites,
                tracks: [...prevFavourites.tracks, audio]
            }));
            // Dispatch action to update store
        }
    }, [isAudioInFavorites, setFavourites, currentPlayingAudio, favourites]);

    return {
        isAudioInFavorites,
        toggleFavorite,
    };
};
