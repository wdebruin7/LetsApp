import React, {useState} from 'react';
import {Modal, SafeAreaView, Text, Button, View, Switch} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import {useSelector} from 'react-redux';
import {submitNewActivity} from '../../firebase';

const ActivityAdder = ({visible, setVisible}) => {
  const [markedDates, setMarkedDates] = useState({});
  const userData = useSelector((state) => state.user.data || {});
  const [groups, setGroups] = useState(userData.groups);

  const onDayPress = (day) => {
    const toUpdate = {...markedDates};
    const selected = toUpdate[day.dateString]
      ? !toUpdate[day.dateString].selected
      : true;
    toUpdate[day.dateString] = {
      selected,
    };
    setMarkedDates(toUpdate);
  };

  const onToggleSwitch = (groupToUpdate) => {
    setGroups(
      groups.map((group) => {
        if (group.uid === groupToUpdate.uid) {
          return {...group, selected: !group.selected};
        } else return group;
      }),
    );
  };

  const getSelectedDateStrings = () => {
    const dateStrings = Object.keys(markedDates);
    return dateStrings.filter((dateString) => markedDates[dateString].selected);
  };

  const getSelectedGroups = () => {
    return groups.filter((group) => group.selected);
  };

  const onSubmit = () => {
    const selectedGroups = getSelectedGroups();
    const selectedDateStrings = getSelectedDateStrings();
    if (selectedGroups.length < 1) return;
    if (selectedDateStrings.length < 1) return;
    submitNewActivity(selectedGroups, selectedDateStrings);
  };

  return (
    <Modal animationType="slide" visible={visible}>
      <SafeAreaView>
        <Button title="close" onPress={() => setVisible(false)} />
        <CalendarList
          horizontal
          pagingEnabled
          minDate={new Date()}
          onDayPress={onDayPress}
          markedDates={markedDates}
        />
        <Text>{getSelectedDateStrings().length} Dates selected</Text>
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
        <Button title="Submit" onPress={() => onSubmit()} />
      </SafeAreaView>
    </Modal>
  );
};

export default ActivityAdder;
