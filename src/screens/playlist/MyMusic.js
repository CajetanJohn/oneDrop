import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MusicList from '../../services/local/deviceMusic';
import * as FileSystem from 'expo-file-system';

const MyMusic = () => {
  const [localFiles, setLocalFiles] = useState([]);

  useEffect(() => {
    const loadLocalFiles = async () => {
      // Load local files logic here
      // Placeholder: Simulate loading local audio files
      const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
      setLocalFiles(files.filter(file => file.endsWith('.mp3'))); // Filter only .mp3 files
    };

    loadLocalFiles();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MusicList data={localFiles.map((file, index) => ({ name: file, artistName: 'Local Artist', numberOfPlays: index }))} />
    </View>
  );
};

export default MyMusic;
