const getActivityActorsString = (groupedAction) => {
  const userNames = Object.values(groupedAction.users).map((user) => {
    console.log(user);
    const names = user.name.split(' ');
    const first = names[0];
    const last = names[names.length - 1];
    return `${first} ${last[0].toUpperCase()}`;
  });

  switch (userNames.length) {
    case 1:
      return userNames[0];
    case 2:
      return `${userNames[0]} and ${userNames[1]}`;
    default:
      return `${userNames[0]}, ${userNames[1]} + ${userNames.length - 2} more`;
  }
};

export default getActivityActorsString;
