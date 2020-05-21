import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

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
    backgroundColor: '#8AABDD',
    height: 38,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {color: '#FFFFFF'},
});

export default TileHeader;
