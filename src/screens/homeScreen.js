import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import CalendarHeaderComponent from '../components/calendarHeaderComponent';
import HomeListComponent from '../components/homeListComponent';
import HomeActiveDayComponent from '../components/homeActiveDayComponent';

const HomeScreen = () => {
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

  return (
    <SafeAreaView style={styles.safeView}>
      <CalendarHeaderComponent
        activeDate={activeDate}
        setActiveDate={setActiveDate}
      />
      {activeDate ? (
        <HomeActiveDayComponent
          activities={getActivitiesForActiveDate()}
          date={activeDate}
          setActiveDate={setActiveDate}
        />
      ) : (
        <HomeListComponent activities={activityDays} />
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

export default HomeScreen;
