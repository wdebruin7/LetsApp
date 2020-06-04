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

const getUpdatedActivities = (activities, activity, removed) => {
  const newActivities = {...activities};
  if (removed) {
    delete newActivities[activity.uid];
  } else {
    newActivities[activity.uid] = activity;
  }
  return newActivities;
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
        activities: getUpdatedActivities(
          state.activities,
          action.payload,
          false,
        ),
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
        groups: getUpdatedGroups(state.groups, action.payload, false),
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
