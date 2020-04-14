import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, Button, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useSession } from '../firebase/auth';
import { getActivities } from '../firebase';

const HomeScreen = ({ navigation }) => {
  const session = useSession();

  const handleSignOut = async () => {
    auth().signOut();
  };

  const onSnapshot = (querySnapshot) => {
    querySnapshot.forEach((documentSnapshot) =>
      console.log(documentSnapshot.data()),
    );
  };

  useEffect(() => {
    if (!session.userData || session.userData.groups === undefined) return;
    try {
      const unsubscriber = getActivities(onSnapshot, session.userData.groups);
      return () => unsubscriber();
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

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
