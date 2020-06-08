import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import ActivityTile from './activityTile';
import DateHeader from './dateHeader';

const HomeActiveDay = ({date, activities, setActiveDate}) => {
  const groups = useSelector((state) => state.groups || {});
  console.log(activities);

  return (
    <View>
      <DateHeader date={date} setActiveDate={setActiveDate} />
      <FlatList
        data={activities}
        renderItem={({item}) => (
          <ActivityTile activity={item} group={groups[item.group.uid]} />
        )}
        keyExtractor={(item) => item.uid}
        style={styles.list}
        extraData={groups}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default HomeActiveDay;
