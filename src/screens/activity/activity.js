import React from 'react';
import {SafeAreaView, Text, StyleSheet, FlatList, View} from 'react-native';
import {useSelector} from 'react-redux';
import {AppHeader} from '../../components';
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
        renderItem={({item}) => (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>{item.group.name}</Text>
            <Text>{item.action}</Text>
            <Text>{item.type}</Text>
          </View>
        )}
        keyExtractor={(item) => item.uid}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#FCFEFF',
  },
});

export default Activity;
