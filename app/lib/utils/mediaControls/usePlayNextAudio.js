import { useCallback, useContext, useRef, useEffect } from 'react';
import { PlayBackAudioContext } from '../../control/audioPlayBackContext';
import { usePlayAudio } from './usePlayAudio';
import { useShuffleMode } from './useShuffleMode'; // Import useShuffleMode

export const usePlayNextAudio = () => {
    const { playAudio } = usePlayAudio();
    const { accessState } = useContext(PlayBackAudioContext);
    const { toggleShuffle, populateShuffledQueue } = useShuffleMode(); // Get toggleShuffle and populateShuffledQueue functions

    // Create refs for context values
    const loadedPlaylistRef = useRef(accessState.loadedPlaylist);
    const currentPlayingAudioRef = useRef(accessState.currentPlayingAudio);
    const currentIndexRef = useRef(accessState.currentIndex);
    const repeatRef = useRef(accessState.repeat);
    const shuffleRef = useRef(accessState.shuffle);

    // Sync refs with context values on each render
    useEffect(() => {
        loadedPlaylistRef.current = accessState.loadedPlaylist;
        currentPlayingAudioRef.current = accessState.currentPlayingAudio;
        currentIndexRef.current = accessState.currentIndex;
        repeatRef.current = accessState.repeat;
        shuffleRef.current = accessState.shuffle;
    }, [
        accessState.loadedPlaylist,
        accessState.currentPlayingAudio,
        accessState.currentIndex,
        accessState.repeat,
        accessState.shuffle
    ]);

    const playNextAudio = useCallback(async () => {
        const loadedPlaylist = loadedPlaylistRef.current;
        const currentPlayingAudio = currentPlayingAudioRef.current;
        const currentIndex = currentIndexRef.current;
        const repeat = repeatRef.current;
        const shuffle = shuffleRef.current;

        if (!loadedPlaylist) return;

        const playCurrentAudio = async () => {
            if (currentPlayingAudio) {
                await playAudio(loadedPlaylist, currentPlayingAudio, currentIndex);
            }
        };

        const playNextInSequence = async () => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= loadedPlaylist.tracks.length) {
                nextIndex = 0; // Loop to the start
            }
            await playAudio(loadedPlaylist, loadedPlaylist.tracks[nextIndex], nextIndex);
        };

        const getRandomIndex = () => {
            return Math.floor(Math.random() * loadedPlaylist.tracks.length);
        };

        if (repeat === 'one') {
            await playCurrentAudio();
        } else if (shuffle) {
            const randomIndex = getRandomIndex();
            await playAudio(loadedPlaylist, loadedPlaylist.tracks[randomIndex], randomIndex);
        } else {
            await playNextInSequence();
        }
    }, [playAudio, toggleShuffle, populateShuffledQueue]);

    return { playNextAudio };
};
