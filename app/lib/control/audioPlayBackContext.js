// PlaybackContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAudioFiles } from '../utils/deviceAccess/getAudioFiles';
import playlistStore from '../store/playlistStore';
// Create the playback context
const PlayBackAudioContext = createContext();

const AudioProvider = (props) => {
    const [playbackAudio, setPlaybackAudio] = useState(null);
    const [currentPlayingAudio, setCurrentPlayingAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [shuffle, setShuffle] = useState(false);
    const [shuffledQueue, setShuffledQueue] = useState([]);
    const [repeat, setRepeat] = useState('off');
    const [fadeEnabled, setFadeEnabled] = useState(false);
    const [fadeDuration, setFadeDuration] = useState(3000);
    const [error, setError] = useState(null);
    const [lastPlayedIndex, setLastPlayedIndex] = useState(null);
    const [loadedPlaylist, setLoadedPlaylist] = useState(null);
    const [secondaryPlaylist, setSecondaryPlaylist] = useState(null);
    const [favourites, setFavourites] = useState(null);


    const setAudioTime = async (timeMillis) => {
        if (playbackAudio) {
            await playbackAudio.setPositionAsync(timeMillis);
        }
    };

    const accessState = {
        playbackAudio,
        currentPlayingAudio,
        isPlaying,
        currentIndex,
        shuffle,
        shuffledQueue,
        repeat,
        fadeEnabled,
        fadeDuration,
        error,
        lastPlayedIndex,
        loadedPlaylist,
        secondaryPlaylist,
        favourites,
        setPlaybackAudio,
        setCurrentPlayingAudio,
        setIsPlaying,
        setCurrentIndex,
        setShuffle,
        setShuffledQueue,
        setRepeat,
        setFadeEnabled,
        setFadeDuration,
        setError,
        setLastPlayedIndex,
        setLoadedPlaylist,
        setSecondaryPlaylist,
        setFavourites,
        setAudioTime,
    };

    return (
        <PlayBackAudioContext.Provider value={{ accessState }}>
            {props.children}
        </PlayBackAudioContext.Provider>
    );
};

// Custom hook to use playback context
const usePlayBack = () => {
    const context = useContext(PlayBackAudioContext);

    if (!context) {
        throw new Error('usePlayBack must be used within an AudioProvider');
    }

    return context.accessState;
};

export default AudioProvider;
export { PlayBackAudioContext, usePlayBack };
