import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../constants/colors';
import {fonts} from '../../constants';

const Button = ({
  onPress,
  title,
  disabled,
  style,
  raised,
  icon,
  color,
  textColor,
  bold,
}) => {
  if (raised) {
    return (
      <TouchableHighlight
        disabled={disabled}
        onPress={onPress}
        style={
          disabled
            ? {
                ...styles.highlightButton,
                ...styles.disabledHighlight,
                ...style,
                ...(color ? {backgroundColor: color} : {}),
              }
            : {
                ...styles.highlightButton,
                ...style,
                ...(color ? {backgroundColor: color} : {}),
              }
        }>
        {icon || (
          <Text
            style={{
              ...styles.buttonText,
              ...styles.highlightText,
              ...(bold ? styles.buttonTextBold : {}),
              ...(textColor ? {color: textColor} : {}),
            }}>
            {title}
          </Text>
        )}
      </TouchableHighlight>
    );
  }

  return (
    <TouchableOpacity
      style={{
        ...styles.opacityButton,
        ...style,
        ...(color ? {backgroundColor: color} : {}),
      }}
      disabled={disabled}
      onPress={onPress}>
      {icon || (
        <Text
          style={
            disabled
              ? {
                  ...styles.buttonText,
                  ...styles.opacityText,
                  ...styles.disabledOpacity,
                  ...(bold ? styles.buttonTextBold : {}),
                  ...(textColor ? {color: textColor} : {}),
                }
              : {
                  ...styles.buttonText,
                  ...styles.opacityText,
                  ...(bold ? styles.buttonTextBold : {}),
                  ...(textColor ? {color: textColor} : {}),
                }
          }>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  highlightButton: {
    marginVertical: 10,
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
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.body_regular,
  },
  buttonTextBold: {
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
