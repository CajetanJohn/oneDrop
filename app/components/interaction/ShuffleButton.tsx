import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useShuffleMode } from '../../lib/utils/mediaControls/useShuffleMode';

const ShuffleButton = () => {
    const { shuffle, toggleShuffle } = useShuffleMode();

    // Function to handle shuffle toggle
    const handleShuffleToggle = () => {
        toggleShuffle();
    };

    // Use useMemo to memoize the button
    return useMemo(() => (
        <TouchableOpacity onPress={handleShuffleToggle}>
            <MaterialCommunityIcons 
                name={shuffle ? "shuffle" : "shuffle-disabled"} 
                size={24} 
                color="black" 
            />
        </TouchableOpacity>
    ), [shuffle]); // Only depend on `shuffle`
};

export default ShuffleButton;
