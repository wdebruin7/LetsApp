import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {toggleUserReact} from '../../firebase';

const Reaction = ({reactionObject, activityUID, userData}) => {
  const onPressReaction = () => {
    toggleUserReact(reactionObject, activityUID, userData);
  };

  return (
    <TouchableOpacity onPress={onPressReaction} style={styles.touchable}>
      <Text>{reactionObject.emoji}</Text>
      <Text>{reactionObject.count}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flexDirection: 'row',
    backgroundColor: 'grey',
    borderRadius: 5,
    height: 20,
    width: 30,
  },
});

export default Reaction;
