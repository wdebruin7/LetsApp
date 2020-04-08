import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {useSession} from '../firebase/auth';

const Initial = ({navigation, firebase}) => {
  const user = useSession();

  if (user) {
    navigation.navigate('App');
  } else {
    navigation.navigate('Auth');
  }
};
