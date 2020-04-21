import React, {useState} from 'react';
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

const CalendarHeaderComponent = ({activeDate}) => {
  const [month, setMonth] = useState(moment().format('MMMM'));
  const [currentMonthDates, setCurrentMonthDates] = useState(
    getCurrentMonthDates(),
  );

  const isActiveDate = (date) => {
    return activeDate && date.getTime() === activeDate.getTime();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{month}</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={currentMonthDates}
          renderItem={({item}) => (
            <CalendarDateComponent date={item} isActive={isActiveDate(item)} />
          )}
          keyExtractor={(item) => `${item.getTime()}`}
          horizontal
          style={styles.list}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#D9E8FF',
    height: 100,
    justifyContent: 'flex-end',
  },
  header: {
    paddingLeft: 19,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 22,
  },
  listContainer: {
    height: 60,
  },
  list: {
    paddingHorizontal: 19,
  },
  contentContainerStyle: {
    alignItems: 'flex-end',
  },
});

export default CalendarHeaderComponent;
