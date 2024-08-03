import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from 'react-native-vector-icons';
import { useTheme } from '../utils/SetTheme';

const CurrentPLaying = () => {
  const { currentTheme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { song } = route.params; // Get the song data from route parameters

  // Customize header options
  useLayoutEffect(() => {
    navigation.setOptions({
      title: song.fileName,
      headerLeft: () => (
        <Ionicons
          name="arrow-back"
          size={24}
          color={currentTheme.textColor}
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 16 }}
        />
      ),
      headerTitleAlign: 'center',
    });
  }, [navigation, song, currentTheme]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <View style={styles.detailsContainer}>
        <Text style={[styles.label, { color: currentTheme.textColor }]}>File Name:</Text>
        <Text style={[styles.text, { color: currentTheme.textColor }]}>{song.fileName}</Text>
        <Text style={[styles.label, { color: currentTheme.textColor }]}>Location:</Text>
        <Text style={[styles.text, { color: currentTheme.textColor }]}>{song.location}</Text>
        <Text style={[styles.label, { color: currentTheme.textColor }]}>Modified Time:</Text>
        <Text style={[styles.text, { color: currentTheme.textColor }]}>{new Date(song.modifiedTime).toLocaleString()}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    // Dynamically change border color based on the theme
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    flex: 1,
    textAlign: 'center',
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default CurrentPLaying;
