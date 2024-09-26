import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import selectionControl from '../lib/control/SelectionControl';
import LeftArrowIcon from '../assets/icons/LeftArrowIcon';
import CloseIcon from '../assets/icons/CloseIcon';
import AnimatedPressable from './AnimatedPressable';
import { useTheme } from '../lib/utils/SetTheme';

const SearchCustomHeader = observer(() => {
  const { currentTheme } = useTheme();

  return (
    <View style={styles.header}>
      {/* Back Button */}
      <AnimatedPressable onPress={() => console.log('Back Pressed')}>
        <LeftArrowIcon size={24} color={currentTheme.iconColor}/>
      </AnimatedPressable>

      {/* Search Input */}
      <TextInput
        style={[
          styles.searchInput,
          { fontSize: currentTheme.mediumFont, fontWeight: 'bold', color: currentTheme.textColor },
        ]}
        placeholder="Search"
        value={selectionControl.getSearchText}
        onChangeText={(value) => selectionControl.setSearchText(value)}
        placeholderTextColor={currentTheme.textColor}
        selectionColor={currentTheme.textColor}
      />

      {/* Clear Button */}
      <AnimatedPressable onPress={() => selectionControl.setSearchText('')}>
        <CloseIcon color={currentTheme.iconColor} />
      </AnimatedPressable>
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'transparent',
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    padding: 5,
  },
});

export default SearchCustomHeader;
