import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';

const ActivityTileComponent = ({activity, group}) => {
  if (!(activity && group)) return null;

  return (
    <View style={styles.container}>
      <Text>Test</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 50,
    marginHorizontal: 25,
    marginVertical: 10,
    height: 130,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EBF0F3',
    shadowColor: 'black',
    backgroundColor: '#FFFFFF',
    shadowOpacity: 0.25,
    shadowOffset: {width: 1, height: 3},
  },
});

export default ActivityTileComponent;
