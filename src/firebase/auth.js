import React, {useContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {userContext} from './userContext';

const useSession = () => {
  const {user} = useContext(userContext);
  return user;
};

const useAuth = () => {
  const [state, setState] = useState(() => {
    const user = auth().currentUser;
    return {
      initializing: !user,
      user,
    };
  });

  function onChange(user) {
    setState({initializing: false, user});
  }

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(onChange);
    return () => unsubscribe();
  }, []);

  return state;
};

export {useAuth, useSession};
