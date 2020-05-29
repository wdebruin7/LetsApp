import React from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import ActivityDay from './activityDay';

const HomeList = ({activities, setActiveDate}) => {
  const handleSignOut = async () => {
    auth().signOut();
  };

  return (
    <View style={styles.container}>
      <Button title="sign out" onPress={handleSignOut} />
      {activities.length > 0 ? (
        <FlatList
          data={activities}
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
