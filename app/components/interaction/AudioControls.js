import React, { useMemo } from 'react';
import { View } from 'react-native';
import PreviousButton from './PreviousButton';
import PlayPauseButton from './PlayPauseButton';
import NextButton from './NextButton';
import ShuffleButton from './ShuffleButton';
import RepeatButton from './RepeatButton';
import AddToFavoritesButton from './AddToFavoritesButton';

const AudioControls = () => {
    return useMemo(() => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
            <PreviousButton />
            <PlayPauseButton />
            <NextButton />
            <ShuffleButton />
            <RepeatButton />
            <AddToFavoritesButton />
        </View>
    ), []);
};

export default AudioControls;
