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
        <TouchableOpacity ref={audioItemMenuRef} onPress={togglePopover} style={styles.edgeIcon}>
          <Menu color={currentTheme.iconColor} />
        </TouchableOpacity>
      )}

    </>
  );
})



const AudioItem = observer(({ audio, index, playlistId, activity }) => {
  const { currentTheme } = useTheme();



  const selected = selectionControl.isItemSelected(audio.id, activity.selectionActivity); 
  

  const onPress = useCallback(() => {
    if (selectionControl.getSelectionStatus?.active && selectionControl.getSelectionStatus.selectionActivity === activity.selectionActivity) {
      selectionControl.selectItem(audio.id, activity.selectionActivity);
    } else {
      console.log(audio);
    }
  }, [audio.id, activity.selectionActivity]);
  
  const switchSelectionMode = useCallback(() => {
    const newStatus = {
      srcId: playlistId,
      selectionActivity: activity.selectionActivity,
    };

    selectionControl.setActivity(newStatus);
    onPress();
  }, [audio.id, activity.selectionActivity, playlistId]);

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
        <MusicNoteIcon color={currentTheme.secondaryIconColor} size={22} />
      </View>

      <View style={[styles.container, {borderBottomColor:currentTheme.fadedText}]}>


        <View style={styles.textContainer}>
          <Text
            style={{ color: currentTheme.textColor, fontSize: currentTheme.smallFont, overflow: 'hidden' }}
            numberOfLines={1} ellipsizeMode="tail" >

            {audio.title || audio.filename}
          </Text>

          <Text style={{ color: currentTheme.textColor, fontSize: currentTheme.tinyFont }}>
            Unknown artist
          </Text>


        </View>

        <EdgeIcon
            onPress={onPress}
            audio={audio}
            isSelected={selected}
            selectionMode={selectionControl.getSelectionStatus?.active && selectionControl.getSelectionStatus.selectionActivity === activity.selectionActivity} />


      </View>

    </TouchableOpacity>
  );

  return renderedItem;
});



const styles = StyleSheet.create({
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
    borderRadius: 15,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth:1,
    paddingBottom:8,
    alignItems:'center'
  },
  textContainer: {
    flexDirection:"column",
    flex: 1,
    gap: 5,
    justifyContent: 'center',        
  },
  edgeIcon: {
    
  },
  
});

export default AudioItem;
