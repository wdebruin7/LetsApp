import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {GroupSelect} from '../../components';

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
    navigate('ActivityAdder', {groups});
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => onGoBack()}>
          <View style={styles.backButton}>
            <Icon name="chevron-left" type="entypo" />
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>Let&apos;s go!</Text>
        <Text>When are you free?</Text>
      </View>
      {getSortedFilteredGroupsArray().map((group) => (
        <GroupSelect
          onToggleGroup={() => onToggleSwitch(group)}
          group={group}
        />
      ))}
      <Text>{getSelectedGroupUIDs().length} Groups Selected</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#FCFEFF',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
});

export default ActivityGroupPicker;
