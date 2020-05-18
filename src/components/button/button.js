import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import Colors from '../../constants/colors';

const Button = ({onPress, buttonText, disabled, style}) => {
  return (
    <TouchableHighlight
      style={styles.container}
      disabled={disabled}
      onPress={() => onPress()}>
      <View
        style={
          !disabled
            ? {...styles.button, ...style}
            : {...styles.button, ...styles.disabled, ...style}
        }>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderRadius: 5,
  },
  button: {
    width: 150,
    height: 53,
    backgroundColor: Colors.primaryBlue,
    borderRadius: 5,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'AppleSDGothicNeo-Regular',
    color: 'white',
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.3,
  },
});

export default Button;
