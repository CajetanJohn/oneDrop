// SearchItem.js
import React, {useState, useRef} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import Menu from '../assets/icons/menu';
import MusicNoteIcon from '../assets/icons/MusicNoteIcon';
import selectionControl from '../lib/control/SelectionControl';
import { useTheme } from '../lib/utils/SetTheme';
import AnimatedPressable from './AnimatedPressable';
import CustomPopover from './PopOver';

// HighlightedText Component
const HighlightedText = observer(({ text }) => {
  const { currentTheme } = useTheme();
  const highlight = selectionControl.getSearchText;

  if (!highlight) return <Text style={{ color: currentTheme.textColor }}>{text}</Text>;

  // Split the text into parts and highlight matching parts
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

  return (
    <Text>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <Text key={index} style={[styles.highlight, { color: currentTheme.highlightedTextColor, fontSize: currentTheme.smallFont }]}>
            {part}
          </Text>
        ) : (
          <Text key={index} style={{ color: currentTheme.textColor, fontSize: currentTheme.smallFont }}>
            {part}
          </Text>
        )
      )}
    </Text>
  );
});




const EdgeIcon = observer(({ item, onPress }) => {
    const { currentTheme } = useTheme();
    const [isPopoverVisible, setPopoverVisible] = useState(false);
    const ItemMenuRef = useRef(null);
  
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
        <AnimatedPressable  onPress={togglePopover} style={styles.edgeIcon}>
            <Text style={{width:0, height:0}} ref={ItemMenuRef}>{null}</Text>
            <Menu color={currentTheme.fadedText} />
          </AnimatedPressable>
  
        <CustomPopover
          options={options}
          ref={ItemMenuRef} // Pass the ref for positioning
          isVisible={isPopoverVisible} // Control visibility
          onClose={() => setPopoverVisible(false)} // Handle closing the popover
        />
      </>
    );
  });

// SearchItem Component
const SearchItem = observer(({ item, onPress }) => {
  const { currentTheme } = useTheme();

  return (
    <TouchableOpacity style={[styles.itemContainer, { backgroundColor: "transparent" }]} onPress={() => onPress(item)}>
      {/* Music Icon on the left */}
      <View style={[styles.iconContainer, { backgroundColor: currentTheme.tertiaryBackground }]}>
        <MusicNoteIcon color={currentTheme.secondaryIconColor} size={22} />
      </View>

      <View style={styles.textContainer}>
        <HighlightedText text={item} />

        
      </View>
      <EdgeIcon
            onPress={onPress}
            item={item}
            />

    </TouchableOpacity>
  );
});

// Styles for SearchItem and HighlightedText
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
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  highlight: {
    fontWeight: 'bold',
  },
});

export default SearchItem;
