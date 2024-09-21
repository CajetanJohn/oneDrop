import { useCallback, useContext, useRef, useEffect } from 'react';
import { PlayBackAudioContext } from '../../control/audioPlayBackContext';
import { usePlayAudio } from './usePlayAudio';
import { useShuffleMode } from './useShuffleMode'; // Import useShuffleMode

export const usePlayPreviousAudio = () => {
    const { playAudio } = usePlayAudio();
    const { accessState } = useContext(PlayBackAudioContext);
    const { shuffle, populateShuffledQueue } = accessState;

    // Use the shuffle mode hook
    const { toggleShuffle } = useShuffleMode();

    // Create refs to store the current state
    const accessStateRef = useRef(accessState);

    // Sync refs with the latest values on each render
    useEffect(() => {
        accessStateRef.current = accessState;
    }, [accessState]);

    const playPreviousAudio = useCallback(async () => {
        const { loadedPlaylist, playbackAudio, currentPlayingAudio, currentIndex, repeat } = accessStateRef.current;

        if (!loadedPlaylist || !playbackAudio) return;

        const status = await playbackAudio.getStatusAsync();
        if (status.positionMillis > 10000) {
            // Optionally reset playback position if needed
        } else {
            const playCurrentAudio = async () => {
                if (currentPlayingAudio) {
                    await playAudio(loadedPlaylist, currentPlayingAudio, currentIndex);
                }
            };

            const playPreviousInSequence = async () => {
                let prevIndex = currentIndex - 1;
                if (prevIndex < 0) {
                    prevIndex = loadedPlaylist.tracks.length - 1;
                }
                await playAudio(loadedPlaylist, loadedPlaylist.tracks[prevIndex], prevIndex);
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
                await playPreviousInSequence();
            }
        }
    }, [playAudio, shuffle, populateShuffledQueue]);

    return { playPreviousAudio };
};
