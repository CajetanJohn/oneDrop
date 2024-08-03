import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingsNavigator from '../screens/(drawers)/settings/Settings';
import Monetization from '../screens/(drawers)/Monetization';
import Support from '../screens/(drawers)/Support';
import Profile from '../screens/(drawers)/Profile';
import Bookmarks from '../screens/(drawers)/Bookmarks';
import Premium from '../screens/(drawers)/Premium';
import TopTab from './TopNavigation';
import { useTheme } from '../utils/SetTheme';



import React, { useState, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, Easing, ScrollView, Pressable } from 'react-native';
import { AntDesign, MaterialIcons, Feather, SimpleLineIcons, MaterialCommunityIcons, Entypo, FontAwesome } from 'react-native-vector-icons';

const CustomDrawerContent = (props) => {
  const { currentTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownHeight = useRef(new Animated.Value(0)).current;
  const dropdownOpacity = useRef(new Animated.Value(0)).current;

  const handleNavigation = (screen) => {
    props.navigation.navigate(screen);
    props.navigation.closeDrawer();
  };

  const toggleDropdown = () => {
    const toValue = isDropdownOpen ? 0 : 100;
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
  }, [currentTheme]);

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.drawerBackgroundColor }]}>
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

      <ScrollView style={styles.scrollView}>
        <View style={[styles.divider, { backgroundColor: currentTheme.dividerColor }]} />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: currentTheme.buttonBackground }]}
          onPress={() => handleNavigation('Profile')}
        >
          <MaterialIcons name="person" size={20} color={currentTheme.buttonIconColor} />
          <Text style={[styles.buttonText, { color: currentTheme.buttonTextColor }]}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: currentTheme.buttonBackground }]}
          onPress={() => handleNavigation('Premium')}
        >
          <MaterialIcons name="workspace-premium" size={20} color={currentTheme.buttonIconColor} />
          <Text style={[styles.buttonText, { color: currentTheme.buttonTextColor }]}>Premium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: currentTheme.buttonBackground }]}
          onPress={() => handleNavigation('Bookmarks')}
        >
          <Feather name="bookmark" size={20} color={currentTheme.buttonIconColor} />
          <Text style={[styles.buttonText, { color: currentTheme.buttonTextColor }]}>Bookmark</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: currentTheme.buttonBackground }]}
          onPress={() => handleNavigation('History')}
        >
          <MaterialCommunityIcons name="history" size={20} color={currentTheme.buttonIconColor} />
          <Text style={[styles.buttonText, { color: currentTheme.buttonTextColor }]}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: currentTheme.buttonBackground }]}
          onPress={() => handleNavigation('Monetization')}
        >
          <MaterialIcons name="attach-money" size={20} color={currentTheme.buttonIconColor} />
          <Text style={[styles.buttonText, { color: currentTheme.buttonTextColor }]}>Monetization</Text>
        </TouchableOpacity>

        <View style={[styles.divider, { backgroundColor: currentTheme.dividerColor }]} />

        <Pressable style={styles.dropdownButton} onPress={toggleDropdown}>
          <View style={styles.dropdownButtonContent}>
            <Text style={[styles.buttonText, { color: currentTheme.textColor }]}>Settings & Support</Text>
            <SimpleLineIcons name={isDropdownOpen ? 'arrow-up' : 'arrow-down'} size={16} color={isDropdownOpen ? currentTheme.iconColor : currentTheme.specialIconColor} />
          </View>
        </Pressable>

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

      <View style={[styles.bottomButtonContainer, { backgroundColor: currentTheme.drawerFooterBackground }]}>
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
      { translateY: '-50%' },
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
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 10,
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
    paddingVertical: 8,
  },
  bottomButtonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});



const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { currentTheme } = useTheme();

  // Determine headerShown based on route name
  const getHeaderShown = (routeName) => {
    return routeName === "TopTab";
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route }) => ({
        headerShown: getHeaderShown(route.name),
        headerStyle: {
          backgroundColor: currentTheme.headerBackgroundColor,
        },
        headerTintColor: currentTheme.textColor,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: currentTheme.drawerBackgroundColor,
        },
        drawerInactiveTintColor: currentTheme.inactiveTextColor,
        drawerActiveTintColor: currentTheme.activeTextColor,
        drawerActiveBackgroundColor: currentTheme.drawerActiveBackgroundColor,
        // Bottom tab bar visibility
        tabBarStyle: {
          backgroundColor: currentTheme.tabBarBackground,
          borderTopWidth: 0,
        },
        tabBarShowLabel: route.name !== 'Splash',
        tabBarBackgroundColor: route.name === 'SongDetails' ? 'transparent' : currentTheme.tabBarBackground,
      })}
    >
      <Drawer.Screen
        name="TopTab"
        component={TopTab}
        options={{ drawerItemStyle: { display: 'none' } }} // Hide in drawer
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{ title: 'Settings' }}
      />
      <Drawer.Screen
        name="History"
        component={History}
        options={{ title: 'History' }}
      />
      <Drawer.Screen
        name="Monetization"
        component={Monetization}
        options={{ title: 'Monetization' }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ title: 'Profile' }}
      />
      <Drawer.Screen
        name="Support"
        component={Support}
        options={{ title: 'Support' }}
      />
      <Drawer.Screen
        name="Premium"
        component={Premium}
        options={{ title: 'Premium' }}
      />
      <Drawer.Screen
        name="Bookmarks"
        component={Bookmarks}
        options={{ title: 'Bookmarks' }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
