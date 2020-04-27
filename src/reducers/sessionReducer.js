import auth from '@react-native-firebase/auth';
import userTypes from '../actions/sessionTypes';

const initialState = () => {
  const user = auth().currentUser;
  return {
    initializing: !user,
    user,
  };
};

const sessionReducer = (state, action) => {
  switch (action.type) {
    case userTypes.SET:
      return {user: action.payload, initializing: false};
    default:
      return state;
  }
};

export {initialState, sessionReducer};
