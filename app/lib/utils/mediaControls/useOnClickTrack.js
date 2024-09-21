import { useContext, useRef, useEffect } from 'react';
import { PlayBackAudioContext } from '../../control/audioPlayBackContext';
import { usePlayPauseAudio } from './usePlayPauseAudio';
import { usePlayAudio } from './usePlayAudio';

export const useOnClickTrack = () => {
    const { accessState } = useContext(PlayBackAudioContext);

    // Store context values in refs
    const currentPlayingAudioRef = useRef(accessState.currentPlayingAudio);
    const playbackAudioRef = useRef(accessState.playbackAudio);

    // Sync refs with context values on each render
    useEffect(() => {
        currentPlayingAudioRef.current = accessState.currentPlayingAudio;
        playbackAudioRef.current = accessState.playbackAudio;
    }, [accessState.currentPlayingAudio, accessState.playbackAudio]);

    const { playPauseAudio } = usePlayPauseAudio();
    const { playAudio } = usePlayAudio();

    const onClickTrack = async (playlist, audio, index) => {
        const currentPlayingAudio = currentPlayingAudioRef.current;
        const playbackAudio = playbackAudioRef.current;

        if (!playbackAudio) {
            await playAudio(playlist, audio, index);
            return;
        }

        if (currentPlayingAudio?.uri === audio.uri) {
            await playPauseAudio();
        } else {
            await playAudio(playlist, audio, index);
        }
    };

    return { onClickTrack };
};
