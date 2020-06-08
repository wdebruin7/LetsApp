import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const addUserToGroup = (groupUID, userData) => {
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
      const groupFieldVal = {
        name: userData.displayName,
        uid: userData.uid,
      };
      groupUpdate[groupFieldName] = groupFieldVal;

      const userRef = db.collection('users').doc(userData.uid);
      const userUpdate = {};
      const userFieldName = `groups.${data.uid}`;
      const userFieldVal = {
        name: data.name,
        uid: data.uid,
      };
      userUpdate[userFieldName] = userFieldVal;

      transaction.get(userRef);
      transaction.update(userRef, {groups: userUpdate});
      transaction.update(groupRef, {members: groupUpdate});
      return data;
    });
  });
};

export default addUserToGroup;
