import firestoreTypes from '../actions/firestoreTypes';

const initialState = {
  groups: null,
  activities: null,
  user: {
    data: null,
    initializing: true,
  },
};

const getUpdatedActivities = (activityDays, activity, removed) => {
  const newActivityDays = activityDays
    ? activityDays.filter(
        (day) =>
          day.activities.filter((elem) => elem.uid !== activity.uid).length > 0,
      )
    : [];

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
    ? newActivityDays.map((day) =>
        day.date.getTime() === date.getTime()
          ? day
          : day.activities
              .filter((elem) => elem.uid !== activity.uid)
              .concat(activity),
      )
    : newActivityDays.concat({date, activities: [activity]}).sort((a, b) => {
        if (a.date < b.date) return -1;
        else if (a.date > b.date) return 1;
        else return 0;
      });
};

const getUpdatedGroups = (groups, group, removed) => {
  const newGroups = {...groups};
  if (removed) {
    delete newGroups[group.uid];
  } else {
    newGroups[group.uid] = group;
  }
  return newGroups;
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case firestoreTypes.UPDATE_ACTIVITY: {
      return {
        ...state,
        activities: getUpdatedActivities(state.activities, action.payload),
      };
    }
    case firestoreTypes.REMOVE_ACTIVITY: {
      return {
        ...state,
        activities: getUpdatedActivities(
          state.activities,
          action.payload,
          true,
        ),
      };
    }
    case firestoreTypes.UPDATE_GROUP: {
      return {
        ...state,
        groups: getUpdatedActivities(state.groups, action.payload),
      };
    }
    case firestoreTypes.REMOVE_GROUP: {
      return {
        ...state,
        groups: getUpdatedGroups(state.groups, action.payload, true),
      };
    }
    case firestoreTypes.UPDATE_USER: {
      return {
        ...state,
        user: {data: action.payload, initializing: false},
      };
    }
    case firestoreTypes.CLEAR: {
      return [];
    }
    default:
      return state;
  }
};

export {initialState, firestoreReducer};
