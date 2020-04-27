import sessionTypes from './sessionTypes';

const setUser = (user) => {
  return {
    type: sessionTypes.SET,
    payload: user,
  };
};

// eslint-disable-next-line import/prefer-default-export
export {setUser};
