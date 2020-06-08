import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {fonts, colors} from '../../../../constants';

const ShowMoreActivities = ({numAdditionalActivities, date}) => {
  const {navigate} = useNavigation();

  const onPress = () => {
    navigate('HomeActiveDate', {activeDateTime: date.getTime()});
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.touchable}>
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
    fontFamily: fonts.body_regular,
    color: colors.darkGrey,
  },
});

export default ShowMoreActivities;
