import firestore from '@react-native-firebase/firestore';
import {actionTypes, activityActionTypes} from './actionTypes';

const getTimeStamp = (dateString) => {
  const date = new Date();
  const [year, month, day] = dateString.split('-');
  date.setFullYear(
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10),
  );

  return firestore.Timestamp.fromDate(date);
};

const submitNewActivity = (
  selectedGroups,
  selectedDateStrings,
  userIsParticipant,
  userData,
  name,
) => {
  const db = firestore();
  const batch = db.batch();
  const userDocRef = db.collection('users').doc(userData.uid);

  if (!userData || userData === {}) {
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
      const docRef = db.collection('activities').doc();
      const participants = {};
      const date = getTimeStamp(dateString);

      if (false || userIsParticipant) {
        participants[`${userData.uid}`] = {
          uid: userData.uid,
          name: userData.displayName,
        };
      }
      const data = {
        date,
        name,
        group: {name: group.name, uid: group.uid},
        participants,
        uid: docRef.id,
      };
      if (false || userIsParticipant) {
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

        const userUpdate = {};
        userUpdate[`activities.${docRef.id}`] = {
          description: name,
          uid: docRef.id,
        };
        batch.update(userDocRef, userUpdate);
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
