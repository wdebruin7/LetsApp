import types from './types';

export function setUser(user) {
  return {
    type: types.SET,
    payload: user,
  };
}

export function updateUserData(userData) {
  return {
    type: types.UPDATE,
    payload: userData,
  };
}
