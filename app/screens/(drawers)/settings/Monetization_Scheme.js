// SecurityAccess.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../../components/Header';
import { useTheme } from '../../../utils/SetTheme';

const Monetization_Scheme = ({ navigation }) => {
  const { currentTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.text, { color: currentTheme.textColor }]}>
        Monetization_Scheme
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  text: {
    fontSize: 16,
  },
});

export default Monetization_Scheme;
