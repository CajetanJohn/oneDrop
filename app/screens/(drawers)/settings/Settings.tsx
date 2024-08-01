// SettingsNavigator.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Pressable, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../../../utils/SetTheme';
import { DrawerActions } from '@react-navigation/drawer'; // Import DrawerActions

import SecurityAccess from './Security_AccountAccess';
import Privacy_Safety from './Privacy_Safety';
import Additional_Settings from './Additional';
import Accessibility_Display_Languages from './Accessibility_Display_languages';
import Notifications from './Notification';
import Profile from '../Profile';
import Monetization from '../Monetization';
import Premium from '../Premium';

const settingsData = [
  { name: 'Your Account', description: 'Manage your account details', icon: 'user' },
  { name: 'Security and Account Access', description: 'Set up security options and account access', icon: 'lock' },
  { name: 'Monetization', description: 'Manage your monetization settings', icon: 'dollar' },
  { name: 'Privacy and Safety', description: 'Control privacy and safety settings', icon: 'shield' },
  { name: 'Notifications', description: 'Manage notification preferences', icon: 'bell' },
  { name: 'Accessibility', description: 'Set accessibility options', icon: 'universal-access' },
  { name: 'Additional Resources', description: 'Find additional resources and support', icon: 'info-circle' },
];

const Settings = ({ navigation }) => {
  const { currentTheme } = useTheme();

  const renderItem = ({ item }) => (
    <Pressable
      style={[styles.itemContainer, { backgroundColor: currentTheme.background }]}
      onPress={() => navigation.navigate(item.name.replace(/\s+/g, ''), { title: item.name })}
    >
      <Icon name={item.icon} size={30} color={currentTheme.iconColor} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={[styles.pageName, { color: currentTheme.textColor }]}>{item.name}</Text>
        <Text style={[styles.description, { color: currentTheme.textColor }]}>{item.description}</Text>
      </View>
    </Pressable>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <TextInput 
        style={[styles.searchInput, { borderColor: currentTheme.borderColor }]} 
        placeholder="Search settings..." 
        placeholderTextColor={currentTheme.textColor}
      />
      <FlatList
        data={settingsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.listContainer}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  pageName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

const Stack = createStackNavigator();

const SettingsNavigator = ({ navigation }) => {
  const { currentTheme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => ({
        headerTitle: route.params?.title || 'Settings',
        headerStyle: {
          backgroundColor: currentTheme.background,
        },
        headerTintColor: currentTheme.iconColor,
        headerTitleStyle: {
          fontSize: 18,
        },
        headerLeft: route.name === 'Settings' ? () => (
          <Pressable
            style={{ marginLeft: 10 }}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Icon name="bars" size={25} color={currentTheme.iconColor} />
          </Pressable>
        ) : undefined,
      })}
    >
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="YourAccount" component={Profile} />
      <Stack.Screen name="SecurityandAccountAccess" component={SecurityAccess} />
      <Stack.Screen name="Monetization" component={Monetization} />
      <Stack.Screen name="PrivacyandSafety" component={Privacy_Safety} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Accessibility" component={Accessibility_Display_Languages} />
      <Stack.Screen name="AdditionalResources" component={Additional_Settings} />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;