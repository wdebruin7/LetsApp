import activityTypes from '../actions/activityTypes';

export default function activityReducer(state, action) {
  const newState = state;
  switch (action.type) {
    case activityTypes.UPDATE:
      for (let i = 0; i < state.length; i++) {
        if (state[i].date === action.payload.date) {
          const activities = state[i].activities.filter(
            (x) => x.uid !== action.payload.uid,
          );
          activities.push(action.payload);
          activities.sort((a, b) => {
            if (a.groupName < b.groupName) return -1;
            else if (a.groupName > b.groupName) return 1;
            else return 0;
          });
          newState[i].activities = activities;
          return newState;
        }
      }
      newState.push({date: action.payload.date, activities: [action.payload]});
      return newState;
    default:
      return state;
  }
}
