import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions, Switch} from 'react-native';
import {Avatar} from 'react-native-elements';
import {useSession} from '../firebase';

const ActivityTileComponent = ({activity, group}) => {
  const [hasThumbnail, setHasThumbnail] = useState(group && group.thumbnailURL);
  const {user, userData} = useSession();
  const [userIsParticipant, setUserIsParticipant] = useState(
    activity.participants.some((participant) => participant.uid === user.uid),
  );

  useEffect(() => {
    setUserIsParticipant(
      activity.participants.some((participant) => participant.uid === user.uid),
    );
  }, [user, activity]);

  useEffect(() => {
    setHasThumbnail(group && group.thumbnailURL);
  }, [group]);

  const handleSwitchToggle = () => {
    setUserIsParticipant(!userIsParticipant);
  };

  const getGroupMembersString = () => {
    const otherMembers = group.members.filter(
      (member) => member.uid !== user.uid,
    );

    switch (otherMembers.length) {
      case 0:
        return 'You are the only member. Invite some friends!';
      case 1:
        return `You and ${otherMembers[0].name} are the only members.`;
      case 2:
        return `You, ${otherMembers[0].name}, and ${otherMembers[1].name}`;
      default:
        return 'You'
          .concat(otherMembers.slice(0, 1).map((member) => `, ${member.name}`))
          .concat(`+ ${otherMembers.length - 2} more`);
    }
  };

  const getActivityParticipantsString = () => {
    const participants = activity.participants
      .filter((participant) => participant.name !== userData.displayName)
      .map((participant) => participant.name.split(' ')[0]);

    const numParticipants = participants.length;

    switch (numParticipants) {
      case 0:
        if (userIsParticipant) return 'Nobody else is free... yet';
        else return 'Nobody is free... yet';
      case 1:
        return `${participants[0]} is free`;
      case 2:
        return `${participants[0]} and ${participants[1]} are free`;
      case 3:
        return `${participants[0]}, ${participants[1]}, and ${participants[2]} are free`;
      default:
        return participants[0]
          .concat(
            participants.slice(1, 2).map((participant) => `, ${participant}`),
          )
          .concat(`and ${numParticipants - 3} more are free`);
    }
  };

  if (!(activity && group)) return null;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>{group.name}</Text>
        <Text style={styles.members}>{getGroupMembersString()}</Text>
        <Text style={styles.participants}>
          {getActivityParticipantsString()}
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
    flex: 1,
    paddingLeft: 23,
    paddingTop: 20,
    width: '50%',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  members: {
    color: '#8D8D8D',
    fontSize: 13,
    paddingTop: 6,
    height: 32,
    width: '100%',
  },
  participants: {
    fontSize: 13,
  },
  rightContainer: {
    justifyContent: 'space-between',
  },
  switch: {
    transform: [{scaleX: 0.7}, {scaleY: 0.7}],
    marginBottom: 14,
    marginRight: 10,
  },
});

export default ActivityTileComponent;
