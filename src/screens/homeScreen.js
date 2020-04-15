import React, {useEffect, useReducer} from 'react';
import {SafeAreaView, StyleSheet, Text, Button, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {FlatList} from 'react-native-gesture-handler';
import {useSession} from '../firebase/auth';
import {useActivities} from '../firebase';

const HomeScreen = ({navigation}) => {
  const session = useSession();
  const activityState = useActivities;

  const handleSignOut = async () => {
    auth().signOut();
  };

  if (!session.user) {
    navigation.navigate('Auth');
  }

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <Text>Welcome user!</Text>
        <Button title="sign out" onPress={handleSignOut} />
        {activityState.length > 0 ? (
          <FlatList
            data={activityState}
            renderItem={({item}) => (
              <Text>
                {item.date._seconds}, {item.activities.length}
              </Text>
            )}
            keyExtractor={(item) => item.date}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
