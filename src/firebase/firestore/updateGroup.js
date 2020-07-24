import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

// groupUID: uid of group to be updated
// groupName: updated name of group
// groupImagePath: updated path to group profile image
// removedMembers: array of user, {uid, name, imagePath}, objects to be removed from group member list

const updateGroup = (groupUID, groupName, groupImagePath, removedMembers) => {
  const db = firestore();

  if (!groupUID) {
    return new Promise((resolve, reject) => {
      reject(new Error('No groupUID provided'));
    });
  }

  const groupRef = db.collection('groups').doc(groupUID);

  const batch = db.batch();

  if (groupName) {
    batch.update(groupRef, {name: groupName});
  }

  if (groupImagePath) {
    storage()
      .ref(`${groupUID}/thumbnail`)
      .putFile(groupImagePath)
      .then(() => {
        batch.update(groupRef, {thumbnailImagePath: groupImagePath});
      });
  }

  if (removedMembers) {
    removedMembers.forEach((user) => {
      const groupUpdate = {};
      const groupFieldName = `members.${user.uid}`;
      groupUpdate[groupFieldName] = firestore.FieldValue.delete();
      batch.update(groupRef, groupUpdate);

      const userRef = db.collection('users').doc(user.uid);
      const userUpdate = {};
      const userFieldName = `groups.${groupUID}`;
      userUpdate[userFieldName] = firestore.FieldValue.delete();
      batch.update(userRef, userUpdate);
    });
  }

  return batch.commit();
};

export default updateGroup;
