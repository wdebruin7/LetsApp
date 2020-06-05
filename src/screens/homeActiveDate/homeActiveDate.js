import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation, useRoute, StackActions} from '@react-navigation/native';
import {HomeActiveDay, AppHeader, AddActivityButton} from '../../components';
import {getActivityDay} from '../../utils';

const HomeActiveDate = () => {
  const navigation = useNavigation();
  const allActivities = useSelector((state) => state.activities || {});
  const {activeDateTime} = useRoute().params || {};
  const [activeDate, setActiveDate] = useState(
    activeDateTime ? new Date(activeDateTime) : null,
  );
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    setActivities(getActivityDay(allActivities, activeDate).activities);
  }, [activeDate, allActivities]);

  useEffect(() => {
    if (!activeDate) navigation.dispatch(StackActions.popToTop());
  }, [activeDate, navigation]);

  return (
    <SafeAreaView style={styles.safeView}>
      <AppHeader />
      <HomeActiveDay
        activities={activities}
        date={activeDate}
        setActiveDate={setActiveDate}
      />
      <AddActivityButton dateTime={activeDateTime} />
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
