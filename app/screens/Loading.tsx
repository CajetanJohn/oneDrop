// LoadingScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Use a background color to match the theme if needed
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // Use a text color to match the theme if needed
  },
});

export default Loading;
