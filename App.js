import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AudioProvider from './app/lib/control/audioPlayBackContext';
import { ThemeProvider } from './app/lib/utils/SetTheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import MainNavigation from './app/screens/main/navigation';
import { getAudioFiles } from './app/lib/utils/deviceAccess/getAudioFiles';
import Splash from './app/screens/Splash';
import Loading from './app/screens/Loading';
import AuthStack from './app/screens/auth/navigation';
import SplashScreen from './app/screens/Loading';

const App = () => {
  useEffect(() => {
    getAudioFiles();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <AudioProvider>
          <ThemeProvider>
            <SafeAreaProvider>
              <NavigationContainer>
                <StatusBar
                  backgroundColor="transparent"
                  barStyle="dark-content"
                  translucent={true}
                />
                {/*<SplashScreen/>*/}
                {/*<AuthStack/>*/}
                <MainNavigation />
                {/*<Loading/>*/}
              </NavigationContainer>
            </SafeAreaProvider>
          </ThemeProvider>
        </AudioProvider>
    </GestureHandlerRootView>
  );
};

export default App;
