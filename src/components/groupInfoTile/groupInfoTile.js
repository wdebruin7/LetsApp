import React, {useState, useEffect} from 'react';
import {View, Switch, Text, StyleSheet} from 'react-native';
import TileHeader from '../tileHeader';
import TileBody from '../tileBody';
import {getDisplayDate, getActivityParticipantsString} from '../../utils';
import {toggleUserIsParticipant} from '../../firebase';

const GroupInfoTile = ({activity, userData}) => {
  const [isParticipant, setIsParticipant] = useState(false);

  const toggleSwitch = () => {
    toggleUserIsParticipant(userData, activity);
  };

  useEffect(() => {
    if (userData && activity) {
      setIsParticipant(
        Object.values(activity.participants).some(
          (elem) => elem.uid === userData.uid,
        ),
      );
    }
  }, [activity, userData]);

  return (
    <View style={styles.container}>
      <TileHeader
        title={getDisplayDate(activity.date.toDate())}
        rightComponent={
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isParticipant ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isParticipant}
            style={styles.switch}
          />
        }
      />
      <TileBody>
        <Text style={styles.tileText}>
          {getActivityParticipantsString(activity, userData, undefined, true)}
        </Text>
      </TileBody>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  switch: {
    transform: [{scaleX: 0.7}, {scaleY: 0.7}],
  },
  tileText: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});

export default GroupInfoTile;
