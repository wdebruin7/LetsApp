import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useSession} from '../firebase/auth';

const Initial = ({navigation, firebase}) => {
  const session = useSession();

  if (session.user === null) {
    navigation.navigate('Auth');
  } else {
    navigation.navigate('App');
  }

  return (
    <SafeAreaView>
      <Text>Hold on while we get things set up</Text>
    </SafeAreaView>
  );
};

export default Initial;
