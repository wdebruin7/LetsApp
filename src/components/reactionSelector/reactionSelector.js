import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import addReaction from '../../images/addReaction.png';

const ReactionSelector = ({activityData, userData, style}) => {
  return (
    <TouchableOpacity style={style}>
      <Image source={addReaction} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
});

export default ReactionSelector;
