import React from 'react';
import { View, StyleSheet, Text, Pressable, TouchableOpacity } from 'react-native';
import { useTheme } from '../../lib/utils/SetTheme';
import { RadioButton } from '../inputs/RadioButton';




const ThemeSwitcher = () => {
  const { theme, setTheme, currentTheme } = useTheme();


  return (
    <View style={styles.themeContainer}>
        <Text style={{color:currentTheme.textColor}}>Theme</Text>
        <View style={[styles.switchContainer, {backgroundColor:currentTheme.tertiaryBackground, borderColor:currentTheme.fadedText}]}>

          <TouchableOpacity style={[styles.theme,{borderBottomWidth:1, borderColor:currentTheme.fadedText}]} onPress={()=>{setTheme('system')}}>
            <Text style={[styles.themeText, {color:currentTheme.textColor}]}>Automatic</Text>
            <RadioButton isSelected={theme === 'system'} onPress={()=>{setTheme('system')}}/>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.theme,{borderBottomWidth:1, borderColor:currentTheme.fadedText}]} onPress={()=>{setTheme('light')}}>
            <Text style={[styles.themeText, {color:currentTheme.textColor}]}>Light</Text>
            <RadioButton isSelected={theme === 'light'} onPress={()=>{setTheme('light')}}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.theme} onPress={()=>{setTheme('dark')}}>
            <Text style={[styles.themeText, {color:currentTheme.textColor}]}>Dark</Text>
            <RadioButton isSelected={theme === 'dark'} onPress={()=>{setTheme('dark')}}/>
          </TouchableOpacity>
          
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  themeContainer:{
    gap:15
  },
  switchContainer:{
    borderWidth:1,
    borderColor:'red',
    borderRadius:10,
    overflow:'hidden',
    padding:10,
    gap:2,
  },
  theme : {
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical:8,
    alignItems:'center'
  },
});

export default ThemeSwitcher;
