import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {toggleUserReact} from '../../firebase';
import {colors, fonts} from '../../constants';

const Reaction = ({reactionObject, activityUID, userData}) => {
  const onPressReaction = () => {
    toggleUserReact(reactionObject, activityUID, userData);
  };

  return (
    <TouchableOpacity onPress={onPressReaction} style={styles.touchable}>
      <Text>{reactionObject.emoji}</Text>
      <Text style={styles.count}>{reactionObject.count}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flexDirection: 'row',
    backgroundColor: colors.lightGrey,
    borderRadius: 10,
    height: 25,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    fontFamily: fonts.body_regular,
    color: colors.darkGrey,
  },
});

export default Reaction;
