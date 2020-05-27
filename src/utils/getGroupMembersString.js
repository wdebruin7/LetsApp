const getGroupMembersString = (group, userData, long) => {
  const otherMembers = group.members.filter(
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
