import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../lib/utils/SetTheme';
import MusicNoteIcon from '../assets/icons/MusicNoteIcon';
import Menu from '../assets/icons/menu';
import selectionControl from '../lib/control/SelectionControl';
import { observer } from 'mobx-react-lite';
import { ACTIVITY_TYPE } from '../lib/constants/Variables';

import { RadioButton } from './inputs/RadioButton';

// Inline RadioButton component


const EdgeIcon = observer(({ audio, selectionMode, isSelected, onPress }) => {
  const { currentTheme } = useTheme();
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const audioItemMenuRef = useRef(null);




  const togglePopover = () => {
    setPopoverVisible(prev => !prev);
  };

  return (
    <>
      {selectionMode ? (
        <RadioButton isSelected={isSelected} onPress={()=>onPress(audio)} />
      ) : (
        <TouchableOpacity ref={audioItemMenuRef} onPress={togglePopover}>
          <Menu color={currentTheme.iconColor} />
        </TouchableOpacity>
      )}

    </>
  );
})



const AudioItem = observer(({ audio, index, playlistId, activity }) => {
  const { currentTheme } = useTheme();
  const {getSelectionStatus, } = selectionControl;


  const selected = selectionControl.isItemSelected(audio.id, activity.activityType); 
  

  const onPress = useCallback(() => {
    if (selectionControl.getSelectionStatus?.active && selectionControl.getSelectionStatus.activityType === activity.activityType) {
      selectionControl.selectItem(audio.id, activity.activityType);
    } else {
      console.log(audio);
    }
  }, [audio.id, activity.activityType]);
  
  const switchSelectionMode = useCallback(() => {
    const newStatus = {
      srcId: playlistId,
      activityType: activity.activityType,
    };

    selectionControl.setActivity(newStatus);
    onPress();
  }, [audio.id, activity.activityType, playlistId]);

  // Memoize the JSX output
  const renderedItem = (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        { backgroundColor: currentTheme.selectedBackground }
      ]}
      onLongPress={()=>switchSelectionMode(true)}
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: currentTheme.tertiaryBackground }]}>
        <MusicNoteIcon color={currentTheme.secondaryIconColor} size={25} />
      </View>

      <View style={styles.textContainer}>
        <Text
          style={{ color: currentTheme.textColor, fontSize: currentTheme.smallFont, overflow: 'hidden' }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {audio.title || audio.filename}
        </Text>
        <Text style={{ color: currentTheme.textColor, fontSize: currentTheme.tinyFont }}>
          Unknown artist
        </Text>
        <View style={[styles.border, { backgroundColor: currentTheme.fadedText }]} />
      </View>

      <View style={styles.radioContainer}>
        <EdgeIcon
          onPress={onPress}
          audio={audio}
          isSelected={selected}
          selectionMode={selectionControl.getSelectionStatus?.active && selectionControl.getSelectionStatus.activityType === activity.activityType}
        />
      </View>
    </TouchableOpacity>
  );

  return renderedItem;
});



const styles = StyleSheet.create({
  container: {
    
    backgroundColor:"blue"
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginTop:10
  },
  iconContainer: {
    padding: 15,
    borderRadius: 10,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 5,
    flex: 1,
  },
  border: {
    height: 1,
  },
  
  popoverStyle: {
    borderRadius: 15,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  transparentBackground: {
    backgroundColor: 'transparent',
  },
  popoverContent: {
    padding: 10,
  },
  popoverItem: {
    fontSize: 16,
    padding: 10,
  },
});

export default AudioItem;
