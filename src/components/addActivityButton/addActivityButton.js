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
        size={45}
        iconStyle={styles.icon}
      />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#0066FF',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  icon: {
    textAlign: 'center',
    height: 45,
    width: 45,
  },
});

export default AddActivityButton;
