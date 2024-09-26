import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import selectionControl from '../../lib/control/SelectionControl';

// Define the HighlightedText component
const HighlightedText = ({ text, highlight, highlightStyle }) => {
  if (!highlight) return <Text>{text}</Text>;

  // Split the text into parts and highlight matching parts
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

  return (
    <Text>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <Text key={index} style={highlightStyle}>
            {part}
          </Text>
        ) : (
          part
        )
      )}
    </Text>
  );
};

const LocalSearchScreen = observer(() => {
  return (
    <View style={styles.container}>
      <FlatList
        data={selectionControl.filteredResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            {/* Highlight the matched parts of the text */}
            <HighlightedText
              text={item}
              highlight={selectionControl.getSearchText}
              highlightStyle={styles.highlight}
            />
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No local results found</Text>}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    padding: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  highlight: {
    backgroundColor: 'yellow',
    color: 'black',
    fontWeight: 'bold',
  },
  empty: {
    padding: 20,
    textAlign: 'center',
    color: 'grey',
  },
});

export default LocalSearchScreen;
