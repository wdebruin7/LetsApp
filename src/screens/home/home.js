import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {HomeList, AppHeader} from '../../components';
import {getActivityDays} from '../../utils';

const Home = () => {
  const activities = useSelector((state) => state.activities);
  const {navigate} = useNavigation();
  const isFocused = useIsFocused();
  const [activeDate, setActiveDate] = useState(null);
  const [activityDays, setActivityDays] = useState([]);

  useEffect(() => {
    setActivityDays(getActivityDays(activities));
  }, [activities]);

  useEffect(() => {
    if (activeDate) {
      navigate('HomeActiveDate', {activeDateTime: activeDate.getTime()});
    }
  }, [activeDate, navigate]);

  useEffect(() => {
    if (isFocused) setActiveDate(null);
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.safeView}>
      <StatusBar barStyle="dark-content" />
      <AppHeader />
      <HomeList activityDays={activityDays} setActiveDate={setActiveDate} />
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
