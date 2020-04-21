import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';

const getDayChar = (day) => {
  const dayChars = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return dayChars[day];
};

const CalendarDateComponent = ({date, isActive}) => {
  const {navigate} = useNavigation();

  const onPress = () => {
    navigate('ActivityDay', {date});
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        isActive ? [styles.container, styles.activeDate] : styles.container
      }>
      <Text style={styles.text}>{getDayChar(date.getDay())}</Text>
      <Text style={styles.textBold}>{date.getDate()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 5,
    width: 30,
    paddingTop: 5,
    paddingBottom: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  activeDate: {
    backgroundColor: '#8AABDD',
  },
  text: {
    fontSize: 14,
  },

  textBold: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

function areEqual(prevProps, nextProps) {
  return (
    prevProps.date.getTime() === nextProps.date.getTime() &&
    prevProps.isActive === nextProps.isActive
  );
}

export default React.memo(CalendarDateComponent, areEqual);
