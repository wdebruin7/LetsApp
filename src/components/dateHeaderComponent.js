import React from 'react';
import moment from 'moment';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation} from 'react-navigation-hooks';

const DateHeaderComponent = ({date}) => {
  const {navigate} = useNavigation();

  const onPressX = () => {
    navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{moment(date).format('dddd, MMM D')}</Text>
      <TouchableOpacity onPress={onPressX}>
        <Icon
          type="antdesign"
          name="close"
          color="#FFFFFF"
          iconStyle={styles.icon}
          size={24}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#8AABDD',
    height: 40,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 4},
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    paddingHorizontal: 7,
    fontWeight: 'bold',
  },
  icon: {
    paddingHorizontal: 7,
  },
});

export default DateHeaderComponent;
