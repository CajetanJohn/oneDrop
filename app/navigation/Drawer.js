import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './Stacks';
import Settings from '../screens/(drawers)/Settings';
import Monetization from '../screens/(drawers)/Monetization';
import Support from '../screens/(drawers)/Support';
import Profile from '../screens/(drawers)/Profile';
import Bookmarks from '../screens/(drawers)/Bookmarks'

import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, Easing, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons, Feather, SimpleLineIcons } from 'react-native-vector-icons';
import { useTheme } from '../utils/SetTheme';



const CustomDrawerContent = (props) => {
  const { currentTheme } = useTheme(); // Use the current theme from context
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
        <Text style={[styles.name, { color: currentTheme.color }]}>John Doe</Text>
        <Text style={[styles.email, { color: currentTheme.color }]}>john.doe@example.com</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollView}>
        {/* Divider */}
        <View style={styles.divider} />

        {/* Navigation Buttons */}
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Profile')}>
          <MaterialIcons name="attach-money" size={20} color={currentTheme.iconColor} style={styles.icon} />
          <Text style={[styles.buttonText, { color: currentTheme.color }]}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Premium')}>
          <AntDesign name="setting" size={20} color={currentTheme.iconColor} style={styles.icon} />
          <Text style={[styles.buttonText, { color: currentTheme.color }]}>Premium</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Bookmarks')}>
          <AntDesign name="setting" size={20} color={currentTheme.iconColor} style={styles.icon} />
          <Text style={[styles.buttonText, { color: currentTheme.color }]}>Bookmarks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Monetization')}>
          <MaterialIcons name="attach-money" size={20} color={currentTheme.iconColor} style={styles.icon} />
          <Text style={[styles.buttonText, { color: currentTheme.color }]}>Monetization</Text>
        </TouchableOpacity>
        

        {/* Bottom Divider */}
        <View style={styles.divider} />

        {/* Dropdown Button */}
        <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
          <View style={styles.dropdownButtonContent}>
            <Text style={[styles.buttonText, { color: currentTheme.color }]}>Settings & Support</Text>
            <SimpleLineIcons name={isDropdownOpen ? 'arrow-up' : 'arrow-down'} size={16} color={currentTheme.iconColor} style={styles.icon} />
          </View>
        </TouchableOpacity>

        {/* Animated Dropdown Content */}
        <Animated.View style={[styles.dropdownContent, { height: dropdownHeight, opacity: dropdownOpacity }]}>
          <TouchableOpacity style={styles.dropdownItem} onPress={() => handleNavigation('Settings')}>
            <AntDesign name="setting" size={20} color={currentTheme.iconColor} style={styles.icon} />
            <Text style={[styles.buttonText, { color: currentTheme.color }]}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem} onPress={() => handleNavigation('Support')}>
            <Feather name="help-circle" size={20} color={currentTheme.iconColor} style={styles.icon} />
            <Text style={[styles.buttonText, { color: currentTheme.color }]}>Help Centre</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      {/* Another Button Fixed at the Bottom */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('AnotherButton')}>
          <Text style={[styles.buttonText, { color: currentTheme.color }]}>Another Button</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    // Add any additional styling for icons here
  },
  dropdownButton: {
    paddingVertical: 15,
  },
  dropdownButtonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownContent: {
    overflow: 'hidden',
    paddingVertical: 10,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
    <Drawer.Screen name="Profile" component={Profile} />
    <Drawer.Screen name="Support" component={Support} />
    <Drawer.Screen name="Premium" component={Premium} />
    <Drawer.Screen name="Bookmarks" component={Bookmarks}/>


  </Drawer.Navigator>
);

export default DrawerNavigator;