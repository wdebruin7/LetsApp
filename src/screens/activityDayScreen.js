import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import CalendarHeaderComponent from '../components/calendarHeaderComponent';

const ActivityDayScreen = () => {
  const {navigate} = useNavigation();
  const date = useNavigationParam('date');

  return (
    <SafeAreaView>
      <CalendarHeaderComponent activeDate={date} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ActivityDayScreen;
