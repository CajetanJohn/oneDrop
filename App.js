import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
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
import SearchNavigation from './app/screens/search/navigator';

import { View, StyleSheet } from 'react-native';


const AppContent = () => {
  const insets = useSafeAreaInsets(); // Get the safe area insets

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={true}
      />
      <SearchNavigation/>
      
      {/* Uncomment the following when needed */}
      {/* <SplashScreen/>
      <AuthStack/>
      <MainNavigation />
      <Splash/>
      <Loading/> */}
    </View>
  );
};

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
              <AppContent /> 
            </NavigationContainer>
          </SafeAreaProvider>
        </ThemeProvider>
      </AudioProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'red'
  },
});

export default App;
