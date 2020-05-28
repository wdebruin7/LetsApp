import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Divider} from 'react-native-elements';
import ActivityList from './activityList';
import ShowMoreActivities from './showMoreActivities';
import {getDisplayDate} from '../../../utils';
import {fonts} from '../../../constants';

const ActivityDay = ({activityDay, setActiveDate}) => {
  const [showAll, setShowAll] = useState(false);
  const activitiesHidden = !showAll && activityDay.activities > 3;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.headerView}
        onPress={() => setActiveDate(activityDay.date)}>
        <Text style={styles.headerText}>
          {getDisplayDate(activityDay.date)}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={
          showAll ? activityDay.activities : activityDay.activities.slice(0, 2)
        }
        renderItem={({item, index}) => (
          <ActivityList
            activity={item}
            isLastElement={
              index === activityDay.activities.length - 1 ||
              (activitiesHidden && index === 2)
            }
          />
        )}
        keyExtractor={(item) => item.uid}
        ItemSeparatorComponent={() => <Divider />}
      />
      {activitiesHidden ? (
        <ShowMoreActivities
          numAdditionalActivities={2}
          setShowAll={setShowAll}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
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
