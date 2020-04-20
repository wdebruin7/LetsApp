import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';

const getDayChar = (day) => {
  const dayChars = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return dayChars[day];
};

const CalendarDateComponent = ({date, isActive}) => {
  const {navigate} = useNavigation();
  const onPress = () => {};

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{getDayChar(date.getDay())}</Text>
      <Text style={styles.text}>{date.getDate()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 12,
    height: 35,
  },
  text: {
    fontSize: 15,
  },
});

export default CalendarDateComponent;
