import React, {useState, useEffect} from 'react';
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
  const [flatListRef, setFlatListRef] = useState(undefined);

  const handleEnd = () => {
    const date = new Date(weeks[weeks.length - 1]);
    date.setDate(date.getDate() + 7);
    setWeeks(weeks.concat(date.getTime()));
  };

  useEffect(() => {
    if (!activeDate || !flatListRef) return;

    const index = weeks.findIndex((weekStart) => {
      const start = new Date(weekStart);
      const end = new Date(start);
      end.setDate(end.getDate() + 8);
      const inRange =
        start.getTime() <= activeDate.getTime() &&
        end.getTime() >= activeDate.getTime();

      return inRange;
    });
    if (index === -1) return;
    flatListRef.scrollToIndex({animated: false, index});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDate, flatListRef]);

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

export default CalendarHeaderComponent;
