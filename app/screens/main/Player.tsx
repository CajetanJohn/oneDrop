import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AudioControls from '../../components/interaction/AudioControls';




const Player = () => {
  return (
    <View style={styles.container}>
      {/* Top Controls */}
      <View style={styles.topControls}>
        {/*<PlayPauseButton/>
        <NextButton/>
        <PreviousButton/>
        <ShuffleButton/>
        <RepeatButton/>
        <FadeSlider/>*/}
        
        <Icon name="chevron-down" size={24} color="white" />
        <View style={styles.topRightControls}>
          <Icon name="volume-high" size={24} color="white" />
          <Icon name="dots-vertical" size={24} color="white" style={styles.marginLeft} />
        </View>
      </View>

      {/* Album Art */}
      <View style={styles.albumArtContainer}>
        <Icon name="music" size={150} color="grey" />
      </View>

      {/* Song Info */}
      <View style={styles.songInfoContainer}>
        <Text style={styles.songTitle} numberOfLines={1}>NEW MIX</Text>
        <Text style={styles.artist} numberOfLines={1}>Dj Rankx</Text>
        <Text style={styles.album} numberOfLines={1}>Unknown</Text>
      </View>

      {/* Progress Slider */}
      <View style={styles.sliderContainer}>
        <AudioSlider/>
      </View>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <AudioControls/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topRightControls: {
    flexDirection: 'row',
  },
  marginLeft: {
    marginLeft: 20,
  },
  albumArtContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  songInfoContainer: {
    alignItems: 'center',
  },
  songTitle: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
  },
  artist: {
    fontSize: 18,
    color: 'grey',
    textAlign: 'center',
  },
  album: {
    fontSize: 14,
    color: 'grey',
    textAlign: 'center',
  },
  sliderContainer: {
    marginVertical: 20,
  },
  slider: {
    width: '100%',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: 'white',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default Player;
