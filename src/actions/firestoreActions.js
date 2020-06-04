import firestoreTypes from './firestoreTypes';

const updateActivity = (activity) => {
  return {
    type: firestoreTypes.UPDATE_ACTIVITY,
    payload: activity,
  };
};

const removeActivity = (activity) => {
  return {
    type: firestoreTypes.REMOVE_ACTIVITY,
    payload: activity,
  };
};

const updateGroup = (group) => {
  return {
    type: firestoreTypes.UPDATE_GROUP,
    payload: group,
  };
};

const removeGroup = (group) => {
  return {
    type: firestoreTypes.REMOVE_GROUP,
    payload: group,
  };
};

const updateUser = (user) => {
  return {
    type: firestoreTypes.UPDATE_USER,
    payload: user,
  };
};

const clear = () => {
  return {
    type: firestoreTypes.CLEAR,
  };
};

const updateAction = (activity) => {
  return {
    type: firestoreTypes.UPDATE_ACTION,
    payload: activity,
  };
};

const removeAction = (activity) => {
  return {
    type: firestoreTypes.UPDATE_ACTION,
    payload: activity,
  };
};

export {
  updateActivity,
  removeActivity,
  updateGroup,
  removeGroup,
  updateUser,
  clear,
  updateAction,
  removeAction,
};
