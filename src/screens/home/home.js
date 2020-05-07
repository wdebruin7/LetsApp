import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import {HomeList, AppHeader} from '../../components';

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
      <TouchableOpacity style={styles.addButton}>
        <Icon
          name="plus"
          type="entypo"
          color="#FFFFFF"
          size={45}
          iconStyle={styles.icon}
        />
      </TouchableOpacity>
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
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#0066FF',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  icon: {
    textAlign: 'center',
    height: 45,
    width: 45,
  },
});

export default Home;
