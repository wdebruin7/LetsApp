import React, {useState, useEffect} from 'react';
import {TouchableOpacity, StyleSheet, View, Text, Switch} from 'react-native';
import {Avatar} from 'react-native-elements';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {toggleUserIsParticipant} from '../firebase/firestore';

const getAvatars = (participants) => {
  const avatars = [];
  participants.slice(0, 2).forEach((participant) => {
    const initials = participant.name
      ? participant.name
          .slice(0, 1)
          .concat(participant.name.split(' ')[1].slice(0, 1))
      : '?';
    const avatar = <Avatar rounded title={initials} size={25} />;
    avatars.push(avatar);
  });
  return avatars;
};

const ActivityListComponent = ({activity, isLastElement}) => {
  const avatars = getAvatars(activity.participants);
  const userData = useSelector((state) =>
    state.user ? state.user.data : null,
  );
  const [isParticipant, setIsParticipant] = useState(
    userData &&
      activity &&
      activity.participants.some((elem) => elem.uid === userData.uid),
  );

  const toggleSwitch = () => {
    toggleUserIsParticipant(userData, activity);
  };

  useEffect(() => {
    if (userData && activity) {
      setIsParticipant(
        activity.participants.some((elem) => elem.uid === userData.uid),
      );
    }
  }, [activity, userData]);

  return (
    <TouchableOpacity
      style={isLastElement ? styles.touchableLastActivity : styles.touchable}>
      <View style={styles.container}>
        <View style={styles.activityInfoView}>
          <View style={styles.activityInfoElement}>
            <AntIcon name="staro" />
          </View>
          <Text style={styles.activityInfoElement}>{activity.groupName}</Text>
          {avatars.length > 0 ? (
            <View style={styles.activityInfoElement}>{avatars[0]}</View>
          ) : null}
          {avatars.length > 1 ? (
            <View style={styles.activityInfoElement}>{avatars[0]}</View>
          ) : null}
          {activity.participants.length > 2 ? (
            <Text style={styles.activityInfoElement}>
              +{activity.participants.length - 2}
            </Text>
          ) : null}
        </View>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isParticipant ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isParticipant}
          style={styles.switch}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    height: 34,
    backgroundColor: '#F5F5F5',
  },
  touchableLastActivity: {
    flex: 1,
    height: 34,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  activityInfoView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 7,
  },
  activityInfoElement: {
    paddingLeft: 7,
  },
  switch: {
    transform: [{scaleX: 0.6}, {scaleY: 0.6}],
  },
});

export default ActivityListComponent;
