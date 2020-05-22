import React, {useState} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {Icon, Divider} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import ActivityList from './activityList';
import ShowMoreActivities from './showMoreActivities';
import {getDisplayDate} from '../../../utils';
import {fonts} from '../../../constants';
import TileHeader from '../../tileHeader';
import TileBody from '../../tileBody/tileBody';

const ActivityDay = ({activityDay, setActiveDate}) => {
  const [showAll, setShowAll] = useState(false);
  const activitiesHidden = !showAll && activityDay.activities > 3;

  return (
    <View style={styles.container}>
      <TileHeader
        title={getDisplayDate(activityDay.date)}
        onPress={() => setActiveDate(activityDay.date)}
      />
      <TileBody>
        <FlatList
          data={
            showAll
              ? activityDay.activities
              : activityDay.activities.slice(0, 2)
          }
          renderItem={({item, index}) => <ActivityList activity={item} />}
          keyExtractor={(item) => item.uid}
          ItemSeparatorComponent={() => <Divider />}
        />
        {activitiesHidden ? (
          <ShowMoreActivities
            numAdditionalActivities={2}
            setShowAll={setShowAll}
          />
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
    flex: 1,
    width: Dimensions.get('window').width - 50,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 3, height: 3},
  },
  headerView: {
    backgroundColor: '#8AABDD',
    flex: 1,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fonts.body_medium,
  },
});

export default ActivityDay;
