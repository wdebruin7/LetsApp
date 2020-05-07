import {useReducer, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {sessionReducer, initialState} from '../../reducers/sessionReducer';
import {setUser} from '../../actions/sessionActions';

const useAuth = () => {
  const [state, dispatch] = useReducer(sessionReducer, initialState());

  function onChange(user) {
    dispatch(setUser(user));
  }

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(onChange);
    return () => unsubscribe();
  }, []);

  return state;
};

export default useAuth;
