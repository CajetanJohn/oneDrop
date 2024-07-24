import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MusicList from '../../services/local/deviceMusic';

const OnlineMusic = () => {
  const [onlineMusic, setOnlineMusic] = useState([]);

  useEffect(() => {
    const loadOnlineMusic = async () => {
      // Simulate fetching online music
      setOnlineMusic(Music);
    };

    loadOnlineMusic();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MusicList data={onlineMusic} />
    </View>
  );
};

export default OnlineMusic;
