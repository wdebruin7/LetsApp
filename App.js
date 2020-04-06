import React from 'react';
import {SafeAreaView, Text, StyleSheet, Button, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useAuth} from './src/auth';
import PhoneSignIn from './src/phoneSignIn';

const App = () => {
  const {initializing, user} = useAuth();

  if (initializing) {
    return (
      <SafeAreaView style={styles.safeView}>
        <View style={styles.container}>
          <Text>Initializing</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (user) {
    return (
      <SafeAreaView style={styles.safeView}>
        <View style={styles.container}>
          <Text>Welcome user</Text>
          <Button title="Sign Out" onPress={() => auth().signOut()} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <PhoneSignIn />
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

export default App;
