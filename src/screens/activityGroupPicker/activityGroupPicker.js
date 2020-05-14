import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  SafeAreaView,
  Text,
  View,
  Switch,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Icon} from 'react-native-elements';

const ActivityGroupPicker = () => {
  const {params} = useRoute();
  const [groups, setGroups] = useState(params ? params.groups || [] : []);
  const {navigate} = useNavigation();

  const onToggleSwitch = (groupToUpdate) => {
    setGroups(
      groups.map((group) => {
        if (group.uid === groupToUpdate.uid) {
          return {...group, selected: !group.selected};
        } else return group;
      }),
    );
  };

  const getSelectedGroups = () => {
    return groups.filter((group) => group.selected);
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
      {groups.map((group) => (
        <View key={group.uid}>
          <Text>{group.name}</Text>
          <Switch
            value={group.selected}
            onValueChange={() => onToggleSwitch(group)}
          />
        </View>
      ))}
      <Text>{getSelectedGroups().length} Groups Selected</Text>
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
