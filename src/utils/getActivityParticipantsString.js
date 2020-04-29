const getActivityParticipantsString = (
  activity,
  userData,
  userIsParticipant,
) => {
  if (!activity || !userData) return '';

  const participants = activity.participants
    .filter((participant) => participant.name !== userData.displayName)
    .map((participant) => participant.name.split(' ')[0]);

  const numParticipants = participants.length;

  switch (numParticipants) {
    case 0:
      if (userIsParticipant) return 'Nobody else is free... yet';
      else return 'Nobody is free... yet';
    case 1:
      return `${participants[0]} is free`;
    case 2:
      return `${participants[0]} and ${participants[1]} are free`;
    case 3:
      return `${participants[0]}, ${participants[1]}, and ${participants[2]} are free`;
    default:
      return participants[0]
        .concat(
          participants.slice(1, 2).map((participant) => `, ${participant}`),
        )
        .concat(`and ${numParticipants - 3} more are free`);
  }
};

export default getActivityParticipantsString;
