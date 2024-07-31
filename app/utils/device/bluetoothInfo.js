import { useState, useEffect } from 'react';

export const useBluetoothInfo = () => {
  // Expo does not support Bluetooth info.
  // This is a placeholder.

  const [bluetoothInfo, setBluetoothInfo] = useState('Expo does not support Bluetooth information');

  useEffect(() => {
    // Update logic if Bluetooth info becomes available

    // Clean up on unmount
    return () => {};
  }, []);

  return bluetoothInfo;
};
