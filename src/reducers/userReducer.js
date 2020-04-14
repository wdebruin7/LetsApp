import userTypes from '../actions/userTypes';

export default function userReducer(state, action) {
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
}
