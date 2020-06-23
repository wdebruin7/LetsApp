import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import ActivityDay from './activityDay';

const HomeList = ({activityDays, setActiveDate}) => {
  return (
    <View style={styles.container}>
      {activityDays.length > 0 ? (
        <FlatList
          data={activityDays}
          renderItem={({item}) => (
            <ActivityDay activityDay={item} setActiveDate={setActiveDate} />
          )}
          keyExtractor={(item) => item.date.getTime().toString()}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default HomeList;
