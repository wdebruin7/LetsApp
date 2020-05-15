import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const createGroup = (groupName, imagePath) => {
  const user = auth().currentUser;
  if (!auth) throw new Error('No user signed in');

  const db = firestore();

  const groupRef = db.collection('groups').doc();
  const userRef = db.collection('users').doc(user.uid);

  const group = {
    name: groupName,
    members: [],
    thumbnailURL: '',
    uid: groupRef.id,
  };

  const batch = db.batch();

  const update = firestore.FieldValue.arrayUnion({
    name: groupName,
    uid: groupRef.id,
  });

  batch.update(userRef, {groups: update});
  batch.set(groupRef, group);

  return batch.commit();
};

export default createGroup;
