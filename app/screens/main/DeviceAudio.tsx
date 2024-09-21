import React from 'react';
import { View,  StyleSheet, } from 'react-native';
import { useTheme } from '../../lib/utils/SetTheme';
import { observer } from 'mobx-react-lite';
import selectionControl from '../../lib/control/SelectionControl';
import { TrackList } from '../../components/TrackList';


const DeviceAudioScreen = observer(() => {
  const { currentTheme } = useTheme();
  const { getScreenProps } = selectionControl;

  return (
    <View style={[styles.screen, { backgroundColor: currentTheme.secondaryBackground, marginTop: getScreenProps.headerHeight }]}>
       <TrackList playlistId={"111"} />
    </View>
  );
});


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow:'hidden',
  }
});

export default DeviceAudioScreen;
