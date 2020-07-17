import React from 'react';
import {StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';
import {Icon} from 'react-native-elements';
import {fonts, colors} from '../../constants';

const ActivityAdderHeader = ({onPressBack, headerText, headerSubText}) => {
  return (
    <View style={styles.header}>
      <TouchableWithoutFeedback onPress={onPressBack}>
        <View style={styles.backButton}>
          <Icon name="chevron-left" type="entypo" />
        </View>
      </TouchableWithoutFeedback>
      <Text style={styles.headerText}>{headerText}</Text>
      <Text style={styles.headerSubText}>{headerSubText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    height: 50,
    width: 30,
    paddingTop: 10,
  },
  header: {
    height: 150,
    width: '100%',
    backgroundColor: '#D9E8FF',
    justifyContent: 'center',
    padding: 30,
  },
  headerText: {
    fontSize: 24,
    fontFamily: fonts.body_medium,
    marginBottom: 5,
  },
  headerSubText: {
    fontSize: 16,
    fontFamily: fonts.body_regular,
    color: colors.darkGrey,
  },
});

export default ActivityAdderHeader;
