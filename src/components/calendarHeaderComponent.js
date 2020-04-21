import React, {useState} from 'react';
import {View, FlatList, StyleSheet, Dimensions} from 'react-native';
import CalendarPageComponent from './calendarPageComponent';

const getWeekStarts = () => {
  const weekStarts = [];
  const date = new Date(new Date().setHours(0, 0, 0, 0));

  while (weekStarts.length < 2) {
    weekStarts.push(new Date(date).getTime());
    date.setDate(date.getDate() + 7);
  }
  return weekStarts;
};

const CalendarHeaderComponent = ({activeDate}) => {
  const [weeks, setWeeks] = useState(getWeekStarts());

  const handleEnd = () => {
    const date = new Date(weeks[weeks.length - 1]);
    date.setDate(date.getDate() + 7);
    setWeeks(weeks.concat(date.getTime()));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={weeks}
        renderItem={({item}) => (
          <CalendarPageComponent activeDate={activeDate} weekStart={item} />
        )}
        horizontal
        snapToInterval={Dimensions.get('window').width}
        decelerationRate="fast"
        pagingEnabled
        keyExtractor={(item) => `${item}`}
        onEndReached={handleEnd}
        onEndReachedThreshold={1}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        style={styles.listView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#D9E8FF',
    height: 100,
    justifyContent: 'flex-end',
  },
  listView: {},
});

export default CalendarHeaderComponent;
