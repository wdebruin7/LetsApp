const groupActions = (actions, userData) => {
  const groupedActions = {};

  Object.values(actions).forEach((action) => {
    if (userData && action.user.uid === userData.uid) return;

    let key;
    const date = action.timestamp.toDate();
    date.setHours(0, 0, 0, 0);
    const activityDate = action.activity.date
      ? action.activity.date.toDate()
      : undefined;
    if (activityDate) activityDate.setHours(0, 0, 0, 0);

    if (action.action === 'JOIN' && action.type === 'ACTIVITY') {
      key = JSON.stringify({
        action: 'JOIN',
        type: 'ACTIVITY',
        date,
        groupUID: action.group.uid,
        activityDate,
      });
    } else if (action.action === 'JOIN' && action.type === 'GROUP') {
      key = JSON.stringify({
        action: 'JOIN',
        type: 'GROUP',
        date,
        groupUID: action.group.uid,
      });
    } else if (action.action === 'CREATE' && action.type === 'ACTIVITY') {
      key = JSON.stringify({
        action: 'CREATE',
        type: 'ACTIVITY',
        date,
        actor: action.user.uid,
      });
    }

    if (key && !action.hidden) {
      const actionExists = !!groupedActions[key];
      if (!actionExists) {
        groupedActions[key] = {
          action: action.action,
          activities: {},
          group: action.group,
          date,
          type: action.type,
          users: {},
        };
      }
      groupedActions[key].users[action.user.uid] = action.user;
      groupedActions[key].activities[action.activity.uid] = action.activity;
    }
  });

  return Object.values(groupedActions).sort((a, b) => {
    if (a.date < b.date) return 1;
    else if (a.date > b.date) return -1;
    else return 0;
  });
};

export default groupActions;
