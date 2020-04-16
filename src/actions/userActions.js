import userTypes from './userTypes';

export function setUser(user) {
  return {
    type: userTypes.SET,
    payload: user,
  };
}

export function updateUserData(userData) {
  return {
    type: userTypes.UPDATE,
    payload: userData,
  };
}
