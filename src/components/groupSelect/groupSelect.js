import React from 'react';
import {TouchableWithoutFeedback, View, Text, StyleSheet} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {getGroupMembersString} from '../../utils';
import {colors} from '../../constants';

const GroupSelect = ({group, onToggleGroup}) => {
  const userData = useSelector((state) => state.user.data || {});

  return (
    <TouchableWithoutFeedback onPress={onToggleGroup}>
      <View style={styles.container}>
        <Avatar
          rounded
          title={group.name[0]}
          containerStyle={styles.avatar}
          size={60}
        />
        <View style={styles.textView}>
          <Text style={styles.titleText}>{group.name}</Text>
          <Text style={styles.subtitleText}>
            {getGroupMembersString(group, userData)}
          </Text>
        </View>
        <Icon
          type="font-awesome"
          name={group.selected ? 'check-circle' : 'circle-thin'}
          containerStyle={styles.icon}
          color={group.selected ? colors.primaryBlue : '#BCBCBC'}
          size={30}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  avatar: {
    // paddingLeft: 20,
    marginLeft: 15,
  },
  textView: {
    flexDirection: 'column',
    marginLeft: 15,
    height: '100%',
    width: 250,
  },
  titleText: {
    paddingTop: 4,
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitleText: {
    color: '#BCBCBC',
    paddingTop: 3,
    fontSize: 14,
  },
  icon: {
    // alignSelf: 'center',
    // position: 'absolute',
    // right: 20,
    marginLeft: 15,
  },
});

export default GroupSelect;
