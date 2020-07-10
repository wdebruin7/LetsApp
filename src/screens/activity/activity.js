import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Dimensions,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {AppHeader, ActivityRow, TextBox} from '../../components';
import {groupActions} from '../../utils';

const filterActions = (groupedActions, filterString) => {
  const normalizedSearch = filterString.toLowerCase().trim();

  return groupedActions.filter((action) => {
    const userMatch = Object.values(action.users).some((user) => {
      const normalizedName = user.name.toLowerCase().trim();
      return normalizedName.includes(normalizedSearch);
    });
    const normalizedGroup = action.group.name.toLowerCase().trim();
    const groupMatch = normalizedGroup.includes(normalizedSearch);
    return userMatch || groupMatch;
  });
};

const Activity = () => {
  const actions = useSelector((state) => state.actions);
  const userData = useSelector((state) => state.user.data);
  const [searchString, setSearchString] = useState('');
  const [groupedActions, setGroupedActions] = useState([]);
  const [filteredActions, setFilteredActions] = useState([]);

  useEffect(() => {
    if (!actions) return;
    if (!userData) return;
    setGroupedActions(groupActions(actions, userData));
  }, [actions, userData]);

  useEffect(() => {
    if (!groupedActions) return;
    const newFilteredActions = searchString
      ? filterActions(groupedActions, searchString)
      : groupedActions;
    setFilteredActions(newFilteredActions);
  }, [searchString, groupedActions]);

  return (
    <SafeAreaView style={styles.safeView}>
      <AppHeader />
      <View style={styles.textBoxContainer}>
        <TextBox
          style={styles.textBox}
          placeholder="Search Activity"
          value={searchString}
          onChangeText={setSearchString}
        />
      </View>
      <FlatList
        data={filteredActions}
        renderItem={({item}) => <ActivityRow groupedAction={item} />}
        keyExtractor={(item) => item.uid}
        style={styles.flex}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#FCFEFF',
    alignItems: 'center',
  },
  textBoxContainer: {
    borderBottomWidth: 1,
    borderColor: '#EBF0F3',
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  textBox: {
    width: Dimensions.get('window').width * 0.8,
    marginTop: 20,
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
});

export default Activity;
