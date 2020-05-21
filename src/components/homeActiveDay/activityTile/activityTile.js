import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  getGroupMembersString,
  getActivityParticipantsString,
} from '../../../utils';
import {colors, fonts} from '../../../constants';

const ActivityTile = ({activity, group}) => {
  const [hasThumbnail, setHasThumbnail] = useState(group && group.thumbnailURL);
  const userData = useSelector((state) =>
    state.user ? state.user.data : null,
  );
  const [userIsParticipant, setUserIsParticipant] = useState(
    activity.participants.some(
      (participant) => participant.uid === userData.uid,
    ),
  );
  const {navigate} = useNavigation();

  useEffect(() => {
    setUserIsParticipant(
      activity.participants.some(
        (participant) => participant.uid === userData.uid,
      ),
    );
  }, [userData, activity]);

  useEffect(() => {
    setHasThumbnail(group && group.thumbnailURL);
  }, [group]);

  const handleSwitchToggle = () => {
    setUserIsParticipant(!userIsParticipant);
  };

  const onTilePress = () => {
    navigate('Groups', {
      screen: 'GroupInfo',
      params: {groupUID: activity.group.uid},
      initial: false,
    });
  };

  if (!(activity && group)) return null;

  return (
    <TouchableOpacity style={styles.container} onPress={onTilePress}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>{group.name}</Text>
        <Text style={styles.members}>
          {getGroupMembersString(group, userData)}
        </Text>
        <Text style={styles.participants}>
          {getActivityParticipantsString(activity, userData, userIsParticipant)}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <View>
          {hasThumbnail ? (
            <Avatar rounded source={{uri: group.thumbnailURL}} />
          ) : null}
        </View>
        <Switch
          trackColor={{false: colors.darkGrey, true: colors.brightGreen}}
          thumbColor="white"
          ios_backgroundColor={colors.darkGrey}
          onValueChange={handleSwitchToggle}
          value={userIsParticipant}
          style={styles.switch}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 50,
    marginHorizontal: 25,
    marginVertical: 10,
    height: 130,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EBF0F3',
    shadowColor: 'black',
    backgroundColor: '#FFFFFF',
    shadowOpacity: 0.25,
    shadowOffset: {width: 1, height: 3},
    flexDirection: 'row',
  },
  textContainer: {
    flex: 2,
    paddingLeft: 23,
    paddingTop: 20,
  },
  header: {
    fontFamily: fonts.body_medium,
    fontSize: 16,
  },
  members: {
    color: colors.mediumGrey,
    fontSize: 13,
    paddingTop: 6,
    fontFamily: fonts.body_regular,
  },
  participants: {
    paddingTop: 10,
    fontSize: 13,
    fontFamily: fonts.body_regular,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  switch: {
    transform: [{scaleX: 0.7}, {scaleY: 0.7}],
    marginBottom: 14,
    marginRight: 10,
  },
});

export default ActivityTile;
