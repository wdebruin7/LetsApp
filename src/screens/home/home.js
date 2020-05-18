import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {HomeList, AppHeader, AddActivityButton} from '../../components';

const Home = () => {
  const activityDays = useSelector((state) => state.activities || []);
  const {navigate} = useNavigation();
  const isFocused = useIsFocused();
  const [activeDate, setActiveDate] = useState(null);

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
      <AppHeader />
      <HomeList activities={activityDays} setActiveDate={setActiveDate} />
      <AddActivityButton />
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
