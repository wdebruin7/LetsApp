import React from 'react';
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {getGroupMembersString} from '../../utils';

const GroupInfo = (group) => {
  const userData = useSelector((state) => state.user.data || {});
  return (
    <SafeAreaView>
      <View>
        {group.photoRefURL ? <Avatar /> : null}
        <View>
          <Text>{group.name}</Text>
          <Text>{getGroupMembersString(group)}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default GroupInfo;
