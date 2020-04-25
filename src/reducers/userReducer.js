import auth from '@react-native-firebase/auth';
import userTypes from '../actions/userTypes';

const initialState = () => {
  const user = auth().currentUser;
  return {
    initializing: !user,
    user,
    userData: {},
  };
};

const userReducer = (state, action) => {
  switch (action.type) {
    case userTypes.SET:
      return {user: action.payload, initializing: false, userData: {}};
    case userTypes.REMOVE:
      return {user: null, initializing: false, userData: {}};
    case userTypes.UPDATE:
      return {...state, initializing: false, userData: action.payload};
    default:
      return state;
  }
};

export {initialState, userReducer};
