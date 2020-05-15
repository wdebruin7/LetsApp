import React from 'react';
import {View, Text} from 'react-native';
import {getActivityParticipantsString, getDisplayDate} from '../../utils';

const GroupActivityTile = ({activity, userData}) => {
  const participants = getActivityParticipantsString(
    activity,
    userData,
    undefined,
    true,
  );
  const date = getDisplayDate(new Date(activity.date));

  return (
    <View>
      <Text>Test</Text>
    </View>
  );
};

export default GroupActivityTile;
