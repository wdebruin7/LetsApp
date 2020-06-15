import React, {useState} from 'react';
import {StyleSheet, View, FlatList, Dimensions} from 'react-native';
import {Divider} from 'react-native-elements';
import ActivityList from './activityList';
import ShowMoreActivities from './showMoreActivities';
import {getDisplayDate} from '../../../utils';
import TileHeader from '../../tileHeader';
import TileBody from '../../tileBody/tileBody';

const ActivityDay = ({activityDay, setActiveDate}) => {
  const activitiesHidden = activityDay.activities.length > 3;

  return (
    <View style={styles.container}>
      <TileHeader
        title={getDisplayDate(activityDay.date)}
        onPress={() => setActiveDate(activityDay.date)}
      />
      <TileBody>
        <FlatList
          data={activityDay.activities.slice(0, 3)}
          renderItem={({item}) => <ActivityList activity={item} />}
          keyExtractor={(item) => item.uid}
          ItemSeparatorComponent={() => <Divider />}
        />
        {activitiesHidden ? (
          <View>
            <Divider />
            <ShowMoreActivities
              numAdditionalActivities={2}
              date={activityDay.date}
            />
          </View>
        ) : null}
      </TileBody>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 20,
    marginHorizontal: 10,
  },
});

export default ActivityDay;
