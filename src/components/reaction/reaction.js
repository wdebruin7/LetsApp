import React from 'react';
import StyleSheet, {Text, TouchableOpacity} from 'react-native';

const reaction = ({reaction}) => {
  const onPressReaction = () => {
    toggleUserReact(reaction);
  };

  return (
    <TouchableOpacity>
      <Text>{reaction.emoji}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default reaction;
