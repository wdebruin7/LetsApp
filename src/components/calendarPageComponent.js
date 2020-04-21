import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import CalendarDateComponent from './calendarDateComponent';

const getDates = (weekStart) => {
  const dates = [];
  const date = new Date(weekStart);

  while (dates.length < 8) {
    dates.push(new Date(date).getTime());
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

const getMonthName = (monthNum) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return monthNames[monthNum];
};

const CalendarPageComponent = ({activeDate, weekStart}) => {
  const [dates, setDates] = useState(getDates(weekStart));
  const [weekRollsOver, setWeekRollsOver] = useState(
    new Date(dates[0]).getMonth() !== new Date(dates[7]).getMonth(),
  );
  const startMonth = getMonthName(new Date(dates[0]).getMonth());
  const endMonth = getMonthName(new Date(dates[7]).getMonth());

  const isActiveDate = (date) => {
    return activeDate && new Date(date).getTime() === activeDate.getTime();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{startMonth}</Text>
        {weekRollsOver ? <Text style={styles.header}>{endMonth}</Text> : null}
      </View>
      <View style={styles.listContainer}>
        {dates.map((date) => (
          <CalendarDateComponent
            date={new Date(date)}
            isActive={isActiveDate(date)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
  },
  headerContainer: {
    flexDirection: 'row',
  },
  header: {
    paddingLeft: 19,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 22,
  },
  listContainer: {
    height: 60,
    flexDirection: 'row',
  },
  list: {
    paddingHorizontal: 19,
  },
  contentContainerStyle: {
    alignItems: 'flex-end',
  },
});

export default CalendarPageComponent;
