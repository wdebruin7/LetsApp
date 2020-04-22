import activityTypes from '../actions/activityTypes';

export default function activityReducer(state, action) {
  switch (action.type) {
    case activityTypes.UPDATE: {
      state.forEach((day) => {
        // eslint-disable-next-line no-param-reassign
        day.activities = day.activities.filter(
          (elem) => elem.id !== action.payload.id,
        );
      });

      const filtered = state.filter(
        (elem) => elem.date._seconds === action.payload.date._seconds,
      );
      const day = filtered[0]
        ? filtered[0]
        : {date: action.payload.date, activities: []};

      day.activities = day.activities.filter(
        (activity) => activity.id !== action.payload.id,
      );

      day.activities.push(action.payload);
      day.activities.sort((a, b) => a.groupName.localeCompare(b.groupName));

      return state
        .filter((elem) => {
          return (
            elem.date._seconds !== action.payload.date._seconds &&
            elem.activities.length > 0
          );
        })
        .concat(day)
        .sort((a, b) => {
          if (a.date._seconds < b.date._seconds) return -1;
          else if (a.date._seconds > b.date._seconds) return 1;
          else return 0;
        });
    }
    default:
      return state;
  }
}
