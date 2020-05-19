import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {cloneDeep} from 'lodash';
import {GroupSelect, Button, TextBox} from '../../components';

const ActivityGroupPicker = () => {
  const {params} = useRoute();
  const [groups, setGroups] = useState(params ? params.groups || {} : {});
  const {navigate} = useNavigation();
  const [filterString, setFilterString] = useState('');

  const onToggleSwitch = (groupToUpdate) => {
    const updatedGroup = groups[groupToUpdate.uid];
    updatedGroup.selected = !updatedGroup.selected;

    const updatedGroups = {...groups};
    updatedGroups[groupToUpdate.uid] = updatedGroup;

    setGroups(updatedGroups);
  };

  const getSelectedGroupUIDs = () => {
    const groupUIDs = Object.keys(groups);
    return groupUIDs.filter((uid) => groups[uid].selected);
  };

  const getSortedFilteredGroupsArray = () => {
    const sortedGroupsArray = Object.values(groups).sort((a, b) => {
      if (a.name < b.name) return -1;
      else if (a.name === b.name) return 0;
      else return 1;
    });

    return filterString
      ? sortedGroupsArray.filter((group) =>
          group.name
            .trim()
            .toLowerCase()
            .includes(filterString.trim().toLowerCase()),
        )
      : sortedGroupsArray;
  };

  const onGoBack = () => {
    navigate('ActivityAdder', {groups: params.groups});
  };

  const onPressSave = () => {
    navigate('ActivityAdder', {groups});
  };

  const onPressSelectAll = (selected) => {
    const newGroups = cloneDeep(groups);
    Object.keys(newGroups).forEach((uid) => {
      newGroups[uid].selected = selected;
    });
    setGroups(newGroups);
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => onGoBack()}>
          <View style={styles.backButton}>
            <Icon name="chevron-left" type="entypo" />
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>Let&apos;s go!</Text>
        <Text>When are you free?</Text>
      </View>
      <View style={styles.filterView}>
        <Text style={styles.selectText}>
          Select groups that can see you&apos;re free
        </Text>
        <TextBox
          placeholder="Search"
          value={filterString}
          onChangeText={setFilterString}
          style={styles.searchBox}
        />
      </View>
      <View style={styles.selectView}>
        <TouchableOpacity onPress={() => onPressSelectAll(true)}>
          <Text style={styles.selectButton}>Select all</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressSelectAll(false)}>
          <Text style={styles.selectButton}>Deselect all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.list}
        data={getSortedFilteredGroupsArray()}
        renderItem={({item}) => (
          <GroupSelect
            group={item}
            onToggleGroup={() => onToggleSwitch(item)}
          />
        )}
        keyExtractor={(item) => item.uid}
      />
      <Button
        style={styles.button}
        title={`Select ${getSelectedGroupUIDs().length} groups`}
        onPress={onPressSave}
        raised
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // alignItems: 'center',
  },
  backButton: {
    height: 50,
    width: 30,
    paddingTop: 10,
  },
  chevron: {
    height: 16,
    width: 16,
  },
  header: {
    height: 150,
    width: '100%',
    backgroundColor: '#D9E8FF',
    justifyContent: 'center',
    padding: 30,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'AppleSDGothicNeo-Regular',
  },
  filterView: {
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  selectText: {
    fontWeight: 'bold',
    fontSize: 18,
    width: '100%',
  },
  searchBox: {
    width: '100%',
    marginTop: 15,
  },
  list: {
    flex: 1,
  },
  button: {
    alignSelf: 'center',
  },
  selectView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 17,
    marginVertical: 10,
  },
  selectButton: {
    color: '#0066FF',
  },
});

export default ActivityGroupPicker;
