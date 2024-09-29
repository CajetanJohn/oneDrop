import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import MusicNoteIcon from '../assets/icons/MusicNoteIcon';
import selectionControl from '../lib/control/SelectionControl';
import { useTheme } from '../lib/utils/SetTheme';
import AnimatedPressable from './AnimatedPressable';
import CustomPopover from './PopOver';
import Menu from '../assets/icons/menu';

// HighlightedText Component
const HighlightedText = observer(({ text, highlight, style }) => {
  if (!highlight) {
    return (
      <Text numberOfLines={1} ellipsizeMode="tail" style={style}>
        {text}
      </Text>
    );
  }

  // Split the text into parts and highlight matching segments
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

  return (
    <Text numberOfLines={1} ellipsizeMode="tail">
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <Text key={index} style={[style, { fontWeight: 'bold', color: 'orange' }]}>
            {part}
          </Text>
        ) : (
          <Text key={index} style={style}>
            {part}
          </Text>
        )
      )}
    </Text>
  );
});

const EdgeIcon = observer(({ item, onPress }) => {
  const { currentTheme } = useTheme();
  const [isPopoverVisible, setPopoverVisible] = React.useState(false);
  const ItemMenuRef = React.useRef(null);

  const options = [
    { title: 'Add', onPress: () => { console.log(item); } },
    { title: 'Delete', onPress: () => { console.log(item); } },
    { title: 'Share', onPress: () => { console.log(item); } },
    { title: 'Details', onPress: () => { console.log(item); } }
  ];

  const togglePopover = () => {
    setPopoverVisible(prev => !prev);
  };

  return (
    <>
      <AnimatedPressable onPress={togglePopover} style={styles.edgeIcon}>
        <Text style={{ width: 0, height: 0 }} ref={ItemMenuRef}>{null}</Text>
        <Menu color={currentTheme.fadedText} />
      </AnimatedPressable>

      <CustomPopover
        options={options}
        ref={ItemMenuRef}
        isVisible={isPopoverVisible}
        onClose={() => setPopoverVisible(false)}
      />
    </>
  );
});

const SearchItem = observer(({ item, onPress }) => {
  const { currentTheme } = useTheme();
  const highlight = selectionControl.getSearchText.toLowerCase();
  console.log(item);
  
  // Fallback for missing data fields
  const filename = item?.title || 'Unknown Filename';
  const artist = item?.artist || 'Unknown Artist';
  const album = item?.album || 'Unknown Album';

  return (
    <TouchableOpacity style={[styles.itemContainer, { backgroundColor: "transparent" }]} onPress={() => onPress(item)}>
      <View style={[styles.iconContainer, { backgroundColor: currentTheme.tertiaryBackground }]}>
        <MusicNoteIcon color={currentTheme.secondaryIconColor} size={22} />
      </View>

      <View style={[styles.container, {borderBottomColor:currentTheme.fadedText}]}>
      <View style={styles.textContainer}>
        {/* Display and highlight filename */}
            <HighlightedText
            text={filename}
            highlight={highlight}
            style={{ color: currentTheme.textColor, fontSize: currentTheme.smallFont }}
            />

            {/* Display and highlight artist */}
            <HighlightedText
            text={artist}
            highlight={highlight}
            style={{ color: currentTheme.textColor, fontSize: currentTheme.tinyFont }}
            />

            {/* Display and highlight album */}
            {/* Uncomment if you want to display the album as well */}
            {/* 
            <HighlightedText
            text={`Album: ${album}`}
            highlight={highlight}
            style={{ color: currentTheme.textColor, fontSize: currentTheme.smallFont }}
            />
            */}
        </View>
      <EdgeIcon onPress={onPress} item={item} />

      </View>
      
    </TouchableOpacity>
  );
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
    marginTop: 10,
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
  highlight: {
    fontWeight: 'bold',
  },
});

export default SearchItem;
