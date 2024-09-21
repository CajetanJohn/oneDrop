import { useCallback, useContext, useRef, useEffect } from "react";
import { PlayBackAudioContext } from "../../control/audioPlayBackContext";
import { usePlayAudio } from "./usePlayAudio";

export const usePlayPauseAudio = () => {
    const { accessState } = useContext(PlayBackAudioContext);
    const { playAudio } = usePlayAudio();

    // Create refs for frequently changing context values
    const playbackAudioRef = useRef(accessState.playbackAudio);
    const loadedPlaylistRef = useRef(accessState.loadedPlaylist);
    const shuffleRef = useRef(accessState.shuffle);
    const shuffledQueueRef = useRef(accessState.shuffledQueue);
    const isPlayingRef = useRef(accessState.isPlaying);
    const secondaryPlaylistRef = useRef(accessState.secondaryPlaylist)
    
    // Sync refs with context values on each render
    useEffect(() => {
        playbackAudioRef.current = accessState.playbackAudio;
        loadedPlaylistRef.current = accessState.loadedPlaylist;
        shuffleRef.current = accessState.shuffle;
        shuffledQueueRef.current = accessState.shuffledQueue;
        isPlayingRef.current = accessState.isPlaying;
        secondaryPlaylistRef.current = accessState.secondaryPlaylist;
    }, [
        accessState.playbackAudio,
        accessState.loadedPlaylist,
        accessState.shuffle,
        accessState.shuffledQueue,
        accessState.isPlaying,
        accessState.secondaryPlaylist,
    ]);

    const playPauseAudio = useCallback(async () => {
        const playbackAudio = playbackAudioRef.current;
        const loadedPlaylist = loadedPlaylistRef.current;
        const shuffle = shuffleRef.current;
        const shuffledQueue = shuffledQueueRef.current;
        const isPlaying = isPlayingRef.current;
        const secondaryPlaylist = secondaryPlaylistRef.current

        // Directly access the state-setting functions from accessState
        const { setIsPlaying, setError } = accessState;
     

        if (!playbackAudio) {
            const playTrackOnIndex = shuffle ? shuffledQueue.shift() : 0;
            await playAudio(secondaryPlaylist, secondaryPlaylist.tracks[playTrackOnIndex], playTrackOnIndex);
            return;
        }

        try {
            if (isPlaying) {
                await playbackAudio.pauseAsync();
                setIsPlaying(false);
            } else {
                await playbackAudio.playAsync();
                setIsPlaying(true);
            }
        } catch (error) {
            setError('Error handling pause/play:', error);
        }
    }, [playAudio, accessState]);

    return { playPauseAudio };
};
