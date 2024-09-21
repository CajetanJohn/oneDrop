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
                  barStyle="dark-content" // This sets the content color to a lighter shade
                  translucent={true}
                />
                <MainNavigation />
              </NavigationContainer>
            </SafeAreaProvider>
          </ThemeProvider>
        </AudioProvider>
    </GestureHandlerRootView>
  );
};

export default App;
