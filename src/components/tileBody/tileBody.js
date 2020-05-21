import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';

const TileBody = ({style, children}) => {
  return <View style={{...styles.container, ...style}}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 50,
    backgroundColor: '#F5F5F5',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 3, height: 3},
  },
});

export default TileBody;
