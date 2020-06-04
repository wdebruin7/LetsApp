import firestoreTypes from '../actions/firestoreTypes';

const initialState = () => {
  return {
    groups: null,
    activities: null,
    actions: null,
    user: {
      data: null,
      initializing: true,
    },
  };
};

const getUpdatedActions = (actions, action, removed) => {
  const newActions = {...actions};
  if (removed) {
    delete newActions[action.uid];
  } else {
    newActions[action.uid] = action;
  }
  return newActions;
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
        day.date.getTime() !== date.getTime()
          ? day
          : {
              date: day.date,
              activities: day.activities
                .filter((elem) => elem.uid !== activity.uid)
                .concat(activity)
                .sort((a, b) => {
                  if (a.group.name < b.group.name) return -1;
                  else if (a.group.name > b.group.name) return 1;
                  else return 0;
                }),
            },
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
        groups: getUpdatedGroups(state.groups, action.payload),
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
    case firestoreTypes.UPDATE_ACTION: {
      return {
        ...state,
        actions: getUpdatedActions(state.actions, action.payload, false),
      };
    }
    case firestoreTypes.REMOVE_ACTION: {
      return {
        ...state,
        actions: getUpdatedActions(state.actions, action.payload, true),
      };
    }
    case firestoreTypes.CLEAR: {
      return initialState();
    }
    default:
      return state;
  }
};

export {initialState, firestoreReducer};
