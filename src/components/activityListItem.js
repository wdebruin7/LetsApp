import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, View, Text, Switch} from 'react-native';
import {Avatar} from 'react-native-elements';
import AntIcon from 'react-native-vector-icons/AntDesign';

const getAvatars = (participants) => {
  const avatars = [];
  participants.slice(0, 2).forEach((participant) => {
    const initials = participant.name
      .slice(0, 1)
      .concat(participant.name.split(' ')[1].slice(0, 1));
    const avatar = <Avatar rounded title={initials} />;
    avatars.push(avatar);
  });
  return avatars;
};

const ActivityListIem = ({activity}) => {
  console.log(activity);
  const avatars = getAvatars(activity.participants);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(!isEnabled);

  return (
    <TouchableOpacity style={styles.touchable}>
      <View style={styles.container}>
        <AntIcon name="staro" />
        <Text>{activity.groupName}</Text>
        {avatars.length > 0 ? avatars[0] : null}
        {avatars.length > 1 ? avatars[1] : null}
        {activity.participants.length > 2 ? (
          <Text>+{activity.participants.length - 2}</Text>
        ) : null}
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={styles.switch}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    padding: 7,
    width: 325,
    height: 34,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignContent: 'center',
  },
  switch: {
    alignSelf: 'flex-end',
  },
});

export default ActivityListIem;
