import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import CalendarHeaderComponent from '../components/calendarHeaderComponent';
import DateHeaderComponent from '../components/dateHeaderComponent';
import ActivityTileComponent from '../components/activityTileComponent';
import {useActivities, useGroups} from '../firebase';

const ActivityDayScreen = () => {
  const {navigate} = useNavigation();
  const date = useNavigationParam('date');
  const activityDays = useActivities();
  const groups = useGroups();
  const [activities, setActivites] = useState([]);

  useEffect(() => {
    const activityDay = activityDays.filter((activityDay) => {
      const c1 = new Date(date);
      c1.setHours(0, 0, 0, 0);
      const c2 = new Date(activityDay.date);
      c2.setHours(0, 0, 0, 0);
      return c1.getTime() === c2.getTime();
    })[0];

    setActivites(activityDay ? activityDay.activities : []);
  }, [activityDays, date]);

  return (
    <SafeAreaView styles={styles.safeArea}>
      <CalendarHeaderComponent activeDate={date} />
      <DateHeaderComponent date={date} />
      <FlatList
        data={activities}
        renderItem={({item}) => (
          <ActivityTileComponent
            activity={item}
            group={groups[item.groupDocumentID]}
          />
        )}
        keyExtractor={(item) => item.id}
        style={styles.list}
        extraData={groups}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default ActivityDayScreen;
