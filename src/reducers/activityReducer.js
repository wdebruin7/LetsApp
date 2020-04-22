import activityTypes from '../actions/activityTypes';

export default function activityReducer(state, action) {
  switch (action.type) {
    case activityTypes.UPDATE: {
      // Create new date
      const date = new Date(0);
      date.setSeconds(action.payload.date._seconds);
      date.setHours(0, 0, 0, 0);

      // Remove activity if already exists
      state.forEach((day) => {
        // eslint-disable-next-line no-param-reassign
        day.activities = day.activities.filter(
          (elem) => elem.id !== action.payload.id,
        );
      });

      // Get day
      const filtered = state.filter((elem) => {
        const elemDate = new Date(elem);
        elemDate.setHours(0, 0, 0, 0);
        return elemDate.getTime() === date.getTime();
      });

      // Initialize day if not present
      const day = filtered[0] || {date, activities: []};

      // Add activity to day and push to list
      day.activities.push(action.payload);
      day.activities.sort((a, b) => a.groupName.localeCompare(b.groupName));

      // Return prev state with new day substituted in
      return state
        .filter((elem) => {
          return (
            elem.date.getTime() !== date.getTime() && elem.activities.length > 0
          );
        })
        .concat(day)
        .sort((a, b) => {
          if (a.date < b.date) return -1;
          else if (a.date > b.date) return 1;
          else return 0;
        });
    }
    default:
      return state;
  }
}
