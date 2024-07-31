// HistoryPage.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Support = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coming Soon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Light background color for better readability
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Dark text color for contrast
  },
});

export default Support;
