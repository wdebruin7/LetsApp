import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import CalendarHeaderComponent from '../components/calendarHeaderComponent';
import DateHeaderComponent from '../components/dateHeaderComponent';

const ActivityDayScreen = () => {
  const {navigate} = useNavigation();
  const date = useNavigationParam('date');

  return (
    <SafeAreaView styles={styles.safeArea}>
      <CalendarHeaderComponent activeDate={date} />
      <DateHeaderComponent date={date} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default ActivityDayScreen;
