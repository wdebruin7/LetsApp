import activityTypes from '../actions/activityTypes';

const getUpdatedActivities = (activityDays, activity, removed) => {
  const newActivityDays = activityDays.filter(
    (day) =>
      day.activities.filter((elem) => elem.uid !== activity.uid).length > 0,
  );

  // Create new date
  const date = new Date(0);
  date.setSeconds(activity.date._seconds);
  date.setHours(0, 0, 0, 0);

  const dayPresent = newActivityDays.some(
    (day) => day.date.getTime() === date.getTime(),
  );

  return removed
    ? newActivityDays
    : dayPresent
    ? activityDays.map((day) =>
        day.date.getTime() === date.getTime()
          ? day
          : day.activities
              .filter((elem) => elem.uid !== activity.uid)
              .concat(activity),
      )
    : activityDays.concat({date, activities: [activity]}).sort((a, b) => {
        if (a.date < b.date) return -1;
        else if (a.date > b.date) return 1;
        else return 0;
      });
};

export default function activityReducer(state, action) {
  switch (action.type) {
    case activityTypes.UPDATE: {
      return getUpdatedActivities(state, action.payload);
    }
    case activityTypes.REMOVE: {
      return getUpdatedActivities(state, action.payload, true);
    }
    case activityTypes.CLEAR: {
      return [];
    }
    default:
      return state;
  }
}
