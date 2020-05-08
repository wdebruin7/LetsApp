import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  Text,
  Button,
  View,
  Switch,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';

const ActivityGroupPicker = () => {
  const userData = useSelector((state) => state.user.data || {});
  const [groups, setGroups] = useState(userData.groups);
  const {navigate} = useNavigation();

  const onToggleSwitch = (groupToUpdate) => {
    setGroups(
      groups.map((group) => {
        if (group.groupDocumentID === groupToUpdate.groupDocumentID) {
          return {...group, selected: !group.selected};
        } else return group;
      }),
    );
  };

  const getSelectedGroups = () => {
    return groups.filter((group) => group.selected);
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => navigate('ActivityAdder')}>
          <View style={styles.backButton}>
            <Image
              style={styles.chevron}
              source={require('../../images/chevron-left.png')}
            />
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>Let's go!</Text>
        <Text>When are you free?</Text>
      </View>
      {groups.map((group) => (
        <View>
          <Text>{group.name}</Text>
          <Switch
            value={group.selected}
            onValueChange={() => onToggleSwitch(group)}
          />
        </View>
      ))}
      <Text>{getSelectedGroups().length} Groups Selected</Text>
      <Button title="Submit" />
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
