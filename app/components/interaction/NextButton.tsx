import React, { useMemo, useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { usePlayNextAudio } from '../../lib/utils/mediaControls/usePlayNextAudio';


const NextButton = () => {
    const {playNextAudio} = usePlayNextAudio()

    const handleNext = () => {
        playNextAudio();
    };

    return useMemo(() => (
        <TouchableOpacity onPress={handleNext}>
            <Foundation name="next" size={24} color="black" />
        </TouchableOpacity>
    ), [playNextAudio]);
};

export default NextButton;
