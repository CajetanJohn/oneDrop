// Dropdown.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Dropdown = ({ value, onValueUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editable, setEditable] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleInputChange = (e) => setInputValue(e.nativeEvent.text);

  const handleUpdateValue = () => {
    onValueUpdate(inputValue);
    setEditable(false);
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity style={styles.dropdownHeader} onPress={toggleDropdown}>
        <Text style={styles.dropdownText}>{value}</Text>
        <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownMenu}>
          <View style={styles.dropdownItem}>
            <Text style={styles.dropdownText}>{value}</Text>
            <Icon name="check" size={20} style={styles.iconRight} />
          </View>
          <TouchableOpacity style={styles.dropdownItem} onPress={() => setEditable(!editable)}>
            <Icon name="plus" size={20} />
            {editable && (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Enter new value"
                />
                <TouchableOpacity onPress={handleUpdateValue}>
                  <Text style={styles.updateButton}>Update</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    position: 'relative',
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdownText: {
    flex: 1,
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconRight: {
    marginLeft: 'auto',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  updateButton: {
    marginLeft: 10,
    color: 'blue',
  },
});

export default Dropdown;
