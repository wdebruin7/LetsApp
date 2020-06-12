const getGroupMembersString = (group, userData, long) => {
  if (!userData || userData === {}) {
    const names = Object.values(group.members).map((member) => member.name);
    switch (names.length) {
      case 0:
        return '';
      case 1:
        return names[0];
      case 2:
        return `${names[0]} and ${names[1]}`;
      case 3:
        return `${names[0]}, ${names[1]}, and ${names[2]}`;
      default:
        return names
          .slice(0, names.length - 1)
          .map((name) => `${name}, `)
          .concat(`and ${names[names.length - 1]}`)
          .join('');
    }
  }
  const otherMembers = Object.values(group.members).filter(
    (member) => member.uid !== userData.uid,
  );

  switch (otherMembers.length) {
    case 0:
      return 'You are the only member. Invite some friends!';
    case 1:
      return `You and ${otherMembers[0].name} are the only members.`;
    case 2:
      return `You, ${otherMembers[0].name}, and ${otherMembers[1].name}`;
    case 3:
      return `You, ${otherMembers[0].name}, ${otherMembers[1].name}, and ${otherMembers[2].name}`;
    default:
      return `You, ${otherMembers[0].name}, ${otherMembers[1].name} + ${
        otherMembers.length - 2
      } more`;
  }
};

export default getGroupMembersString;
