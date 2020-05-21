import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const ShowMoreActivities = ({numAdditionalActivities, setShowAll}) => {
  return (
    <TouchableOpacity onPress={setShowAll(true)} style={styles.touchable}>
      <Text style={styles.text}>+ {numAdditionalActivities} more</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    height: 39,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  text: {
    fontSize: 16,
  },
});

export default ShowMoreActivities;
