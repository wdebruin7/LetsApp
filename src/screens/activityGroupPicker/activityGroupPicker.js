import React, {useState, useEffect} from 'react';
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
import {cloneDeep} from 'lodash';
import {GroupSelect, Button, TextBox} from '../../components';
import {colors, fonts} from '../../constants';

const ActivityGroupPicker = () => {
  const {params} = useRoute();
  const [groups, setGroups] = useState(params ? params.groups || {} : {});
  const {navigate} = useNavigation();
  const [filterString, setFilterString] = useState('');
  const [canSave, setCanSave] = useState(false);

  useEffect(() => {
    const numSelectedGroups = getSelectedGroupUIDs().length;
    setCanSave(numSelectedGroups > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups]);

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
      if (
        !filterString ||
        newGroups[uid].name
          .trim()
          .toLowerCase()
          .includes(filterString.trim().toLowerCase())
      ) {
        newGroups[uid].selected = selected;
      }
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
        <Text style={styles.headerText}>Choose groups</Text>
        <Text style={styles.headerSubText}>
          Activities will be created in these groups
        </Text>
      </View>
      <View style={styles.filterView}>
        <TextBox
          placeholder="Search"
          value={filterString}
          onChangeText={setFilterString}
          style={styles.searchBox}
        />
      </View>
      <View style={styles.selectView}>
        <Button title="Select all" onPress={() => onPressSelectAll(true)} />
        <Button title="Deselect all" onPress={() => onPressSelectAll(false)} />
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
        disabled={!canSave}
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
    fontSize: 24,
    fontFamily: fonts.body_medium,
    marginBottom: 5,
  },
  headerSubText: {
    fontSize: 16,
    fontFamily: fonts.body_regular,
    color: colors.darkGrey,
  },
  filterView: {
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
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
    width: 250,
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
