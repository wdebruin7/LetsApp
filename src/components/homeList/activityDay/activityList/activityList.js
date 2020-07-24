import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Switch,
  TouchableWithoutFeedback,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {toggleUserIsParticipant} from '../../../../firebase';
import {fonts, colors} from '../../../../constants';
import {getActivityParticipantsString} from '../../../../utils';

const ActivityList = ({activity}) => {
  const userData = useSelector((state) => state.user.data);
  const [participants, setParticipants] = useState([]);
  const [isParticipant, setIsParticipant] = useState(false);
  const {navigate} = useNavigation();

  const onPress = () => {
    navigate('Groups', {
      screen: 'GroupInfo',
      params: {groupUID: activity.group.uid, group: undefined},
      initial: false,
    });
  };

  const toggleSwitch = () => {
    if (!userData || userData === {}) return;
    toggleUserIsParticipant(userData, activity);
  };

  useEffect(() => {
    if (activity) setParticipants(Object.values(activity.participants));
    if (userData !== {} && activity) {
      setIsParticipant(!!activity.participants[userData.uid]);
    }
  }, [activity, userData]);

  return (
    <TouchableOpacity style={styles.touchable} onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.topGroup}>
          <Text
            numberOfLines={1}
            style={{...styles.semiBoldText, ...styles.nameElement}}>
            {activity.group.name}
          </Text>
          {activity.name ? (
            <Text
              numberOfLines={1}
              style={{...styles.bodyText, ...styles.descriptionElement}}>
              {activity.name}
            </Text>
          ) : null}
        </View>
        <View style={styles.bottomGroup}>
          <Text
            style={{
              ...styles.bodyText,
              ...styles.italicText,
              ...styles.participantsElement,
            }}>
            {getActivityParticipantsString(
              activity,
              userData,
              undefined,
              false,
            )}
          </Text>
          <TouchableWithoutFeedback onPress={toggleSwitch}>
            <View style={styles.switchContainer}>
              <Switch
                trackColor={{
                  false: colors.mediumGrey,
                  true: colors.brightGreen,
                }}
                thumbColor="white"
                ios_backgroundColor={colors.mediumGrey}
                onValueChange={toggleSwitch}
                value={isParticipant}
                style={styles.switch}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  topGroup: {
    flexDirection: 'row',
    paddingHorizontal: 22,
    paddingTop: 10,
    alignItems: 'center',
  },
  bottomGroup: {
    flexDirection: 'row',
    paddingLeft: 22,
    paddingRight: 7,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameElement: {
    fontSize: 16,
  },
  descriptionElement: {
    fontSize: 14,
    marginLeft: 14,
  },
  participantsElement: {
    fontSize: 13,
  },
  semiBoldText: {
    color: colors.darkGrey,
    fontFamily: fonts.body_semi_bold,
  },
  bodyText: {
    color: colors.darkGrey,
    fontFamily: fonts.body_regular,
    flex: 1,
  },
  italicText: {
    fontStyle: 'italic',
  },
  infoView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 7,
  },
  infoElement: {
    marginLeft: 7,
    color: colors.darkGrey,
  },
  infoElementText: {
    fontSize: 16,
    color: colors.mediumGrey,
  },
  switch: {
    transform: [{scaleX: 0.7}, {scaleY: 0.7}],
  },
  switchContainer: {
    padding: 10,
  },
});

export default ActivityList;
