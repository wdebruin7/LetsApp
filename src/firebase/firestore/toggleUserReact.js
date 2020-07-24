import firestore from '@react-native-firebase/firestore';

const toggleUserReact = (reaction, activityUID, userData) => {
  const db = firestore();
  const batch = db.batch();

  const userHasReacted = Object.keys(reaction.users).some(
    (uid) => uid === userData.uid,
  );

  const activityRef = db.collection('activities').doc(activityUID);

  const countUpdate = {};
  countUpdate[`reactions.${reaction.emoji}.count`] = userHasReacted
    ? firestore.FieldValue.increment(-1)
    : firestore.FieldValue.increment(-1);

  batch.update(activityRef, countUpdate);

  const usersUpdate = {};
  usersUpdate[
    `reactions.${reaction.emoji}.users.${userData.uid}`
  ] = userHasReacted
    ? firestore.FieldValue.delete
    : {
        name: userData.displayName,
        timestamp: firestore.Timestamp.now(),
        uid: userData.uid,
      };

  batch.update(activityRef, usersUpdate);

  return batch.commit();
};

export default toggleUserReact;
