import firestore from '@react-native-firebase/firestore';
import {actionTypes, activityActionTypes} from './actionTypes';

const toggleUserIsParticipant = (userData, activityData) => {
  const userIsParticipant =
    activityData.participants[userData.uid] !== undefined;
  const db = firestore();
  const batch = db.batch();

  const userRef = db.collection('users').doc(userData.uid);
  const userUpdate = {};
  userUpdate[`activities.${activityData.uid}`] = userIsParticipant
    ? firestore.FieldValue.delete()
    : {description: activityData.description, uid: activityData.uid};
  batch.update(userRef, userUpdate);

  console.log(userUpdate);

  const activityRef = db.collection('activities').doc(activityData.uid);
  const activityUpdate = {};
  activityUpdate[`participants.${userData.uid}`] = userIsParticipant
    ? firestore.FieldValue.delete()
    : {name: userData.displayName, uid: userData.uid};
  batch.update(activityRef, activityUpdate);

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
