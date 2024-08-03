import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import mockMusicFiles from '../../data/example/songs';
import { useTheme } from '../../utils/SetTheme';

const Music = ({ navigation }) => {
  const { currentTheme } = useTheme();

  const handlePress = (song) => {
    navigation.navigate('CurrentPlaying', { song }); // Pass the song details
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
      <View style={styles.textContainer}>
        <Text style={[styles.text, { color: currentTheme.textColor }]}>{item.fileName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={mockMusicFiles}
      renderItem={renderItem}
      keyExtractor={(item) => item.fileName}
      ItemSeparatorComponent={() => <View style={[styles.divider, { backgroundColor: currentTheme.dividerColor }]} />}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  text: {
    fontSize: 16,
  },
  divider: {
    height: 1,
    width: '100%',
  },
});

export default Music;
