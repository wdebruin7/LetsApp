import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';

const ActivityTileComponent = ({activity}) => {
  console.log(activity);
  return (
    <View style={styles.container}>
      <Text>Test</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 50,
    height: 130,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EBF0F3',
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 2, height: 3},
  },
});

export default ActivityTileComponent;
