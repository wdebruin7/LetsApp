import types from '../actions/types';

export default function userReducer(state, action) {
  switch (action.type) {
    case types.SET:
      return {user: action.payload, initializing: false, userData: {}};
    case types.REMOVE:
      return {user: null, initializing: false, userData: {}};
    case types.UPDATE:
      return {...state, initializing: false, userData: action.payload};
    default:
      return state;
  }
}
