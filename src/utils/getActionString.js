const getDateString = (firestoreTimestamp) => {
  const date = firestoreTimestamp.toDate();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const ordinalIndicator = date.getDate() === 1 ? 'st' : 'th';

  return `${months[date.getMonth()]} ${date.getDate()}${ordinalIndicator}`;
};

const getActionString = (groupedAction) => {
  const {action, type} = groupedAction;
  let actionString = '';

  switch (action) {
    case 'JOIN':
      switch (type) {
        case 'ACTIVITY':
          actionString = `Added availability on ${getDateString(
            Object.values(groupedAction.activities)[0].date,
          )} in `;
          break;
        case 'GROUP':
          actionString = 'Joined ';
          break;
      }
      break;
    case 'CREATE':
      switch (type) {
        case 'ACTIVITY':
          actionString =
            groupedAction.activities.length > 1
              ? 'Added activities in '
              : 'Added an activity in ';
          break;
        case 'GROUP':
          actionString = 'Created';
          break;
      }
      break;
  }

  return actionString.concat(groupedAction.group.name);
};

export default getActionString;
