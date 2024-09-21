import React, { useMemo, useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { usePlayPreviousAudio } from '../../lib/utils/mediaControls/usePlayPreviousAudio';


const PreviousButton = () => {
    const {playPreviousAudio}  = usePlayPreviousAudio();

    const handlePrevious = () => {
        playPreviousAudio();
    };

    return useMemo(() => (
        <TouchableOpacity onPress={handlePrevious}>
            <Foundation name="previous" size={24} color="black" />
        </TouchableOpacity>
    ), [playPreviousAudio]);
};

export default PreviousButton;
