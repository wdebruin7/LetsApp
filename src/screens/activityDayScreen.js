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
  console.log(activities);

  useEffect(() => {
    setActivites(
      activityDays.filter((activityDay) => {
        const c1 = new Date(date);
        c1.setHours(0, 0, 0, 0);
        const c2 = new Date(activityDay.date);
        c2.setHours(0, 0, 0, 0);
        return c1.getTime() === c2.getTime();
      })[0],
    );
  }, [activityDays, date]);

  return (
    <SafeAreaView styles={styles.safeArea}>
      <CalendarHeaderComponent activeDate={date} />
      <DateHeaderComponent date={date} />
      {activities ? <ActivityTileComponent activity={activities[0]} /> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default ActivityDayScreen;
