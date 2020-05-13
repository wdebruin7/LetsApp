import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const onNewAuth = async () => {
  const user = auth().currentUser;
  const db = firestore();
  if (!user) throw new Error('No user signed in');

  const query = db
    .collection('users')
    .where('phoneNumber', '==', user.phoneNumber);

  const uid = await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) return '-1';
    return querySnapshot.docs[0].data().uid;
  });

  const tempRef = db.collection('users').doc(uid);
  const userRef = db.collection('users').doc(user.uid);
  const tempDoc = await tempRef.get();
  const tempDocData = tempDoc.exists ? tempDoc.data() : {};

  const newUserData = {
    displayName: user.displayName || tempDocData.displayName,
    activities: [],
    groups: tempDocData.groups || [],
    email: tempDocData.email || user.email,
    phoneNumber: user.phoneNumber,
    uid: user.uid,
    photoURL: user.photoURL,
    userDataConfirmed: false,
  };

  const batch = db.batch();

  batch.set(userRef, newUserData);
  tempDocData.groups.forEach((group) => {
    const groupRef = db.collection('groups').doc(group.uid);
    const removeUpdate = firestore.FieldValue.arrayRemove({
      name: tempDocData.displayName,
      uid: tempDocData.uid,
    });
    const includeUpdate = firestore.FieldValue.arrayUnion({
      name: newUserData.displayName,
      uid: user.uid,
    });
    batch.update(groupRef, {members: removeUpdate});
    batch.update(groupRef, {members: includeUpdate});
  });

  return batch.commit();
};

export default onNewAuth;
