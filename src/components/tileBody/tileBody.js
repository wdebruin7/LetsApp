import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';

const TileBody = ({style, children}) => {
  return <View style={{...styles.container, ...style}}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 50,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 3, height: 3},
  },
});

export default TileBody;
