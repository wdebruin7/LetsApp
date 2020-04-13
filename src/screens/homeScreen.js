import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, Button, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useSession} from '../firebase/auth';

const HomeScreen = ({navigation}) => {
  const session = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

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
