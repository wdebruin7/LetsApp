import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import Colors from '../../constants/colors';

const Button = ({onPress, buttonText, notInteractive, width}) => {
  return (
    <TouchableHighlight
      style={styles.container}
      disabled={notInteractive}
      onPress={() => onPress()}>
      <View
        style={
          !notInteractive
            ? {...styles.button, width}
            : {...styles.button, width, ...styles.notInteractive}
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
  notInteractive: {
    opacity: 0.3,
  },
});

export default Button;
