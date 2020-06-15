import React from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

const AddActivityButton = ({dateTime, groupUID}) => {
  const {navigate} = useNavigation();

  const onPress = () => {
    navigate('AddActivity', {
      screen: 'ActivityAdder',
      params: {dateTime, groupUID},
    });
  };

  return (
    <TouchableHighlight style={styles.addButton} onPress={onPress}>
      <Icon
        name="plus"
        type="entypo"
        color="#FFFFFF"
        size={35}
        iconStyle={styles.icon}
      />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  addButton: {
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: '#0066FF',
    justifyContent: 'center',
  },
  icon: {
    textAlign: 'center',
    height: 36,
    width: 36,
  },
});

export default AddActivityButton;
