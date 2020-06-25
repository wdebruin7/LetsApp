const getActivityActorsString = (groupedAction) => {
  const users = groupedAction.users.map((user) => {
    const names = user.name.split(' ');
    const first = names[0];
    const last = names[names.length - 1];
    return first.concat([' ', last[0].toUpperCase()]);
  });

  switch (users.length) {
    case 1:
      return users[0];
    case 2:
      return `${users[0]} and ${users[1]}`;
    default:
      return `${users[0]}, ${users[1]} + ${users.length - 2} more`;
  }
};

export default getActivityActorsString;
