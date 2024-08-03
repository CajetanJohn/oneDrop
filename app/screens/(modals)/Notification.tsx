// NotificationModal.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../utils/SetTheme';

const NotificationModal = () => {
  const { currentTheme } = useTheme();

  return (
    <View style={[styles.modalContainer, { backgroundColor: currentTheme.notificationBackground }]}>
      <Text style={[styles.modalText, { color: currentTheme.notificationText }]}>
        Notification
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    alignItems: 'center',
    zIndex: 1000, // Ensure it's on top
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NotificationModal;
