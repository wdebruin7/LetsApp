import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import ActivityTileComponent from './activityTileComponent';
import DateHeaderComponent from './dateHeaderComponent';

const HomeActiveDayComponent = ({date, activities, setActiveDate}) => {
  const groups = useSelector((state) => state.groups || {});

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

export default HomeActiveDayComponent;
