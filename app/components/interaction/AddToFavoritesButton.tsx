import React, { useEffect, useState, useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useFavorites } from '../../lib/utils/mediaControls/useFavorites.js';
import { PlayBackAudioContext } from '../../lib/control/audioPlayBackContext.js';
import { useTheme } from '../../lib/utils/SetTheme.js';
import HeartIcon from '../../assets/icons/HeartIcon.js';
import HeartCheckedIcon from '../../assets/icons/HeartCheckedIcon.js';

const AddToFavoritesButton = () => {
    const { currentTheme } = useTheme();
    const { isAudioInFavorites, toggleFavorite } = useFavorites();
    const { currentPlayingAudio } = useContext(PlayBackAudioContext);
    const [inFavourites, setInFavourites] = useState(false);

    useEffect(() => {
        setInFavourites(isAudioInFavorites());
    }, [isAudioInFavorites]);

    const handlePress = () => {
        toggleFavorite(currentPlayingAudio);
        setInFavourites(prevState => !prevState);
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            {inFavourites ? (
                <HeartCheckedIcon color={currentTheme.iconColor}/>
            ):(
                <HeartIcon color={currentTheme.iconColor} />
            )}
        </TouchableOpacity>
    );
};

export default AddToFavoritesButton;
