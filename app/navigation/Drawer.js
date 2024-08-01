import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './Stacks';
import SettingsNavigator from '../screens/(drawers)/settings/Settings';
import Monetization from '../screens/(drawers)/Monetization';
import Support from '../screens/(drawers)/Support';
import Profile from '../screens/(drawers)/Profile';
import Bookmarks from '../screens/(drawers)/Bookmarks';
import Premium from '../screens/(drawers)/Premium';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, Easing, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons, Feather, SimpleLineIcons, MaterialCommunityIcons, Entypo, FontAwesome } from 'react-native-vector-icons';
import { useTheme, theme } from '../utils/SetTheme'; // Adjust the path if necessary

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

  const renderThemeIcon = useCallback(() => {
    switch (currentTheme.name) {
      case 'light':
        return <Entypo name="light-up" size={24} color={currentTheme.iconColor} />;
      case 'dark':
        return <MaterialIcons name="dark-mode" size={24} color={currentTheme.iconColor} />;
      case 'custom':
        return <AntDesign name="customerservice" size={24} color={currentTheme.iconColor} />;
      case 'system':
      default:
        return <FontAwesome name="assistive-listening-systems" size={24} color={currentTheme.iconColor} />;
    }
  }, [currentTheme, theme]);

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <View style={styles.profileSection}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://example.com/your-image-url.jpg' }} // Replace with your image URL
            style={styles.image}
          />
        </View>
        <Text style={[styles.name, { color: currentTheme.color }]}>John Doe</Text>
        <Text style={[styles.email, { color: currentTheme.color }]}>john.doe@example.com</Text>
        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.navigate('Modal')}>
          <MaterialCommunityIcons name="dots-vertical-circle-outline" size={24} color={currentTheme.iconColor} />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollView}>
        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: currentTheme.dividerColor }]} />

        {/* Navigation Buttons */}
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Profile')}>
          <MaterialIcons name="person" size={20} color={currentTheme.iconColor} />
          <Text style={[styles.buttonText, { color: currentTheme.textColor }]}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Premium')}>
          <MaterialIcons name="workspace-premium" size={20} color={currentTheme.iconColor} />
          <Text style={[styles.buttonText, { color: currentTheme.textColor }]}>Premium</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Bookmarks')}>
          <Feather name="bookmark" size={20} color={currentTheme.iconColor} />
          <Text style={[styles.buttonText, { color: currentTheme.textColor }]}>Bookmark</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Monetization')}>
          <MaterialIcons name="attach-money" size={20} color={currentTheme.iconColor} />
          <Text style={[styles.buttonText, { color: currentTheme.textColor }]}>Monetization</Text>
        </TouchableOpacity>
        
        {/* Bottom Divider */}
        <View style={[styles.divider, { backgroundColor: currentTheme.dividerColor }]} />

        {/* Dropdown Button */}
        <Pressable style={styles.dropdownButton} onPress={toggleDropdown}>
          <View style={styles.dropdownButtonContent}>
            <Text style={[styles.buttonText, { color: currentTheme.textColor }]}>Settings & Support</Text>
            <SimpleLineIcons name={isDropdownOpen ? 'arrow-up' : 'arrow-down'} size={16} color={isDropdownOpen ? currentTheme.iconColor : currentTheme.specialIconColor} />
          </View>
        </Pressable>

        {/* Animated Dropdown Content */}
        <Animated.View style={[styles.dropdownContent, { height: dropdownHeight, opacity: dropdownOpacity }]}>
          <TouchableOpacity style={styles.dropdownItem} onPress={() => handleNavigation('Settings')}>
            <AntDesign name="setting" size={16} color={currentTheme.iconColor} />
            <Text style={[styles.buttonText, { color: currentTheme.textColor }]}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem} onPress={() => handleNavigation('Support')}>
            <Feather name="help-circle" size={16} color={currentTheme.iconColor} />
            <Text style={[styles.buttonText, { color: currentTheme.textColor }]}>Help Centre</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      {/* Another Button Fixed at the Bottom */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('AnotherButton')}>
          {renderThemeIcon()}
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
    paddingTop: 10,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    position: 'relative',
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
  headerIcon: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [
      { translateY: '-50%' }, // Offset by half of its height
    ],
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  divider: {
    height: 1,
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
    paddingVertical: 8, // Smaller padding for dropdown items
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
    <Drawer.Screen name="Settings" component={SettingsNavigator} options={{ headerShown: false }}/>
    <Drawer.Screen name="Monetization" component={Monetization} options={{ headerShown: false }}/>
    <Drawer.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
    <Drawer.Screen name="Support" component={Support} options={{ headerShown: false }}/>
    <Drawer.Screen name="Premium" component={Premium} options={{ headerShown: false }}/>
    <Drawer.Screen name="Bookmarks" component={Bookmarks} />


  </Drawer.Navigator>
);

export default DrawerNavigator;