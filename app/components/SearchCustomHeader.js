import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { observer } from 'mobx-react-lite';
import selectionControl from '../lib/control/SelectionControl';
import LeftArrowIcon from '../assets/icons/LeftArrowIcon';
import CloseIcon from '../assets/icons/CloseIcon';
import AnimatedPressable from './AnimatedPressable';

const SearchCustomHeader = observer(() => {

  return (
    <View style={styles.header}>
      {/* Back Button */}
      <AnimatedPressable onPress={() => console.log('Back Pressed')}>
        <LeftArrowIcon size={24} color="black" />
      </AnimatedPressable>
      
      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={selectionControl.getSearchText}
        onChangeText={(value)=>selectionControl.setSearchText(value)}
      />
      
      {/* Clear Button */}
      <AnimatedPressable onPress={() => selectionControl.setSearchText('')}>
        <CloseIcon color="black" />
      </AnimatedPressable>
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    padding: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default SearchCustomHeader;
