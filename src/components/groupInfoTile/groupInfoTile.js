import React, {useState, useEffect} from 'react';
import {View, Switch, Text, StyleSheet, FlatList} from 'react-native';
import TileHeader from '../tileHeader';
import TileBody from '../tileBody';
import {getDisplayDate, getActivityParticipantsString} from '../../utils';
import {toggleUserIsParticipant} from '../../firebase';
import {colors, fonts} from '../../constants';
import ReactionSelector from '../reactionSelector/reactionSelector';
import Reaction from '../reaction/reaction';

const GroupInfoTile = ({activity, userData}) => {
  const [isParticipant, setIsParticipant] = useState(false);

  const toggleSwitch = () => {
    toggleUserIsParticipant(userData, activity);
  };

  useEffect(() => {
    if (userData && userData !== {} && activity) {
      setIsParticipant(!!activity.participants[userData.uid]);
    }
  }, [activity, userData]);

  return (
    <View style={styles.container}>
      <TileHeader
        title={getDisplayDate(activity.date.toDate())}
        disabled={true}
        rightComponent={
          <Switch
            trackColor={{false: colors.mediumGrey, true: colors.brightGreen}}
            thumbColor="white"
            ios_backgroundColor={colors.mediumGrey}
            onValueChange={toggleSwitch}
            value={isParticipant}
            style={styles.switch}
          />
        }
      />
      <TileBody>
        <View style={styles.textInfoContainer}>
          {activity.name ? (
            <Text style={{...styles.semiBoldInfoText}}>{activity.name}</Text>
          ) : null}
          <Text style={styles.participants}>
            {getActivityParticipantsString(activity, userData, undefined, true)}
          </Text>
          <View>
            <FlatList
              data={Object.values(activity.reactions || {}).filter(
                (reaction) => reaction.count > 0,
              )}
              renderItem={({item}) => (
                <Reaction
                  reactionObject={item}
                  userData={userData}
                  activityUID={activity.uid}
                />
              )}
              keyExtractor={(item) => item.emoji}
            />
            <ReactionSelector
              style={styles.reactionSelector}
              activityData={activity}
              userData={userData}
            />
          </View>
        </View>
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
  semiBoldInfoText: {
    fontFamily: fonts.body_semi_bold,
    fontSize: 14,
    color: colors.darkGrey,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  participants: {
    fontSize: 13,
    fontFamily: fonts.bodyItalic,
    color: colors.mediumGrey,
    padding: 15,
  },
  reactionSelector: {
    alignSelf: 'flex-end',
    paddingBottom: 4,
    paddingRight: 6,
  },
});

export default GroupInfoTile;
