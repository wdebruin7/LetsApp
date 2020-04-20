import React from 'react';
import moment from 'moment';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

const DateHeaderComponent = ({date}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{moment(date).format('dddd, MM D')}</Text>
      <TouchableOpacity>
        <Icon type="antdesign" name="close" color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'space-between',
    backgroundColor: '#8AABDD',
  },
  text: {
    backgroundColor: '#FFFFFF',
  },
});

export default DateHeaderComponent;
