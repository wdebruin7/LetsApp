import React, {useState, useEffect} from 'react';
import {TouchableOpacity, StyleSheet, View, Text, Switch} from 'react-native';
import {Avatar} from 'react-native-elements';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {toggleUserIsParticipant} from '../../../../firebase';
import {fonts, colors} from '../../../../constants';

const ActivityList = ({activity}) => {
  const userData = useSelector((state) => state.user.data);
  const [isParticipant, setIsParticipant] = useState(
    userData &&
      activity &&
      activity.participants.some((elem) => elem.uid === userData.uid),
  );
  const {navigate} = useNavigation();

  const onPress = () => {
    navigate('Groups', {
      screen: 'GroupInfo',
      params: {groupUID: activity.group.uid},
      initial: false,
    });
  };

  const toggleSwitch = () => {
    if (!userData) return;
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
    <TouchableOpacity style={styles.touchable} onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.activityInfoView}>
          <View style={styles.activityInfoElement}>
            <AntIcon name="staro" />
          </View>
          <Text style={styles.activityInfoElement}>{activity.group.name}</Text>
          {activity.participants.slice(0, 2).map((participant) => {
            const initials = participant.name
              .split(' ')
              .map((e) => e[0])
              .join('');
            return (
              <Avatar
                rounded
                size={28}
                title={initials}
                containerStyle={styles.activityInfoElement}
              />
            );
          })}
          {activity.participants.length > 2 ? (
            <Text
              style={{
                ...styles.activityInfoElement,
                ...styles.activityInfoElementText,
              }}>
              +{activity.participants.length - 2}
            </Text>
          ) : null}
        </View>
        <Switch
          trackColor={{false: colors.mediumGrey, true: colors.brightGreen}}
          thumbColor="white"
          ios_backgroundColor={colors.mediumGrey}
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
    height: 39,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  touchableLastActivity: {
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  activityInfoView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 7,
  },
  activityInfoElement: {
    marginLeft: 7,
    fontFamily: fonts.body_regular,
    color: colors.darkGrey,
  },
  activityInfoElementText: {
    fontSize: 16,
    color: colors.mediumGrey,
  },
  switch: {
    transform: [{scaleX: 0.7}, {scaleY: 0.7}],
  },
});

export default ActivityList;
