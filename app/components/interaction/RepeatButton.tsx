import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRepeatMode } from '../../lib/utils/mediaControls/useRepeatMode';

const RepeatButton = () => {
    const { repeat, setRepeatMode } = useRepeatMode();

    const handleRepeatToggle = () => {
        const newRepeatMode = repeat === 'off' ? 'all' : repeat === 'all' ? 'one' : 'off';
        setRepeatMode(newRepeatMode);
    };

    return useMemo(() => (
        <TouchableOpacity onPress={handleRepeatToggle}>
            <MaterialCommunityIcons 
                name={repeat === 'off' ? "repeat-off" : repeat === 'all' ? "repeat" : "repeat-once"} 
                size={24} 
                color="black" 
            />
        </TouchableOpacity>
    ), [repeat, handleRepeatToggle]);
};

export default RepeatButton;
