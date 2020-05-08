import firestore from '@react-native-firebase/firestore';

const submitNewActivity = (
  selectedGroups,
  selectedDateStrings,
  userIsParticipant,
  userData,
  description,
) => {
  const db = firestore();
  const batch = db.batch();
  const timeStamp = firestore.Timestamp;
  const userDocRef = db.collection('users').doc(userData.uid);

  selectedGroups.forEach((group) => {
    selectedDateStrings.forEach((dateString) => {
      const date = timeStamp.fromDate(new Date(dateString));
      const docRef = db.collection('activities').doc();
      const data = {
        date,
        description,
        groupDocumentID: group.groupDocumentID,
        groupName: group.name,
        participants: userIsParticipant
          ? [{uid: userData.uid, name: userData.displayName}]
          : [],
        uid: docRef.id,
      };
      if (userIsParticipant) {
        const activity = {description, uid: docRef.id};
        const update = firestore.FieldValue.arrayUnion(activity);
        batch.update(userDocRef, {participants: update});
      }
      batch.set(docRef, data);
    });
  });

  batch
    .commit()
    .then(() => console.log('success!'))
    .catch(() => console.log('Bugger failed :('));
};

export default submitNewActivity;
