import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  SafeAreaView,
  Text,
  Button,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import {Icon} from 'react-native-elements';

const ActivityDatePicker = () => {
  const {navigate} = useNavigation();
  const route = useRoute();
  let selectedDates = {};
  if (route.params && route.params.selectedDates) {
    selectedDates = route.params.selectedDates;
  }
  const [markedDates, setMarkedDates] = useState(selectedDates);

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

  const getSelectedDateStrings = () => {
    const dateStrings = Object.keys(markedDates);
    return dateStrings.filter((dateString) => markedDates[dateString].selected);
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => navigate('ActivityAdder', {markedDates})}>
          <View style={styles.backButton}>
            <Icon name="chevron-left" type="entypo" />
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>Let&apos;s go!</Text>
        <Text>When are you free?</Text>
      </View>
      <CalendarList
        horizontal
        pagingEnabled
        minDate={new Date()}
        onDayPress={onDayPress}
        markedDates={markedDates}
        pastScrollRange={0}
      />
      <Text>{getSelectedDateStrings().length} Dates selected</Text>
      <Button title="Submit" onPress={() => {}} />
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

export default ActivityDatePicker;
