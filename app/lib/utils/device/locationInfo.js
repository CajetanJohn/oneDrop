import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export const useLocationInfo = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const { coords } = await Location.getCurrentPositionAsync({});
        setLocation(coords);
      }
    };

    fetchLocation();

    // Set up a subscription for location changes (if applicable)
    // Note: Expo's Location API does not provide continuous location updates in managed workflow

    // Clean up on unmount
    return () => {};
  }, []);

  return location;
};
