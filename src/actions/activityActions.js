import activityTypes from './activityTypes';

const updateActivity = (activity) => {
  return {
    type: activityTypes.UPDATE,
    payload: activity,
  };
};

const removeActivity = (activity) => {
  return {
    type: activityTypes.REMOVE,
    payload: activity,
  };
};

const clearActivities = () => {
  return {
    type: activityTypes.CLEAR,
  };
};

export {updateActivity, removeActivity, clearActivities};
