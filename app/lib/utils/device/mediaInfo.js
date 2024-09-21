import { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';

export const useMediaInfo = () => {
  const [mediaInfo, setMediaInfo] = useState({ musicFiles: [], videoFiles: [] });

  useEffect(() => {
    const fetchMediaInfo = async () => {
      const media = await MediaLibrary.getAssetsAsync({
        mediaType: ['audio', 'video'],
        sortBy: ['creationTime'],
      });

      const musicFiles = media.assets.filter(file => file.mediaType === 'audio');
      const videoFiles = media.assets.filter(file => file.mediaType === 'video');

      setMediaInfo({ musicFiles, videoFiles });
    };

    fetchMediaInfo();

    // Set up a subscription for media library changes (if applicable)

    // Clean up on unmount
    return () => {};
  }, []);

  return mediaInfo;
};
