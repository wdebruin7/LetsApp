import React from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import moment from 'moment';
import CalendarDateComponent from './calendarDateComponent';

const getCurrentMonthDates = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const currentMonthDates = [];

  while (date.getMonth() === today.getMonth()) {
    currentMonthDates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return currentMonthDates;
};

const CalendarHeaderComponent = () => {
  const today = new Date().setHours(0, 0, 0, 0);
  const month = moment(today).format('MMMM');
  const currentMonthDates = getCurrentMonthDates();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{month}</Text>
      <FlatList
        data={currentMonthDates}
        renderItem={({item}) => <CalendarDateComponent date={item} />}
        keyExtractor={(item) => `${item.getTime()}`}
        horizontal
        style={styles.list}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#D9E8FF',
    height: 107,
  },
  header: {
    paddingTop: 19,
    paddingLeft: 19,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 22,
  },
  list: {
    flex: 1,
    paddingHorizontal: 19,
  },
  contentContainerStyle: {
    alignItems: 'center',
  },
});

export default CalendarHeaderComponent;
