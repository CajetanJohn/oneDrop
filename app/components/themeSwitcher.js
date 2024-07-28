import React from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native';
import { useTheme } from '../utils/SetTheme';




const ThemeSwitcher = () => {
  const { theme, setTheme, currentTheme } = useTheme();

  const handleSwitchChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={styles.switchLabel}>Select Theme:</Text>
      <View style={styles.switchRow}>
        <Switch
          value={theme === 'light'}
          onValueChange={(value) => value && handleSwitchChange('light')}
        />
        <Text>Light</Text>
      </View>
      <View style={styles.switchRow}>
        <Switch
          value={theme === 'dark'}
          onValueChange={(value) => value && handleSwitchChange('dark')}
        />
        <Text>Dark</Text>
      </View>
      <View style={styles.switchRow}>
        <Switch
          value={theme === 'custom'}
          onValueChange={(value) => value && handleSwitchChange('custom')}
        />
        <Text>Custom</Text>
      </View>
      <View style={styles.switchRow}>
        <Switch
          value={theme === 'system'}
          onValueChange={(value) => value && handleSwitchChange('system')}
        />
        <Text>System Default</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    padding: 20,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  switchLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ThemeSwitcher;
