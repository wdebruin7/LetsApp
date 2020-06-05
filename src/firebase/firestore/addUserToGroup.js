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
      const groupUpdate = firestore.FieldValue.arrayUnion({
        name: userData.displayName,
        uid: userData.uid,
      });

      const userRef = db.collection('users').doc(userData.uid);
      const userUpdate = firestore.FieldValue.arrayUnion({
        name: data.name,
        uid: data.uid,
      });

      transaction.get(userRef);
      transaction.update(userRef, {groups: userUpdate});
      transaction.update(groupRef, {members: groupUpdate});
      return data;
    });
  });
};

export default addUserToGroup;
