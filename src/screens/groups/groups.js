import React from 'react';
import {SafeAreaView, StyleSheet, View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {useRoute, useNavigation} from '@react-navigation/native';
import {GroupTile} from '../../components';

const Groups = () => {
  const {groupUID} = useRoute().params;
  const groups = useSelector((state) => state.groups || {});
  const {navigate} = useNavigation();

  if (groupUID) navigate('GroupInfo', {groupUID});

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={Object.values(groups)}
          renderItem={({item}) => <GroupTile group={item} />}
          keyExtractor={(item) => item.uid}
          style={styles.list}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listContainer: {
    flex: 1,
  },
  list: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default Groups;
