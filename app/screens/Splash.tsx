import React from 'react';
import { View, StyleSheet } from 'react-native';
import AnimatedPressable from '../components/AnimatedPressable';
import { useTheme } from '../lib/utils/SetTheme';

import AddIcon from '../assets/icons/AddIcon';
import CheckIcon from '../assets/icons/CheckIcon';
import CloseIcon from '../assets/icons/CloseIcon';
import HeartIcon from '../assets/icons/HeartIcon';
import LeftArrowIcon from '../assets/icons/LeftArrowIcon';
import MusicNoteIcon from '../assets/icons/MusicNoteIcon';
import RightArrowIcon from '../assets/icons/RightArrowIcon';
import SearchIcon from '../assets/icons/SearchIcon';
import ShareIcon from '../assets/icons/ShareIcon';
import SortIcon from '../assets/icons/SortIcon';
import TrashIcon from '../assets/icons/TrashIcon';
import ShuffleIcon from '../assets/icons/ShuffleIcon';
import HeartCheckedIcon from '../assets/icons/HeartCheckedIcon';

const Splash = () => {
  const handlePress = () => {
    console.log("Splash pressed!");
    // You can add navigation or other functionality here
  };

  // Define the theme object with iconColor
  const {currentTheme} = useTheme()

  // Create an array of all icons for easy rendering
  const icons = [
    AddIcon,
    CheckIcon,
    CloseIcon,
    HeartIcon,
    LeftArrowIcon,
    MusicNoteIcon,
    RightArrowIcon,
    SearchIcon,
    ShareIcon,
    ShuffleIcon,
    SortIcon,
    TrashIcon,
    HeartCheckedIcon
  ];

  return (
    <View style={styles.splashContainer}>
      {/* Row Container for Icons */}
      <View style={styles.iconRow}>
        {icons.map((IconComponent, index) => (
          <IconComponent
            key={index}
            color={currentTheme.iconColor}
            style={styles.icon} // Add spacing between icons if necessary
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333', // Set background color for contrast
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 5, // Spacing between icons
  },
});

export default Splash;
