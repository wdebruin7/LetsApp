import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import CalendarHeaderComponent from '../components/calendarHeaderComponent';
import DateHeaderComponent from '../components/dateHeaderComponent';
import ActivityTileComponent from '../components/activityTileComponent';
import {useActivities} from '../firebase';

const ActivityDayScreen = () => {
  const {navigate} = useNavigation();
  const date = useNavigationParam('date');
  const activityDays = useActivities();
  const [activities, setActivites] = useState([]);

  useEffect(() => {
    const dateNext = new Date(date);
    dateNext.setDate(date.getDate() + 1);
  }, [activityDays, date]);

  return (
    <SafeAreaView styles={styles.safeArea}>
      <CalendarHeaderComponent activeDate={date} />
      <DateHeaderComponent date={date} />
      {activityDays.length > 0 ? (
        <ActivityTileComponent activity={activityDays[0].activities} />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default ActivityDayScreen;
