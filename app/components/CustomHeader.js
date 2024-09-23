import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Popover from 'react-native-popover-view';
import { observer } from 'mobx-react-lite';
import selectionControl from '../lib/control/SelectionControl';
import { useTheme } from '../lib/utils/SetTheme';
import SelectionOptions from './SelectionOptions';
import MenuOptions from './menuOptions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {ACTIVITY_TYPE} from "@env";

// Popover Component for Header Options
const HeaderPopover = ({ isPopoverVisible, togglePopover, menuRef }) => {
  const { currentTheme } = useTheme();

  const handleSettingsPress = () => {
    console.log("Settings pressed");
    togglePopover();
  };

  const handleProfilePress = () => {
    console.log("Profile pressed");
    togglePopover();
  };

  const handleHistoryPress = () => {
    console.log("History pressed");
    togglePopover();
  };

  return (
    <Popover
      isVisible={isPopoverVisible}
      from={menuRef}
      onRequestClose={togglePopover}
      popoverStyle={[styles.popoverStyle, { backgroundColor: currentTheme.popUpBackground }]}
      arrowStyle={{ display: 'none' }}
      placement="auto"
      backgroundStyle={styles.transparentBackground}
    >
      <View style={styles.popoverContent}>
        <TouchableOpacity onPress={handleSettingsPress}>
          <Text style={[styles.popoverItem, { color: currentTheme.textColor }]}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleProfilePress}>
          <Text style={[styles.popoverItem, { color: currentTheme.textColor }]}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHistoryPress}>
          <Text style={[styles.popoverItem, { color: currentTheme.textColor }]}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHistoryPress}>
          <Text style={[styles.popoverItem, { color: currentTheme.textColor }]}>Sound and system settings</Text>
        </TouchableOpacity>
      </View>
    </Popover>
  );
};

// CustomHeader Component
const CustomHeader = observer(({currentPage}) => {
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const menuRef = useRef(null);
  const notchHeight = useSafeAreaInsets();
  const { currentTheme } = useTheme();

  // Toggle the popover visibility
  const togglePopover = () => {
    setPopoverVisible(prev => !prev);
  };

  return (
    <View style={[styles.headerContainer, { paddingTop: notchHeight.top / 1.5}]}>
      <Text style={{ color: currentTheme.textColor, fontSize: currentTheme.smallFont }}>
        BENJAMIN Aukapa
      </Text>
      <View style={styles.headerIcons}>
        { selectionControl?.getSelectionStatus?.active ?  (
          <SelectionOptions /> 
        ) : (
          <MenuOptions currentPage={currentPage}/>
        )}
      </View>
      <HeaderPopover
        isPopoverVisible={isPopoverVisible}
        togglePopover={togglePopover}
        menuRef={menuRef}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  headerIcons: {
    
  },
  popoverStyle: {
    borderRadius: 15,
    padding: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: -60,
  },
  transparentBackground: {
    backgroundColor: 'transparent',
  },
  popoverContent: {
    padding: 10,
  },
  popoverItem: {
    fontSize: 16,
    paddingVertical: 8,
  },
});

export default CustomHeader;
