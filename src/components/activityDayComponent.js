import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import ActivityListComponent from './activityListComponent';
import ShowMoreActivitiesComponent from './showMoreActivitiesComponent';

const getDayOfWeek = (date) => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const today = new Date();
  const tomorrow = new Date(today + 1);

  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return 'Today';
  }

  if (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  ) {
    return 'Tomorrow';
  }

  return days[date.getDay()];
};

const getMonth = (date) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return months[date.getMonth()];
};

const getDisplayDate = (date) =>
  `${getDayOfWeek(date)}, ${getMonth(date)} ${date.getDate()}`;

const ActivityDayComponent = ({activityDay}) => {
  const [showAll, setShowAll] = useState(false);
  const activitiesHidden = !showAll && activityDay.activities > 3;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.headerView}>
        <Text style={styles.headerText}>
          {getDisplayDate(activityDay.date)}
        </Text>
        <TouchableOpacity>
          <Icon name="plus" type="entypo" color="#FFFFFF" />
        </TouchableOpacity>
      </TouchableOpacity>
      <FlatList
        data={
          showAll ? activityDay.activities : activityDay.activities.slice(0, 2)
        }
        renderItem={({item, index}) => (
          <ActivityListComponent
            activity={item}
            isLastElement={
              index === activityDay.activities.length - 1 ||
              (activitiesHidden && index === 2)
            }
          />
        )}
        keyExtractor={(item) => item.uid}
      />
      {activitiesHidden ? (
        <ShowMoreActivitiesComponent
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
    width: 300,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 3, height: 3},
  },
  headerView: {
    backgroundColor: '#8AABDD',
    flex: 1,
    height: 38,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  headerText: {
    color: '#FFFFFF',
  },
});

export default ActivityDayComponent;
