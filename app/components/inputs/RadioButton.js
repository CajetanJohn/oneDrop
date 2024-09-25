import { observer } from 'mobx-react-lite';
import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../lib/utils/SetTheme';


export const RadioButton = observer(({ isSelected, onPress, size = 20 }) => {
    const { currentTheme } = useTheme();
    return (
      <TouchableOpacity onPress={onPress} style={[styles.radioContainer, {height: size, width: size, borderColor:currentTheme.textColor}]}>
        <View
          style={[
            styles.radioButton,
            { borderColor: currentTheme.textColor, height: size - 9, width: size - 9 },
            isSelected && {
              backgroundColor: currentTheme.textColor,
              borderColor: currentTheme.textColor,
            },
          ]}
        />
      </TouchableOpacity>
    );
  });


  const styles=StyleSheet.create({
    radioContainer: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 2,


      },
      radioButton: {
        borderRadius: 50,
      },
  })
  
  