import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './Stacks';
import Settings from '../screens/(drawers)/Settings';
import Monetization from '../screens/(drawers)/Monetization';



import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, Easing, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownHeight = useRef(new Animated.Value(0)).current;
  const dropdownOpacity = useRef(new Animated.Value(0)).current;

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
    props.navigation.closeDrawer();
  };

  const toggleDropdown = () => {
    const toValue = isDropdownOpen ? 0 : 100; // Height of the dropdown content
    const toOpacity = isDropdownOpen ? 0 : 1;
    
    Animated.timing(dropdownHeight, {
      toValue,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
    
    Animated.timing(dropdownOpacity, {
      toValue: toOpacity,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
    
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://example.com/your-image-url.jpg' }} // Replace with your image URL
            style={styles.image}
          />
        </View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollView}>
        {/* Divider */}
        <View style={styles.divider} />

        {/* Navigation Buttons */}
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Settings')}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Monetization')}>
          <Text style={styles.buttonText}>Monetization</Text>
        </TouchableOpacity>

        {/* Bottom Divider */}
        <View style={styles.divider} />

        {/* Dropdown Button */}
        <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
          <Text style={styles.buttonText}>More Options</Text>
        </TouchableOpacity>

        {/* Animated Dropdown Content */}
        <Animated.View style={[styles.dropdownContent, { height: dropdownHeight, opacity: dropdownOpacity }]}>
          <TouchableOpacity style={styles.dropdownItem} onPress={() => handleNavigation('Option1')}>
            <Text style={styles.buttonText}>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem} onPress={() => handleNavigation('Option2')}>
            <Text style={styles.buttonText}>Option 2</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      {/* Another Button Fixed at the Bottom */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('AnotherButton')}>
          <Text style={styles.buttonText}>Another Button</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    paddingTop: 50, // Adjust this value to fit your design
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Optional: background color for profile section
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#888',
    marginVertical: 10,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  button: {
    paddingVertical: 15,
  },
  buttonText: {
    fontSize: 16,
  },
  dropdownButton: {
    paddingVertical: 15,
  },
  dropdownContent: {
    overflow: 'hidden',
    paddingVertical: 10,
  },
  dropdownItem: {
    paddingVertical: 10,
  },
  bottomButtonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});






const Drawer = createDrawerNavigator();
const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Main" component={StackNavigator} options={{ drawerItemStyle: { display: 'none' } }} />
    <Drawer.Screen name="Settings" component={Settings} />
    <Drawer.Screen name="Monetization" component={Monetization} />
  </Drawer.Navigator>
);

export default DrawerNavigator;