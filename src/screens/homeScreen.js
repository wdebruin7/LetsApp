import React from 'react';
import {SafeAreaView, StyleSheet, Text, Button, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useSession} from '../firebase/auth';

const HomeScreen = () => {
  const user = useSession();
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <Text>Welcome user!</Text>
        <Button title="sign out" onPress={auth().signOut()} />
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
