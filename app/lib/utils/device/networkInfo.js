import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo'; // Install with `npm install @react-native-community/netinfo`

export const useNetworkInfo = () => {
  const [networkInfo, setNetworkInfo] = useState({ isConnected: false, type: 'unknown' });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetworkInfo({
        isConnected: state.isConnected,
        type: state.type,
      });
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  return networkInfo;
};
