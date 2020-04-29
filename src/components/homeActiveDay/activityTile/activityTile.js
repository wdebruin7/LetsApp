import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions, Switch} from 'react-native';
import {Avatar} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {
  getGroupMembersString,
  getActivityParticipantsString,
} from '../../../utils';

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

  if (!(activity && group)) return null;

  return (
    <View style={styles.container}>
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
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={userIsParticipant ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleSwitchToggle}
          value={userIsParticipant}
          style={styles.switch}
        />
      </View>
    </View>
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
    fontWeight: 'bold',
    fontSize: 16,
  },
  members: {
    color: '#8D8D8D',
    fontSize: 13,
    paddingTop: 6,
  },
  participants: {
    paddingTop: 6,
    fontSize: 13,
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
