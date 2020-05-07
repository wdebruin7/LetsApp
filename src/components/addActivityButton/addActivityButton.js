import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

const AddActivityButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.addButton} onPress={() => onPress()}>
      <Icon
        name="plus"
        type="entypo"
        color="#FFFFFF"
        size={45}
        iconStyle={styles.icon}
      />
    </TouchableOpacity>
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
