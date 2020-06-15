const getActivityParticipantsString = (
  activity,
  userData,
  userIsParticipant,
  long,
) => {
  if (!activity || userData === {}) return '';

  const participants = Object.values(activity.participants);

  const userParticipating =
    userIsParticipant ||
    participants.some((participant) => participant.uid === userData.uid);

  const otherParticipants = long
    ? participants
        .filter((participant) => participant.uid !== userData.uid)
        .map((participant) => participant.name)
    : participants
        .filter((participant) => participant.name !== userData.displayName)
        .map((participant) => participant.name.split(' ')[0]);

  const numOtherParticipants = otherParticipants.length;

  switch (numOtherParticipants) {
    case 0:
      if (userParticipating) return 'Nobody else is free... yet';
      else return 'Nobody is free... yet';
    case 1:
      return `${otherParticipants[0]} is free`;
    case 2:
      return `${otherParticipants[0]} and ${otherParticipants[1]} are free`;
    case 3:
      return `${otherParticipants[0]}, ${otherParticipants[1]}, and ${otherParticipants[2]} are free`;
    default:
      return long
        ? otherParticipants[0]
            .concat(
              otherParticipants
                .slice(1, numOtherParticipants - 1)
                .map((participant) => `, ${participant}`),
            )
            .concat(`, and ${otherParticipants[numOtherParticipants]} are free`)
        : otherParticipants[0]
            .concat(
              otherParticipants
                .slice(1, 2)
                .map((participant) => `, ${participant}`),
            )
            .concat(`and ${numOtherParticipants - 3} more are free`);
  }
};

export default getActivityParticipantsString;
