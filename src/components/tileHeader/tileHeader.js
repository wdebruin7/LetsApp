import React from 'react';
import {StyleSheet, TouchableOpacity, Text, Dimensions} from 'react-native';
import {fonts} from '../../constants';

const TileHeader = ({
  style,
  title,
  titleStyle,
  rightComponent,
  onPress,
  disabled,
}) => {
  if (typeof title !== 'string') {
    throw new Error('Title must be of type string');
  }

  return (
    <TouchableOpacity
      style={{...styles.container, ...style}}
      disabled={disabled}
      onPress={onPress}>
      <Text style={{...styles.title, ...titleStyle}}>{title}</Text>
      {rightComponent || null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 39,
    width: Dimensions.get('window').width - 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#8AABDD',
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 3, height: 3},
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.body_semi_bold,
    color: '#FFFFFF',
  },
});

export default TileHeader;
