import React, { useRef, useState, forwardRef } from 'react';
import { View, StyleSheet, Pressable, Animated } from 'react-native';
import { useTheme } from '../lib/utils/SetTheme';

// Forwarding ref to the component
const AnimatedPressable = forwardRef(({ onPress, children }, ref) => {
  const animation = useRef(new Animated.Value(0)).current;
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { currentTheme } = useTheme();

  // Function to handle press event
  const handlePressIn = () => {
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    onPress();
    Animated.timing(animation, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  // Calculate overlay animation values
  const overlayOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.7], // Fully transparent to 50% opaque
  });

  const overlayScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1.5], // Scale effect from center
  });

  // Handler to capture the children dimensions
  const handleLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    if (width !== dimensions.width || height !== dimensions.height) {
      setDimensions({ width, height });
    }
  };

  return (
    <Pressable
      ref={ref} // Forward the ref to Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLayout={handleLayout}
      style={[
        styles.pressable,
        {
          width: dimensions.width || 'auto',
          height: dimensions.height || 'auto',
          borderRadius: Math.max(dimensions.width, dimensions.height) / 2, // Make it a perfect circle based on child size
        },
      ]}
    >
      <Animated.View
        style={[
          styles.overlay,
          {
            width: dimensions.width,
            height: dimensions.height,
            opacity: overlayOpacity,
            transform: [{ scale: overlayScale }],
            borderRadius: Math.max(dimensions.width, dimensions.height) / 2,
          },
        ]}
      />
      {children}
    </Pressable>
  );
});

// Set display name for debugging
AnimatedPressable.displayName = 'AnimatedPressable';

const styles = StyleSheet.create({
  pressable: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Whitish overlay
    padding: 3,
  },
});

export default AnimatedPressable;
