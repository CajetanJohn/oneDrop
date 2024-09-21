import { useContext, useCallback } from 'react';
import { PlayBackAudioContext } from '../../control/audioPlayBackContext';

export const useRepeatMode = () => {
    const { accessState } = useContext(PlayBackAudioContext);
    const { repeat, setRepeat } = accessState;

    const setRepeatMode = useCallback((newRepeatMode) => {
        setRepeat(newRepeatMode);
    }, [setRepeat]);

    return {
        repeat,
        setRepeatMode,
    };
};
