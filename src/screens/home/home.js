import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {
  CalendarHeader,
  HomeList,
  HomeActiveDay,
  AppHeader,
} from '../../components';

const Home = () => {
  const activityDays = useSelector((state) => state.activities || []);
  const [activeDate, setActiveDate] = useState(null);

  const getActivitiesForActiveDate = () => {
    const activeActivityDays = activityDays.filter((elem) => {
      const elemDateMidnight = new Date(elem.date);
      elemDateMidnight.setHours(0, 0, 0, 0);
      const activeDateMidnight = new Date(activeDate);
      activeDateMidnight.setHours(0, 0, 0, 0);
      return elemDateMidnight.getTime() === activeDateMidnight.getTime();
    });

    return activeActivityDays.length > 0
      ? activeActivityDays[0].activities
      : [];
  };

  if (session.user && !session.user.displayName) {
    navigate('Account');
  }

  return (
    <SafeAreaView style={styles.safeView}>
      <AppHeader />
      <CalendarHeader activeDate={activeDate} setActiveDate={setActiveDate} />
      {activeDate ? (
        <HomeActiveDay
          activities={getActivitiesForActiveDate()}
          date={activeDate}
          setActiveDate={setActiveDate}
        />
      ) : (
        <HomeList activities={activityDays} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#FCFEFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
