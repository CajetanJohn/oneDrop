import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Switch, TextInput, Pressable, StyleSheet } from 'react-native';
import selectionControl from '../../lib/control/SelectionControl';

import { useTheme } from '../../lib/utils/SetTheme';
import { TrackList } from '../../screens/main/DeviceAudio';

// Placeholder components
const PlaylistOptions = ({ toggleView }) => (
  <View>
    <Text>Playlist Options Component</Text>
    <TouchableOpacity onPress={toggleView}>
      <Text>Go to Select Audios</Text>
    </TouchableOpacity>
  </View>
);




const styles= StyleSheet.create({
  buttonContainer: {
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
},
defaultContainer: {
    padding: 0,
},

})
