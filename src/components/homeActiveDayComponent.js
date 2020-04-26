import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import ActivityTileComponent from './activityTileComponent';
import {useGroups} from '../firebase';
import DateHeaderComponent from './dateHeaderComponent';

const HomeActiveDayComponent = ({date, activities, setActiveDate}) => {
  const groups = useGroups();

  return (
    <View>
      <DateHeaderComponent date={date} setActiveDate={setActiveDate} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default HomeActiveDayComponent;
