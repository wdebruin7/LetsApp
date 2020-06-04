import firestore from '@react-native-firebase/firestore';
import {actionTypes, activityActionTypes} from './actionTypes';

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

  if (!userData) {
    return new Promise((resolve, reject) => {
      reject(new Error('No user data'));
    });
  }

  if (!selectedGroups || selectedGroups.lenght < 1) {
    return new Promise((resolve, reject) => {
      reject(new Error('No Selected Groups'));
    });
  }

  selectedGroups.forEach((group) => {
    selectedDateStrings.forEach((dateString) => {
      const date = timeStamp.fromDate(new Date(dateString));
      const docRef = db.collection('activities').doc();
      const data = {
        date,
        description: description || '',
        group: {name: group.name, uid: group.uid},
        participants:
          false || userIsParticipant
            ? [{uid: userData.uid, name: userData.displayName}]
            : [],
        uid: docRef.id,
      };
      if (false || userIsParticipant) {
        const activity = {description, uid: docRef.id};
        const update = firestore.FieldValue.arrayUnion(activity);
        const actionRef = db.collection('actions').doc();
        const actionData = {
          uid: actionRef.id,
          group: {
            uid: group.uid,
            name: group.name,
          },
          activity: {
            date,
            uid: docRef.id,
          },
          type: actionTypes.ACTIVITY,
          action: activityActionTypes.JOIN,
          user: {
            name: userData.displayName,
            uid: userData.uid,
          },
          hidden: false,
          timestamp: firestore.Timestamp.now(),
        };
        batch.set(actionRef, actionData);
        batch.update(userDocRef, {participants: update});
      }
      const actionRef = db.collection('actions').doc();
      const actionData = {
        uid: actionRef.id,
        group: {
          uid: group.uid,
          name: group.name,
        },
        activity: {
          date,
          uid: docRef.id,
        },
        type: actionTypes.ACTIVITY,
        action: activityActionTypes.CREATE,
        user: {
          name: userData.displayName,
          uid: userData.uid,
        },
        hidden: false,
        timestamp: firestore.Timestamp.now(),
      };
      batch.set(actionRef, actionData);
      batch.set(docRef, data);
    });
  });

  return batch.commit();
};

export default submitNewActivity;
