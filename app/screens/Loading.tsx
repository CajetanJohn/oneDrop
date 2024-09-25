// SplashScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';

const SplashScreen = observer(() => {
  return null
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default SplashScreen;
