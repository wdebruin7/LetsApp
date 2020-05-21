import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {GroupTile, AppHeader, TextBox} from '../../components';
import {colors} from '../../constants';

const Groups = () => {
  const groups = useSelector((state) => state.groups || {});
  const {navigate} = useNavigation();
  const [groupSearchString, setGroupSearchString] = useState('');
  const [filteredGroups, setFilteredGroups] = useState(groups);

  const onPressCreate = () => {
    navigate('GroupCreate');
  };

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
          <Text style={styles.linkText}>Create new group</Text>
        </TouchableOpacity>
        <TextBox
          style={styles.searchBar}
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
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 3, height: 3},
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  listContainer: {
    paddingTop: 10,
    flex: 1,
  },
  list: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    width: '80%',
  },
  linkText: {
    color: colors.primaryBlue,
    marginBottom: 10,
    fontSize: 16,
  },
});

export default Groups;
