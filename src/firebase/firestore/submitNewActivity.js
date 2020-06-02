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

  selectedGroups.forEach((group) => {
    selectedDateStrings.forEach((dateString) => {
      const date = timeStamp.fromDate(new Date(dateString));
      const docRef = db.collection('activities').doc();
      const data = {
        date,
        description,
        group: {name: group.name, uid: group.uid},
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
