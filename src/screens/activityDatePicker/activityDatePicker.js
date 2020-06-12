import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import {Icon} from 'react-native-elements';
import Button from '../../components/button/button';
import {fonts, colors} from '../../constants';

const ActivityDatePicker = () => {
  const {navigate} = useNavigation();
  const route = useRoute();
  let selectedDates = {};
  if (route.params && route.params.selectedDates) {
    selectedDates = route.params.selectedDates;
  }
  const [markedDates, setMarkedDates] = useState(selectedDates);
  const [canSave, setCanSave] = useState(false);

  useEffect(() => {
    setCanSave(numSelectedDates() > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markedDates]);

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

  const selectedDateStrings = Object.keys(markedDates).filter(
    (dateString) => markedDates[dateString].selected,
  );

  const numSelectedDates = () => selectedDateStrings.length;

  const getSaveText = () => {
    return `Select ${numSelectedDates()} day${
      numSelectedDates() === 1 ? '' : 's'
    }`;
  };

  const onPressBack = () => {
    navigate('ActivityAdder', {markedDates: route.params.selectedDates});
  };

  const onPressSave = () => {
    navigate('ActivityAdder', {markedDates});
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View style={styles.backButton}>
            <Icon name="chevron-left" type="entypo" />
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>Choose dates</Text>
        <Text style={styles.headerSubText}>
          Each date will be a new activity
        </Text>
      </View>
      <CalendarList
        horizontal
        pagingEnabled
        minDate={new Date()}
        onDayPress={onDayPress}
        markedDates={markedDates}
        pastScrollRange={0}
      />
      <View style={styles.container}>
        <Button
          title={getSaveText()}
          raised
          onPress={onPressSave}
          disabled={!canSave}
          style={styles.saveButton}
        />
        {selectedDateStrings.map((date) => {
          return <Text style={styles.markedDates}>{date}</Text>;
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#FCFEFF',
  },
  container: {
    flexDirection: 'column',
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
    fontSize: 24,
    fontFamily: fonts.body_medium,
    marginBottom: 5,
  },
  headerSubText: {
    fontSize: 16,
    fontFamily: fonts.body_regular,
    color: colors.darkGrey,
  },
  saveButton: {
    width: 250,
  },
  markedDates: {
    marginTop: 10,
    fontFamily: fonts.body_light,
  },
});

export default ActivityDatePicker;
