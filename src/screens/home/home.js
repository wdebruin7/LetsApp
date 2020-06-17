import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Image} from 'react-native';
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
  const emptyStateImage = require('../../images/homeEmptyState.png');

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

  console.log(activities);

  return (
    <SafeAreaView style={styles.safeView}>
      <StatusBar barStyle="dark-content" />
      <AppHeader />
      <HomeList activityDays={activityDays} setActiveDate={setActiveDate} />
      {!activityDays && (
        <Image style={styles.emptyStateImage} source={emptyStateImage} />
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
  emptyStateImage: {
    width: 217,
    height: 223,
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default Home;
