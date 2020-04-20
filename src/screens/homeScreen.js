import React from 'react';
import {SafeAreaView, StyleSheet, Text, Button, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {FlatList} from 'react-native-gesture-handler';
import {useSession} from '../firebase/auth';
import {useActivities} from '../firebase';
import ActivityDayComponent from '../components/activityDayComponent';
import CalendarHeaderComponent from '../components/calendarHeaderComponent';

const HomeScreen = ({navigation}) => {
  const session = useSession();
  const activityState = useActivities();

  const handleSignOut = async () => {
    auth().signOut();
  };

  if (!session.user) {
    navigation.navigate('Auth');
  }

  return (
    <SafeAreaView style={styles.safeView}>
      <CalendarHeaderComponent />
      <View style={styles.container}>
        <Text>Welcome user!</Text>
        <Button title="sign out" onPress={handleSignOut} />
        {activityState.length > 0 ? (
          <FlatList
            data={activityState}
            renderItem={({item}) => <ActivityDayComponent activityDay={item} />}
            keyExtractor={(item) => item.date._seconds.toString()}
          />
        ) : null}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
