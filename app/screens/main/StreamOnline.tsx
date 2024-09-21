import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../lib/utils/SetTheme';
import { observer } from 'mobx-react-lite';
import selectionControl from '../../lib/control/SelectionControl'; // Ensure the correct import path

const StreamOnline = observer(() => {
  const { currentTheme } = useTheme();
  const { getScreenProps } = selectionControl;


  return (
    <View style={[styles.screen, { backgroundColor: currentTheme.secondaryBackground, marginTop: getScreenProps.headerHeight }]}>
      <Text style={{ color: currentTheme.textColor, fontSize: currentTheme.largeFont }}>Coming Soon</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default StreamOnline;
