import { useContext, useCallback, useRef, useEffect } from 'react';
import { PlayBackAudioContext } from '../../control/audioPlayBackContext';

export const useShuffleMode = () => {
    const { accessState } = useContext(PlayBackAudioContext);
    const { shuffle, setShuffle, setShuffledQueue } = accessState;

    // Create refs to store the latest state
    const shuffleRef = useRef(shuffle);

    // Sync refs with the latest values on each render
    useEffect(() => {
        shuffleRef.current = shuffle;
    }, [shuffle]);

    // Function to toggle shuffle mode
    const toggleShuffle = useCallback(() => {
        setShuffle(prevShuffle => {
            const newShuffle = !prevShuffle;
            shuffleRef.current = newShuffle;

            if (!newShuffle) {
                // Clear the shuffled queue when shuffle is turned off
                setShuffledQueue([]);
            }

            return newShuffle;
        });
    }, [setShuffle, setShuffledQueue]);

    return {
        shuffle: shuffleRef.current,
        toggleShuffle
    };
};
