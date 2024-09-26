import React, { useContext } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import selectionControl from '../../lib/control/SelectionControl';

const OnlineSearchScreen = observer(() => {

  return (
    <View style={styles.container}>
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
