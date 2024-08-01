// VolumeControl.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// You can also import other icon sets if needed
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const VolumeControl = ({ volume, audioOutput }) => {
  const renderIcon = () => {
    switch (audioOutput) {
      case 'earphones':
        return <Icon name="headphones" size={30} />;
      case 'speaker':
        return <Icon name="volume-up" size={30} />;
      case 'bluetooth':
        return <Icon name="bluetooth" size={30} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Volume:</Text>
      <View style={styles.volumeBarContainer}>
        <View style={[styles.volumeBar, { width: `${volume}%` }]} />
      </View>
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  volumeBarContainer: {
    height: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  volumeBar: {
    height: '100%',
    backgroundColor: 'gray',
  },
  iconContainer: {
    alignItems: 'center',
  },
});

export default VolumeControl;
