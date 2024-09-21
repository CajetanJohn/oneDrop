import { useContext, useRef, useEffect } from 'react';
import { Audio } from 'expo-av';
import { PlayBackAudioContext } from '../../control/audioPlayBackContext';

export const usePlayAudio = () => {
    const { accessState } = useContext(PlayBackAudioContext);

    // Store context values in refs and sync them automatically on each render
    const playbackAudioRef = useRef(accessState.playbackAudio);
    const loadedPlaylistRef = useRef(accessState.loadedPlaylist);
    const currentIndexRef = useRef(accessState.currentIndex);

    useEffect(() => {
        playbackAudioRef.current = accessState.playbackAudio;
        loadedPlaylistRef.current = accessState.loadedPlaylist;
        currentIndexRef.current = accessState.currentIndex;
    }, [accessState.playbackAudio, accessState.loadedPlaylist, accessState.currentIndex]);

    const playAudio = async (playlist, audio, index) => {
        try {
            if (!loadedPlaylistRef.current || loadedPlaylistRef.current.id !== playlist.id) {
                accessState.setLoadedPlaylist(playlist);
            }

            if (playbackAudioRef.current) {
                await playbackAudioRef.current.unloadAsync();
            }

            const newPlaybackAudio = new Audio.Sound();
            await newPlaybackAudio.loadAsync({ uri: audio.uri }, { shouldPlay: true });

            accessState.setPlaybackAudio(newPlaybackAudio);
            accessState.setCurrentPlayingAudio(audio);
            accessState.setLastPlayedIndex(currentIndexRef.current || null);
            accessState.setCurrentIndex(index);
            accessState.setIsPlaying(true);
            accessState.setError(null);

        } catch (error) {
            console.error('Error handling audio playback:', error);
            accessState.setError('Error handling audio playback:', error);
        }
    };

    return { playAudio };
};
