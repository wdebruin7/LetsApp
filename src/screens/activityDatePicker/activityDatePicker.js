import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import {Button, ActivityAdderHeader} from '../../components';
import {fonts, colors} from '../../constants';
import {getDisplayDate} from '../../utils';

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

  const getSelectedDateStrings = () =>
    Object.keys(markedDates).filter(
      (dateString) => markedDates[dateString].selected,
    );

  const getSelectedDates = () =>
    getSelectedDateStrings()
      .map((dateString) => {
        const [year, month, day] = dateString.split('-');
        const date = new Date();
        date.setFullYear(
          parseInt(year, 10),
          parseInt(month, 10) - 1,
          parseInt(day, 10),
        );
        return date;
      })
      .sort((a, b) => {
        if (a < b) return -1;
        else if (b < a) return 1;
        else return 0;
      });

  const numSelectedDates = () => getSelectedDateStrings().length;

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
      <ActivityAdderHeader
        onPressBack={onPressBack}
        headerText="Choose dates"
        headerSubText="Each date will be a new activity"
      />
      <CalendarList
        horizontal
        pagingEnabled
        minDate={new Date()}
        onDayPress={onDayPress}
        markedDates={markedDates}
        pastScrollRange={0}
        theme={{
          todayTextColor: colors.primaryBlue,
          selectedDayBackgroundColor: colors.primaryBlue,
          textDayFontFamily: fonts.body_bold,
          textDayHeaderFontFamily: fonts.body_bold,
          textMonthFontFamily: fonts.body_bold,
          textDayFontWeight: '400',
          textDayHeaderFontWeight: '400',
          textMonthFontWeight: 'bold',
        }}
      />
      <View style={styles.container}>
        <Button
          title={getSaveText()}
          raised
          onPress={onPressSave}
          disabled={!canSave}
          style={styles.saveButton}
        />
        <FlatList
          data={getSelectedDates()}
          renderItem={({item}) => (
            <Text style={{...styles.markedDates}}>{getDisplayDate(item)}</Text>
          )}
          keyExtractor={(item) => item.getTime().toString()}
          contentContainerStyle={styles.dateList}
        />
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
  saveButton: {
    width: 250,
  },
  markedDates: {
    marginTop: 5,
    fontFamily: fonts.body_light,
    fontSize: 15,
  },
  dateList: {
    flex: 1,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
});

export default ActivityDatePicker;
