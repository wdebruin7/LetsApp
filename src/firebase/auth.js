import React, {useContext, useReducer, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {userContext} from './userContext';
import userReducer from '../reducers/userReducer';
import {setUser, updateUserData} from '../actions/userActions';

const useSession = () => {
  const {user} = useContext(userContext);
  return user;
};

const initialState = () => {
  const user = auth().currentUser;
  return {
    initializing: !user,
    user,
    userData: null,
  };
};

const useAuth = () => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  function onChange(user) {
    dispatch(setUser(user));
  }

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(onChange);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!state.user || state.user.uid === undefined) return;
    const unsubscriber = firestore()
      .collection('users')
      .doc(state.user.uid)
      .onSnapshot(
        (documentSnapshot) => {
          dispatch(updateUserData(documentSnapshot.data()));
        },
        (error) => {
          console.log(error);
        },
      );

    return () => unsubscriber();
  }, [state.user]);

  return state;
};

export {useAuth, useSession};
