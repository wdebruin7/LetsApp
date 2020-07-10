import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const leaveGroup = (groupUID, userData) => {
  if (!groupUID) {
    return new Promise((resolve, reject) => {
      reject(new Error('No groupUID provided'));
    });
  }

  if (!userData) {
    return new Promise((resolve, reject) => {
      reject(new Error('No user data provided'));
    });
  }

  if (!auth().currentUser) {
    return new Promise((resolve, reject) =>
      reject(new Error('No user authenticated')),
    );
  }

  const db = firestore();
  const groupRef = db.collection('groups').doc(groupUID);
  return db.runTransaction((transaction) => {
    return transaction.get(groupRef).then((documentSnapshot) => {
      const data = documentSnapshot.data();

      if (!data) {
        return new Promise((resolve, reject) => {
          reject(new Error('Invalid Group'));
        });
      }
      const groupUpdate = {};
      const groupFieldName = `members.${userData.uid}`;
      const groupFieldVal = firestore.FieldValue.delete();
      groupUpdate[groupFieldName] = groupFieldVal;

      const userRef = db.collection('users').doc(userData.uid);
      const userUpdate = {};
      const userFieldName = `groups.${data.uid}`;
      const userFieldVal = firestore.FieldValue.delete();
      userUpdate[userFieldName] = userFieldVal;

      transaction.get(userRef);
      transaction.update(userRef, userUpdate);
      transaction.update(groupRef, groupUpdate);
      return data;
    });
  });
};

export default leaveGroup;
