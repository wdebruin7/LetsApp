import {
  activityActionTypes,
  groupActionTypes,
  actionTypes,
} from '../firebase/firestore/actionTypes';

const groupActions = (actions, userData) => {
  const groupedActions = [];
  let actionArray = Object.values(actions);
  if (!userData || userData === {}) return [];

  while (actionArray.length > 0) {
    const action = actionArray.pop();

    if (
      action.hidden ||
      action.user.uid === userData.uid ||
      (action.action === 'CREATE' && action.type === actionTypes.GROUP)
    ) {
      continue;
    }

    const groupedAction = {
      action: action.action,
      activities: [action.activity],
      group: action.group,
      date: action.timestamp.toDate(),
      type: action.type,
      users: [action.user],
    };

    if (
      action.action === activityActionTypes.JOIN ||
      action.action === groupActionTypes.JOIN
    ) {
      actionArray = actionArray.filter((elem) => {
        if (elem.hidden) return false;
        if (elem.user.uid === userData.uid) return false;

        if (elem.action !== action.action) return true;
        if (elem.type !== action.type) return true;
        if (elem.group.uid !== action.group.uid) return true;

        groupedAction.users.push(elem.user);
        groupedAction.activities.push(elem.activity);

        const elemDate = elem.timestamp.toDate();
        if (elemDate.getTime() > groupedAction.date.getTime()) {
          groupedAction.date = elemDate;
        }

        return false;
      });
    }
    groupedActions.push(groupedAction);
  }

  return groupedActions;
};

export default groupActions;
