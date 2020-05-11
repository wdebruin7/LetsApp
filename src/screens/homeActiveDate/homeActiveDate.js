import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation, useRoute, StackActions} from '@react-navigation/native';
import {HomeActiveDay, AppHeader} from '../../components';

const HomeActiveDate = () => {
  const navigation = useNavigation();
  const activityDays = useSelector((state) => state.activities || []);
  const {activeDateTime} = useRoute().params || {};
  const [activeDate, setActiveDate] = useState(
    activeDateTime ? new Date(activeDateTime) : null,
  );

  useEffect(() => {
    if (!activeDate) navigation.dispatch(StackActions.popToTop());
  }, [activeDate, navigation]);

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
      <AppHeader />
      <HomeActiveDay
        activities={getActivitiesForActiveDate()}
        date={activeDate}
        setActiveDate={setActiveDate}
      />
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

export default HomeActiveDate;
