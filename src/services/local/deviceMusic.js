import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';


const Music = [
  {
    name: 'Song of Freedom',
    artistName: 'The Liberators',
    numberOfPlays: 15324,
  },
  {
    name: 'Dream Chasers',
    artistName: 'Skyline Dreams',
    numberOfPlays: 20489,
  },
  {
    name: 'Echoes of Time',
    artistName: 'Chronos Band',
    numberOfPlays: 18765,
  },
  {
    name: 'Midnight Groove',
    artistName: 'Night Owls',
    numberOfPlays: 22147,
  },
  {
    name: 'Whispering Winds',
    artistName: 'Nature Sounds',
    numberOfPlays: 13456,
  },
  {
    name: 'Urban Beats',
    artistName: 'City Vibes',
    numberOfPlays: 19934,
  },
  {
    name: 'Ocean Waves',
    artistName: 'Seaside Symphony',
    numberOfPlays: 24567,
  },
  {
    name: 'Starlight Serenade',
    artistName: 'Galaxy Tunes',
    numberOfPlays: 18234,
  },
  {
    name: 'Mountain Echoes',
    artistName: 'Hiking Harmony',
    numberOfPlays: 21345,
  },
  {
    name: 'Sunset Melodies',
    artistName: 'Evening Ensemble',
    numberOfPlays: 17654,
  },
];





const MusicList = () => {
  const handlePlay = (item) => {
    // Implement play functionality here
    console.log('Playing', item.name);
  };

  const handleShare = (item) => {
    // Implement share functionality here
    console.log('Sharing', item.name);
  };

  return (
    <FlatList
      data={Music}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text style={styles.musicText}>{item.name} by {item.artistName}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => handlePlay(item)} style={styles.playButton}>
              <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleShare(item)} style={styles.shareButton}>
              <Text style={styles.buttonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:'red',
  },
  musicText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  playButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  shareButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  separator: {
    height: 10,
  },
});

export default MusicList;
