import React, { useContext } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import selectionControl from '../../lib/control/SelectionControl';
import { useTheme } from '../../lib/utils/SetTheme';

const OnlineSearchScreen = observer(() => {
  const {currentTheme} = useTheme()

  return (
    <View style={[styles.container, {backgroundColor:currentTheme.background}]}>
      <FlatList
        data={selectionControl.filteredResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        ListEmptyComponent={<Text style={styles.empty}>No online results found</Text>}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor:'transparent'
  },
  item: {
    padding: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  empty: {
    padding: 20,
    textAlign: 'center',
    color: 'grey',
  },
});

export default OnlineSearchScreen;
