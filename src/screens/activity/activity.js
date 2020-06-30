import React from 'react';
import {SafeAreaView, Text, StyleSheet, FlatList, View} from 'react-native';
import {useSelector} from 'react-redux';
import {AppHeader, ActivityRow} from '../../components';
import {groupActions} from '../../utils';

const Activity = () => {
  const actions = useSelector((state) => state.actions);
  const userData = useSelector((state) => state.user.data);

  const groupedActions = groupActions(actions, userData);

  return (
    <SafeAreaView style={styles.safeView}>
      <AppHeader />
      <FlatList
        data={groupedActions}
        renderItem={({item}) => <ActivityRow groupedAction={item} />}
        keyExtractor={(item) => {
          console.log(item);
          item.uid;
        }}
        style={styles.flex}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#FCFEFF',
  },
  list: {
    flex: 1,
  },
});

export default Activity;
