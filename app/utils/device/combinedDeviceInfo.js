// deviceInfo/combinedDeviceInfo.js
import { useBatteryInfo } from './batteryInfo';
import { useLocationInfo } from './locationInfo';
import { useMediaInfo } from './mediaInfo';
import { useVolumeInfo } from './volumeInfo';
import { useBluetoothInfo } from './bluetoothInfo';
import { useNetworkInfo } from './networkInfo';
import { useFileSystemInfo } from './fileSystemInfo';
import { requestPermissions } from './permissions';

export const useCombinedDeviceInfo = () => {
  const batteryInfo = useBatteryInfo();
  const locationInfo = useLocationInfo();
  const mediaInfo = useMediaInfo();
  const volumeInfo = useVolumeInfo();
  const bluetoothInfo = useBluetoothInfo();
  const networkInfo = useNetworkInfo();
  const { createFolder } = useFileSystemInfo();

  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    const fetchPermissions = async () => {
      const perm = await requestPermissions();
      setPermissions(perm);
    };

    fetchPermissions();
  }, []);

  return {
    batteryInfo,
    locationInfo,
    mediaInfo,
    volumeInfo,
    bluetoothInfo,
    networkInfo,
    createFolder,
    permissions,
  };
};
