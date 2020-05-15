import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {getDisplayDate} from '../../../utils';

const DateHeader = ({date, setActiveDate}) => {
  const onPressX = () => {
    setActiveDate(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{getDisplayDate(date)}</Text>
      <TouchableOpacity onPress={onPressX}>
        <Icon
          type="antdesign"
          name="close"
          color="#FFFFFF"
          iconStyle={styles.icon}
          size={24}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#8AABDD',
    height: 40,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 4},
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    paddingHorizontal: 7,
    fontWeight: 'bold',
  },
  icon: {
    paddingHorizontal: 7,
  },
});

export default DateHeader;
