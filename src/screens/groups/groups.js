import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {GroupTile} from '../../components';

const Groups = () => {
  const groups = useSelector((state) => state.groups || {});

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
