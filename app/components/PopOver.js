import React, { forwardRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Popover from 'react-native-popover-view';
import { useTheme } from '../lib/utils/SetTheme';

// Forwarding ref to accept anchor prop as a ref object
const CustomPopover = forwardRef(({ options, isVisible, onClose }, ref) => {
  const { currentTheme } = useTheme();
  
  return (
    <Popover
      isVisible={isVisible}
      from={ref}
      onRequestClose={onClose}
      popoverStyle={[styles.popoverStyle, { backgroundColor: currentTheme.tertiaryBackground, borderColor: currentTheme.dividerColor }]}
      placement="auto"
      offset={-5}
      backgroundStyle={{ backgroundColor: 'transparent' }}
      arrowSize={{ width: 0, height: 0 }}
    >
      <View style={styles.content}>
        {options.map((option, index) => (
          <Pressable key={index} onPress={option.onPress} style={styles.option}>
            <Text style={[styles.optionText, { color: currentTheme.textColor, fontSize:currentTheme.smallFont }]}>
              {option.title}
            </Text>
          </Pressable>
        ))}
      </View>
    </Popover>
  );
});

const styles = StyleSheet.create({
  popoverStyle: {
    borderRadius: 10,
    paddingVertical: 15,
    paddingLeft: 20,
    paddingRight: 25,
    // Shadow styles for elevated impression
    shadowColor: '#000', // Black shadow color
    shadowOffset: { width: 0, height: 3 }, // Slight downward shadow
    shadowOpacity: 0.25, // Make the shadow slightly visible
    shadowRadius: 5, // Blur radius for soft shadow edges
    elevation: 5, // Required for Android shadow support
    borderWidth:1
  },
  content: {
    gap: 10,
  },
  optionText: {
    fontSize: 16,
    whiteSpace: 'nowrap', // Prevent text wrapping
  },
});

export default CustomPopover;
