import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../constants/colors';
import {fonts} from '../../constants';

const Button = ({onPress, title, disabled, style, raised}) => {
  if (raised) {
    return (
      <TouchableHighlight
        disabled={disabled}
        onPress={onPress}
        style={
          disabled
            ? {...styles.highlightButton, ...styles.disabledHighlight, ...style}
            : {...styles.highlightButton, ...style}
        }>
        <Text style={{...styles.buttonText, ...styles.highlightText}}>
          {title}
        </Text>
      </TouchableHighlight>
    );
  }

  return (
    <TouchableOpacity
      style={{...styles.opacityButton, ...style}}
      disabled={disabled}
      onPress={onPress}>
      <Text
        style={
          disabled
            ? {
                ...styles.buttonText,
                ...styles.opacityText,
                ...styles.disabledOpacity,
              }
            : {...styles.buttonText, ...styles.opacityText}
        }>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  highlightButton: {
    marginTop: 10,
    borderRadius: 5,
    width: 150,
    height: 53,
    backgroundColor: Colors.primaryBlue,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  opacityButton: {
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.body_bold,
  },
  highlightText: {
    color: 'white',
  },
  opacityText: {
    color: '#0066FF',
  },
  disabledHighlight: {
    opacity: 0.3,
  },
  disabledOpacity: {
    color: 'gray',
  },
});

export default Button;
