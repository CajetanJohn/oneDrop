import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const Splash = () => {
  const navigation = useNavigation(); // Hook to access the navigation object

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Homepage');
    }, 50);
    
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Splash</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Set a background color or use a theme
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Splash;
