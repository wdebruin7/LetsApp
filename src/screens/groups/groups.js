import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useRoute, useNavigation} from '@react-navigation/native';
import {GroupTile, AppHeader} from '../../components';

const Groups = () => {
  const {groupUID} = useRoute().params;
  const groups = useSelector((state) => state.groups || {});
  const {navigate} = useNavigation();
  const [groupSearchString, setGroupSearchString] = useState('');
  const [filteredGroups, setFilteredGroups] = useState(groups);

  const onPressCreate = () => {
    navigate('GroupCreate');
  };

  if (groupUID) navigate('GroupInfo', {groupUID});

  useEffect(() => {
    setFilteredGroups(
      groupSearchString
        ? Object.values(groups).filter((group) =>
            group.name
              .toLowerCase()
              .trim()
              .includes(groupSearchString.toLowerCase().trim()),
          )
        : groups,
    );
  }, [groupSearchString, groups]);

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <View style={styles.topTile}>
        <TouchableOpacity onPress={onPressCreate}>
          <Text>Create new group</Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Search groups"
          value={groupSearchString}
          onChangeText={setGroupSearchString}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={Object.values(filteredGroups)}
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
  topTile: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    height: 80,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 3, height: 3},
    backgroundColor: '#FFFFFF',
  },
  listContainer: {
    paddingTop: 10,
    flex: 1,
  },
  list: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default Groups;
