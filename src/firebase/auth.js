import React, {useContext, useReducer, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
<<<<<<< HEAD
=======
import firestore from '@react-native-firebase/firestore';
>>>>>>> 9c783cbe8cde46a15e269fdbbe748fe4d4d15b19
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

<<<<<<< HEAD
=======
  useEffect(() => {
    if (!state.user || state.user.uid === undefined) return;
    const subscriber = firestore()
      .collection('Users')
      .doc(state.user.uid)
      .onSnapshot(
        (documentSnapshot) => {
          console.log('User data: ', documentSnapshot.data());
        },
        (error) => {
          console.log(error);
        },
      );

    return () => subscriber();
  }, [state]);

>>>>>>> 9c783cbe8cde46a15e269fdbbe748fe4d4d15b19
  return state;
};

export {useAuth, useSession};
