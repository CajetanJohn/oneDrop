import { makeAutoObservable } from "mobx";
import DeviceInfo from 'react-native-device-info';
import { Dimensions, Platform } from 'react-native';
import { getStatusBarHeight, getInsets } from 'react-native-safe-area-context';

class DeviceStore {
  deviceInfo = {
    platform: '',
    model: '',
    osVersion: '',
    apiLevel: null,
    screenWidth: 0,
    screenHeight: 0,
    notchHeight: 0,
    navigationBarHeight: 0,
  };

  constructor() {
    makeAutoObservable(this);
    this.fetchDeviceInfo();
  }

  async fetchDeviceInfo() {
    // Fetch platform information (Android or iOS)
    const platform = Platform.OS;
    const model = DeviceInfo.getModel();
    const osVersion = DeviceInfo.getSystemVersion();
    const screenDimensions = Dimensions.get('window');
    const notchHeight = getStatusBarHeight(); // Safe area notch height (for iOS)
    const screenHeight = screenDimensions.height;
    const screenWidth = screenDimensions.width;

    // Calculate the navigation bar height and status bar insets
    const insets = await getInsets();  // Get safe area insets
    let navigationBarHeight = 0;

    if (platform === 'android') {
      // Calculate navigation bar height for Android
      const hasPhysicalNavigationButtons = await DeviceInfo.hasNotch();
      if (!hasPhysicalNavigationButtons) {
        // Calculate the navigation bar height dynamically
        navigationBarHeight = screenHeight - insets.bottom - screenHeight;
      } else {
        navigationBarHeight = insets.bottom;  // For devices with no physical buttons, use the bottom inset
      }
    } else {
      // On iOS, the bottom inset is usually equal to the home indicator area
      navigationBarHeight = insets.bottom;
    }

    // Store all the device information in MobX observable state
    this.deviceInfo = {
      platform,
      model,
      osVersion,
      apiLevel: platform === 'android' ? await DeviceInfo.getApiLevel() : null,
      screenWidth,
      screenHeight,
      notchHeight,
      navigationBarHeight,
    };
  }

  // Computed values to get device info
  get platform() {
    return this.deviceInfo.platform;
  }

  get model() {
    return this.deviceInfo.model;
  }

  get osVersion() {
    return this.deviceInfo.osVersion;
  }

  get screenWidth() {
    return this.deviceInfo.screenWidth;
  }

  get screenHeight() {
    return this.deviceInfo.screenHeight;
  }

  get notchHeight() {
    return this.deviceInfo.notchHeight;
  }

  get apiLevel() {
    return this.deviceInfo.apiLevel;
  }

  get navigationBarHeight() {
    return this.deviceInfo.navigationBarHeight;
  }
}

const deviceStore = new DeviceStore();
export default deviceStore;
