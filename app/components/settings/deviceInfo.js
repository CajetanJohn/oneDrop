import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { AntDesign } from 'react-native-vector-icons';


const DeviceInformation = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const animatedRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: isOpen ? 150 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(animatedRotation, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const rotateInterpolate = animatedRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        <Animated.View style={{ transform: [{ rotateZ: rotateInterpolate }] }}>
          <AntDesign name="down" size={24} color="black" />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View style={[styles.content, { height: animatedHeight }]}>
        <Text>{content}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f1f1f1',
  },
  headerText: {
    fontSize: 16,
  },
  content: {
    overflow: 'hidden',
    padding: 10,
  },
});

export default DeviceInformation;
