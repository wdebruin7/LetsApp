import React from 'react';
import {TouchableWithoutFeedback, View, Text, StyleSheet} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {getGroupMembersString} from '../../utils';

const GroupSelect = ({group, onToggleGroup}) => {
  const userData = useSelector((state) => state.user.data || {});

  return (
    <TouchableWithoutFeedback onPress={onToggleGroup} style={styles.container}>
      <View style={{}}>
        <Avatar rounded title={group.name[0]} containerStyle={styles.avatar} />
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
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  avatar: {},
  textView: {
    flexDirection: 'column',
  },
  titleText: {
    fontWeight: 'bold',
  },
  subtitleText: {},
  icon: {},
});

export default GroupSelect;
