// SecurityAccess.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../../components/Header';
import { useTheme } from '../../../utils/SetTheme';

const Notification = ({ navigation }) => {
  const { currentTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.text, { color: currentTheme.textColor }]}>
          Set up security options and account access.
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

export default Notification;
