import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../lib/utils/SetTheme';
import { observer } from 'mobx-react-lite';
import selectionControl from '../../lib/control/SelectionControl'; 
import MasonryList from 'react-native-masonry-list';

const images = [
  { uri: '../../assets/images/image.jpg' },
  { uri: '../../assets/images/image2.jpg' },
  { uri: '../../assets/images/image3.jpg' },
  { uri: '../../assets/images/image4.jpg' },
  { uri: '../../assets/images/image5.jpg' },
  { uri: '../../assets/images/image6.jpg' },
  { uri: '../../assets/images/image7.jpg' },
  { uri: '../../assets/images/image8.jpg' },
];



const EventsScreen = observer(() => {
  const { currentTheme } = useTheme();
  const { getScreenProps } = selectionControl;


  return (
    <View style={[styles.container]}>
      <MasonryList
        images={images}
        columns={2}
        spacing={2}
        imageContainerStyle={styles.imageContainer}
      />
    </View>
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff',
  },
  imageContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default EventsScreen;




