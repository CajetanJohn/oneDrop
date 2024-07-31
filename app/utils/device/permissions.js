import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';

export const requestPermissions = async () => {
  const locationStatus = await Location.requestForegroundPermissionsAsync();
  const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();

  return {
    location: locationStatus.status === 'granted',
    mediaLibrary: mediaLibraryStatus.status === 'granted',
  };
};
