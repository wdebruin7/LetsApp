import firestore from '@react-native-firebase/firestore';
import {actionTypes, activityActionTypes} from './actionTypes';

const toggleUserIsParticipant = (userData, activityData) => {
  const userIsParticipant = activityData.participants.some(
    (elem) => elem.uid === userData.uid,
  );
  const db = firestore();
  const batch = db.batch();

  const updateUserDoc = () => {
    const userRef = db.collection('users').doc(userData.uid);
    const {description, uid} = activityData;
    const activity = {description, uid};
    const update = userIsParticipant
      ? firestore.FieldValue.arrayRemove(activity)
      : firestore.FieldValue.arrayUnion(activity);
    batch.update(userRef, {activities: update});
  };

  const updateActivityDoc = () => {
    const activityRef = db.collection('activities').doc(activityData.uid);
    const {displayName, uid} = userData;
    const participant = {name: displayName, uid};
    const update = userIsParticipant
      ? firestore.FieldValue.arrayRemove(participant)
      : firestore.FieldValue.arrayUnion(participant);
    batch.update(activityRef, {participants: update});
  };

  updateUserDoc();
  updateActivityDoc();

  return batch.commit().then(() => {
    db.collection('actions')
      .where('activity.uid', '==', activityData.uid)
      .where('user.uid', '==', userData.uid)
      .where('action', '==', activityActionTypes.JOIN)
      .get()
      .then((querySnapshot) => {
        const actionRef = querySnapshot.empty
          ? db.collection('actions').doc()
          : db.collection('actions').doc(querySnapshot.docs[0].id);

        const actionData = {
          uid: actionRef.id,
          group: {
            uid: activityData.group.uid,
            name: activityData.group.name,
          },
          activity: {
            uid: activityData.uid,
            date: activityData.date,
          },
          type: actionTypes.ACTIVITY,
          action: activityActionTypes.JOIN,
          user: {
            name: userData.displayName,
            uid: userData.uid,
          },
          hidden: userIsParticipant,
          timestamp: firestore.Timestamp.now(),
        };
        return actionRef.set(actionData);
      });
  });
};

export default toggleUserIsParticipant;
