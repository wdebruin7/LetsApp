import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, Dimensions} from 'react-native';
import CalendarPage from './calendarPage/calendarPage';

const getWeekStarts = () => {
  const weekStarts = [];
  const date = new Date(new Date().setHours(0, 0, 0, 0));

  while (weekStarts.length < 2) {
    weekStarts.push(new Date(date));
    date.setDate(date.getDate() + 7);
  }
  return weekStarts;
};

const CalendarHeader = ({activeDate, setActiveDate}) => {
  const [weeks, setWeeks] = useState(getWeekStarts());
  const [flatListRef, setFlatListRef] = useState(undefined);

  const handleEnd = () => {
    const date = new Date(weeks[weeks.length - 1]);
    date.setDate(date.getDate() + 7);
    setWeeks(weeks.concat(date));
  };

  useEffect(() => {
    if (!activeDate || !flatListRef) return;

    const index = weeks.findIndex((weekStart) => {
      const start = new Date(weekStart);
      const end = new Date(start);
      end.setDate(end.getDate() + 8);
      const inRange = start <= activeDate && end >= activeDate;

      return inRange;
    });
    if (index === -1) return;
    flatListRef.scrollToIndex({animated: false, index});
  }, [activeDate, flatListRef, weeks]);

  return (
    <View style={styles.container}>
      <FlatList
        data={weeks}
        renderItem={({item}) => (
          <CalendarPage
            activeDate={activeDate}
            weekStart={item}
            setActiveDate={setActiveDate}
          />
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
        ref={setFlatListRef}
        onScrollToIndexFailed={() => {}}
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

export default CalendarHeader;
