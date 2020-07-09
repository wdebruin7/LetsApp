import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {getActivityActorsString, getActionString} from '../../utils';
import {fonts, colors} from '../../constants';

const ActivityRow = ({groupedAction}) => {
  const actorsString = getActivityActorsString(groupedAction);
  const actionString = getActionString(groupedAction);
  const users = Object.values(groupedAction.users);
  const firstUserNames = users[0].name.split(' ');
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
  const {navigate} = useNavigation();

  console.log(groupedAction);

  const getTimeDifference = () => {
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
  };

  const onPress = () => {
    navigate('Groups', {
      screen: 'GroupInfo',
      params: {groupUID: groupedAction.group.uid},
      initial: false,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {users.length > 1 ? (
        <Avatar
          rounded
          icon={{name: 'group', type: 'font-awesome'}}
          containerStyle={styles.avatar}
        />
      ) : (
        <Avatar
          rounded
          title={initials}
          titleStyle={styles.initials}
          containerStyle={styles.avatar}
        />
      )}
      <View style={styles.textContainer}>
        <View style={styles.leftTextContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.actorsText}>
            {actorsString}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.actionText}>
            {actionString}
          </Text>
        </View>
        <Text style={styles.timeDifferenceText}>{getTimeDifference()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    borderBottomColor: '#EBF0F3',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 48,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 11,
    marginRight: 17,
  },
  leftTextContainer: {
    justifyContent: 'space-between',
  },
  actorsText: {
    fontFamily: fonts.body_semi_bold,
  },
  actionText: {
    paddingRight: 20,
    fontFamily: fonts.body_regular,
    color: colors.darkGrey,
  },
  avatar: {
    marginLeft: 23,
  },
  initials: {
    fontFamily: fonts.body_regular,
  },
  timeDifferenceText: {
    color: '#A6A6A6',
    fontFamily: fonts.body_regular,
    fontSize: 13,
    position: 'absolute',
    right: 0,
  },
});

export default ActivityRow;
