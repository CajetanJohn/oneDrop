// EventPage.tsx
import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Animated, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Make sure you install expo-vector-icons or use another icon library

const { height: screenHeight } = Dimensions.get('window');

const FloatingButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  const [isVisible, setIsVisible] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;

  Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const scale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.5],
    extrapolate: 'clamp'
  });

  const bottom = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [20, -100],
    extrapolate: 'clamp'
  });

  return (
    <Animated.View style={[styles.floatingButton, { transform: [{ scale }], bottom }]}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const Events: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [events, setEvents] = useState<string[]>(['Event 1', 'Event 2', 'Event 3']); // Sample events
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleFloatingButtonPress = () => {
    navigation.navigate('NewPage', { data: 'Some data' });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { top: scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [0, -60],
        extrapolate: 'clamp'
      }) }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={handleBackPress}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Events</Text>
          <TextInput style={styles.searchInput} placeholder="Search..." />
        </View>
      </Animated.View>

      <ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContainer}
      >
        <FlatList
          data={events}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.eventItem}>
              <Text>{item}</Text>
            </View>
          )}
        />
      </ScrollView>

      <FloatingButton onPress={handleFloatingButtonPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    elevation: 4,
    zIndex: 1,
    paddingHorizontal: 16,
    top: 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    width: 150,
  },
  scrollContainer: {
    paddingTop: 60, // To make space for the fixed header
  },
  eventItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default Events;
