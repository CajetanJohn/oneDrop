import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import mockMusicFiles from '../../data/example/songs';
import { useTheme } from '../../utils/SetTheme';

const Music = ({ navigation }) => {
  const { currentTheme } = useTheme();

  const handlePress = (song) => {
    navigation.navigate('SongDetails', { song });
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
  container: {
    flex: 1,
  },
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
    whiteSpace: 'nowrap', // For horizontal scrolling effect
    textOverflow: 'ellipsis', // For horizontal scrolling effect
  },
  divider: {
    height: 1,
    width: '100%',
  },
});

export default Music;
