import { useEffect, useState } from 'react';
import * as Battery from 'expo-battery';

export const useBatteryInfo = () => {
  const [batteryInfo, setBatteryInfo] = useState({ level: null, isCharging: null });

  useEffect(() => {
    const fetchBatteryInfo = async () => {
      const level = await Battery.getBatteryLevelAsync();
      const isCharging = await Battery.isChargingAsync();
      setBatteryInfo({
        level: level * 100, // Convert to percentage
        isCharging,
      });
    };

    fetchBatteryInfo();

    // Set up a subscription for battery level changes
    Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setBatteryInfo(prev => ({ ...prev, level: batteryLevel * 100 }));
    });

    // Clean up subscription on unmount
    return () => Battery.removeBatteryLevelListener();
  }, []);

  return batteryInfo;
};
