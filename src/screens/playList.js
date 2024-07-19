// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const PlayList = ({ navigation }) => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Go to Protected Screen"
        onPress={() => navigation.navigate('Protected')}
      />
    </View>
  );
};

export default PlayList;
