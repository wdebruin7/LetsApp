import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {SafeAreaView, Text} from 'react-native';
import {useSession} from '../firebase/auth';

const Initial = ({navigation, firebase}) => {
  const user = useSession();

  if (user === null) {
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
