import React from 'react';
import {View, Button, FlatList, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import ActivityDay from './activityDay';

const HomeList = ({activityDays, setActiveDate}) => {
  const handleSignOut = async () => {
    auth().signOut();
  };

  console.log(activityDays);

  return (
    <View style={styles.container}>
      <Button title="sign out" onPress={handleSignOut} />
      {activityDays.length > 0 ? (
        <FlatList
          data={activityDays}
          renderItem={({item}) => (
            <ActivityDay activityDay={item} setActiveDate={setActiveDate} />
          )}
          keyExtractor={(item) => item.date.getTime().toString()}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default HomeList;
