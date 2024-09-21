import React, { useState, useRef, forwardRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Popover from 'react-native-popover-view';
import { useTheme } from '../lib/utils/SetTheme';

const { width } = Dimensions.get('window');

const CustomArrow = ({ text }) => (
  <View style={styles.customArrowContainer}>
    <View style={styles.customArrow}>
      <Text style={styles.arrowText}>{text}</Text>
    </View>
  </View>
);


const PopOver = forwardRef(({ options = [], isVisible, onClose }, ref) => {
  const { currentTheme } = useTheme();

  // State to manage the props internally
  const [popoverOptions, setPopoverOptions] = useState(options);
  const [popoverVisible, setPopoverVisible] = useState(isVisible);
  const [forwardedRef, setForwardedRef] = useState(ref);

  // Update the state when the options prop changes
  useEffect(() => {
    if (options) {
      setPopoverOptions(options);
    }
  }, [options]);

  // Update the state when the isVisible prop changes
  useEffect(() => {
    if (typeof isVisible !== 'undefined') {
      setPopoverVisible(isVisible);
    }
  }, [isVisible]);

  // Update the forwarded ref when ref changes
  useEffect(() => {
    if (ref) {
      setForwardedRef(ref);
    }
  }, [ref]);

  // If no options provided, return null
  if (!popoverOptions.length) {
    return null;
  }

  return (
    <Popover
      isVisible={popoverVisible}
      from={forwardedRef}
      onRequestClose={onClose}
      placement="auto"
      popoverStyle={[styles.popoverStyle, { backgroundColor: 'transparent' }]}
      overlayStyle={styles.overlay}
      overlayOpacity={0}
    >
      <View style={[styles.popoverContent, { backgroundColor: currentTheme.secondaryBackground }]}>
        {popoverOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => {
              option.onPress(option.props);
              onClose();
            }}
          >
            <Text style={styles.optionText}>{option.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <CustomArrow text="Arrow" />
    </Popover>
  );
});

const styles = StyleSheet.create({
  popoverStyle: {
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    flex: 1,
    marginTop:-30
  },
  overlay: {
    backgroundColor: 'transparent',
  },
  popoverContent: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 15,
    zIndex: 1005,
  },
  customArrowContainer: {
    position: 'absolute',
    bottom: '100%',
    left: width / 2 - 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 20,
  },
  customArrow: {
    backgroundColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '45deg' }],
  },
  arrowText: {
    color: 'white',
    fontSize: 12,
  },
  option: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    color: 'black',
  },
});

export default PopOver;
