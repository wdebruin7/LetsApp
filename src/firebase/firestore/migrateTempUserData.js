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
    if (querySnapshot.empty) return undefined;
    return querySnapshot.docs[0].data().uid;
  });

  const tempRef = db.collection('users').doc(uid);
  const userRef = db.collection('users').doc(auth.uid);

  await db.runTransaction((transaction) => {
    return transaction.get(tempRef).then((tempDoc) => {
      const tempDocData = tempDoc.data() || {};
      const newUserData = {
        ...tempDocData,
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
        uid: user.uid,
        photoURL: user.photoURL,
      };
      transaction.set(userRef, newUserData);
    });
  });
};

export default onNewAuth;
