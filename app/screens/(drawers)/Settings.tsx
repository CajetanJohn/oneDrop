import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DeviceInformation from '../../components/deviceInfo';
import { useCombinedDeviceInfo } from '../../utils/device/combinedDeviceInfo';
import { useTheme } from '../../utils/SetTheme';


const Settings = () => {
  const navigation = useNavigation();
  const { batteryInfo, locationInfo, mediaInfo, volumeInfo, bluetoothInfo, networkInfo, permissions } = useCombinedDeviceInfo();
  const { theme, currentTheme } = useTheme();

  const [deviceInfo, setDeviceInfo] = useState({});
  const [themeInfo, setThemeInfo] = useState({});

  useEffect(() => {
    setDeviceInfo({
      Battery: `Level: ${batteryInfo?.batteryLevel || 'N/A'}, Charging: ${batteryInfo?.isCharging ? 'Yes' : 'No'}`,
      Location: `Latitude: ${locationInfo?.coords?.latitude || 'N/A'}, Longitude: ${locationInfo?.coords?.longitude || 'N/A'}`,
      Media: `Media Count: ${mediaInfo?.assets?.length || 'N/A'}`,
      Volume: `Volume Level: ${volumeInfo?.volume || 'N/A'}`, // Ensure you have volume info
      Bluetooth: `Bluetooth Status: ${bluetoothInfo?.status || 'N/A'}`,
      Network: `Network Status: ${networkInfo?.status || 'N/A'}`,
      Permissions: `Location: ${permissions?.locationStatus || 'N/A'}, Media: ${permissions?.mediaStatus || 'N/A'}`,
    });

    setThemeInfo({
      Theme: theme,
      CurrentTheme: JSON.stringify(currentTheme, null, 2),
    });
  }, [batteryInfo, locationInfo, mediaInfo, volumeInfo, bluetoothInfo, networkInfo, permissions, theme, currentTheme]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          title="Go to Stack"
          onPress={() => navigation.navigate('Main')}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <DeviceInformation title="Device Information" content={JSON.stringify(deviceInfo, null, 2)} />
      <DeviceInformation title="Theme Information" content={JSON.stringify(themeInfo, null, 2)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Settings;
