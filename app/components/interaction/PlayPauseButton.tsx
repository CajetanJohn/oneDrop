import React, { useMemo, useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { PlayBackAudioContext } from '../../lib/control/audioPlayBackContext';
import { usePlayPauseAudio } from '../../lib/utils/mediaControls/usePlayPauseAudio';


const PlayPauseButton = () => {
    const {playPauseAudio} = usePlayPauseAudio();
    const { accessState} = useContext(PlayBackAudioContext);
    const { isPlaying } = accessState;

    const handlePlayPause = () => {
        playPauseAudio();
    };

    return useMemo(() => (
        <TouchableOpacity onPress={handlePlayPause}>
            <FontAwesome name={isPlaying ? "pause" : "play"} size={24} color="black" />
        </TouchableOpacity>
    ), [isPlaying, playPauseAudio]);
};

export default PlayPauseButton;
