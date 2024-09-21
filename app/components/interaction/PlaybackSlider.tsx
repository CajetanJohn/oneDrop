import React, { useMemo, useContext, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { PlayBackAudioContext } from '../../lib/control/audioPlayBackContext';

const PlaybackSlider = () => {
    const { accessState } = useContext(PlayBackAudioContext);
    const { playbackAudio } = accessState;
    const [currentPosition, setCurrentPosition] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (playbackAudio) {
            const updatePosition = async () => {
                const status = await playbackAudio.getStatusAsync();
                setCurrentPosition(status.positionMillis);
                setDuration(status.durationMillis);
            };

            const interval = setInterval(updatePosition, 1000);

            return () => clearInterval(interval);
        }
    }, [playbackAudio]);

    const handleValueChange = (value) => {
        setCurrentPosition(value);
    };

    const handleSlidingComplete = (value) => {
        //setAudioTime(value);
    };

    return useMemo(() => (
        <View>
            <Slider
                value={currentPosition}
                minimumValue={0}
                maximumValue={duration}
                onValueChange={handleValueChange}
                onSlidingComplete={handleSlidingComplete}
                style={{ width: 200 }}
            />
            <Text>{Math.floor(currentPosition / 1000)} / {Math.floor(duration / 1000)}</Text>
        </View>
    ), [currentPosition, duration, handleValueChange, handleSlidingComplete, setAudioTime]);
};

export default PlaybackSlider;
