// LocalSearchScreen.js
import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useTheme } from '../../lib/utils/SetTheme';
import selectionControl from '../../lib/control/SelectionControl';
import SearchItem from '../../components/SearchItem';

const LocalSearchScreen = observer(() => {
  const { currentTheme } = useTheme();

  // Function to handle search item press
  const handleItemPress = (item) => {
    console.log('Item clicked:', item);
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <FlatList
        data={selectionControl.filteredResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <SearchItem
            item={item}
            onPress={handleItemPress}
          />
        )}
        ListEmptyComponent={<Text style={[styles.empty, { color: currentTheme.textColor }]}>No local results found</Text>}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  empty: {
    padding: 20,
    textAlign: 'center',
  },
});

export default LocalSearchScreen;
