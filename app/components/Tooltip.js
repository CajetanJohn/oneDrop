import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Pressable, Animated } from 'react-native';
import { Tooltip } from 'react-native-elements';
import { useTheme } from '../lib/utils/SetTheme';

const options = [
  { title: 'Add', onPress: () => { console.log('added'); } },
  { title: 'Delete', onPress: () => { console.log('deleted'); } },
  { title: 'Share', onPress: () => { console.log('share'); } },
  { title: 'Details', onPress: () => { console.log('details'); } }
];

export const ToolTip = ({ isOpen = false, children }) => {
  const { currentTheme } = useTheme();
  const [isTooltipVisible, setIsTooltipVisible] = useState(isOpen);
  const [scaleAnim] = useState(new Animated.Value(0));

  const openTooltip = () => {
    setIsTooltipVisible(true);
    scaleAnim.setValue(0);
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeTooltip = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsTooltipVisible(false));
  };

  useEffect(() => {
    setIsTooltipVisible(isOpen);
  }, [isOpen]);

  return (
    <Tooltip
      popover={
        <Animated.View style={[styles.tooltipContent, { backgroundColor: 'red' }]}>
          {options.map((option, index) => (
            <Pressable key={index} onPress={option.onPress} style={styles.option}>
              <Text style={styles.optionText}>{option.title}</Text>
            </Pressable>
          ))}
        </Animated.View>
      }
      backgroundColor="transparent"
      height={150}
      width={200} // Adjust width based on content size
      withPointer={true} // Use the pointer to attach it to the trigger
      placement="bottom" // Adjust based on preference ('top', 'left', etc.)
      onOpen={() => openTooltip()}
      onClose={() => closeTooltip()}
      containerStyle={{}} // Remove absolute positioning
      overlayColor="transparent"
    >
      {children}
    </Tooltip>
  );
};

const styles = StyleSheet.create({
  tooltipContent: {
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 15,
    gap: 15,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ToolTip;
