import { StyleSheet, Text, View, BackHandler, Alert } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { ToolTip } from '../components/Tooltip';

export default function Splash() {
  useEffect(() => {
    // Set navigation bar to transparent
    SystemNavigationBar.setNavigationColor('#FF0000');

    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove(); // Cleanup the event listener
    };
  }, []);

  return (
    <SafeAreaView style={[styles.screen, {backgroundColor:'red'}]} >
      <View style={styles.container}>
        <ToolTip>
          <Text>Hello</Text>
        </ToolTip>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "blue"
  },
  container: {
    flex: 1,
    backgroundColor: "red"
  }
});
