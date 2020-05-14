import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import Colors from '../../constants/colors';

const TextBox = ({
  onChangeText,
  style,
  placeholder,
  value,
  notInteractive,
  onFocus,
  onBlur,
  placeholderTextColor,
  keyboardType,
}) => {
  return (
    <TextInput
      onChangeText={(e) => onChangeText(e)}
      editable={!notInteractive}
      style={
        !notInteractive
          ? {...styles.textBox, ...style}
          : {...styles.textBox, ...styles.notInteractive, ...style}
      }
      placeholder={placeholder}
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholderTextColor={placeholderTextColor}
      keyboardType={keyboardType}
    />
  );
};

const styles = StyleSheet.create({
  textBox: {
    fontSize: 13,
    height: 36,
    width: 220,
    borderWidth: 1,
    color: 'black',
    borderColor: Colors.lightGrey,
    borderRadius: 25,
    backgroundColor: Colors.lightGrey,
    paddingLeft: 20,
    marginTop: 5,
    marginBottom: 10,
    justifyContent: 'center',
  },
  notInteractive: {
    opacity: 0.3,
  },
});

export default TextBox;
