import activityTypes from './activityTypes';

// eslint-disable-next-line import/prefer-default-export
export function updateActivity(activity) {
  return {
    type: activityTypes.UPDATE,
    payload: activity,
  };
}
