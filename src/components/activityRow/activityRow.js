import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Avatar} from 'react-native-elements';
import {getActivityActorsString, getActionString} from '../../utils';
import {fonts} from '../../constants';

const ActivityRow = ({groupedAction}) => {
  const actorsString = getActivityActorsString(groupedAction);
  const actionString = getActionString(groupedAction);
  const {users} = groupedAction;
  const firstUserNames = Object.values(users)[0].name.split(' ');
  const initials =
    firstUserNames.length > 1
      ? firstUserNames[0]
          .substring(0, 1)
          .toUpperCase()
          .concat(
            firstUserNames[firstUserNames.length - 1]
              .substring(0, 1)
              .toUpperCase(),
          )
      : firstUserNames[0].substring(0, 1).toUpperCase();

  function getTimeDifference() {
    const currentDateTime = new Date().getTime();
    const actionDateTime = groupedAction.date.getTime();

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = currentDateTime - actionDateTime;

    if (elapsed < msPerMinute) {
      return `${Math.round(elapsed / 1000)}s`;
    } else if (elapsed < msPerHour) {
      return `${Math.round(elapsed / msPerMinute)}m`;
    } else if (elapsed < msPerDay) {
      return `${Math.round(elapsed / msPerHour)}h`;
    } else if (elapsed < msPerMonth) {
      return `${Math.round(elapsed / msPerDay)}d`;
    } else if (elapsed < msPerYear) {
      return `${Math.round(elapsed / msPerMonth)}m`;
    } else {
      return `${Math.round(elapsed / msPerYear)}y`;
    }
  }

  return (
    <View style={styles.container}>
      {users.length > 1 ? (
        <Avatar rounded icon={{name: 'group', type: 'font-awesome'}} />
      ) : (
        <Avatar rounded title={initials} titleStyle={styles.initials} />
      )}
      <View>
        <Text>{actorsString}</Text>
        <Text>{actionString}</Text>
      </View>
      <Text>{getTimeDifference()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    borderTopColor: '#EBF0F3',
    borderBottomColor: '#EBF0F3',
  },
  initials: {
    fontFamily: fonts.body_regular,
  },
});

export default ActivityRow;
