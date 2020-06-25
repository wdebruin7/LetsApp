const getActionString = (groupedAction) => {
  const {action, type} = groupedAction;
  let actionString = '';

  switch (action) {
    case 'JOIN':
      switch (type) {
        case 'ACTIVITY':
          actionString = 'Added availability in ';
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
