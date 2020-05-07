import firestore from '@react-native-firebase/firestore';

const toggleUserIsParticipant = (userData, activityData) => {
  const userIsParticipant = activityData.participants.some(
    (elem) => elem.uid === userData.uid,
  );
  const batch = firestore().batch();
  const updateUserDoc = () => {
    const userRef = firestore().collection('users').doc(userData.uid);
    const {description, uid} = activityData;
    const activity = {description, uid};
    const update = userIsParticipant
      ? firestore.FieldValue.arrayRemove(activity)
      : firestore.FieldValue.arrayUnion(activity);
    batch.update(userRef, {activities: update});
  };
  const updateActivityDoc = () => {
    const activityRef = firestore()
      .collection('activities')
      .doc(activityData.uid);
    const {displayName, uid} = userData;
    const participant = {name: displayName, uid};
    const update = userIsParticipant
      ? firestore.FieldValue.arrayRemove(participant)
      : firestore.FieldValue.arrayUnion(participant);
    batch.update(activityRef, {participants: update});
  };
  updateUserDoc();
  updateActivityDoc();
  batch.commit().then(
    () => {},
    (error) => {
      console.log(error);
    },
  );
};

export default toggleUserIsParticipant;
