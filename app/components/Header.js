// Header.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../utils/SetTheme';
const Header = ({ title, secondaryTitle, onBackPress }) => {
  const { currentTheme } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: currentTheme.background }]}>
      <TouchableOpacity onPress={onBackPress}>
        <Icon name="arrow-left" size={24} color={currentTheme.iconColor} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: currentTheme.textColor }]}>{title}</Text>
        {secondaryTitle && (
          <Text style={[styles.email, { color: currentTheme.textColor }]}>{secondaryTitle}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  titleContainer: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
  },
});

export default Header;
