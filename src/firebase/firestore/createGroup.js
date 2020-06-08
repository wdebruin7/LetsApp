import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {actionTypes, groupActionTypes} from './actionTypes';

const createGroup = (groupName, imagePath, userData) => {
  const user = auth().currentUser;
  if (!auth) throw new Error('No user signed in');

  if (!userData) throw new Error('User data not supplied');

  const db = firestore();

  const groupRef = db.collection('groups').doc();
  const userRef = db.collection('users').doc(user.uid);
  const members = {};
  members[userData.uid] = {name: userData.displayName, uid: user.uid};

  const group = {
    name: groupName,
    members,
    thumbnailURL: '',
    thumbnailImagePath: '',
    uid: groupRef.id,
  };

  const batch = db.batch();

  const userUpdate = {};
  userUpdate[`groups.${groupRef.id}`] = {
    name: groupName,
    uid: groupRef.id,
  };

  const actionRef = db.collection('actions').doc();
  const actionData = {
    uid: actionRef.id,
    group: {
      uid: group.uid,
      name: group.name,
    },
    activity: {},
    type: actionTypes.GROUP,
    action: groupActionTypes.CREATE,
    user: {
      name: userData.displayName,
      uid: userData.uid,
    },
    hidden: false,
    timestamp: firestore.Timestamp.now(),
  };

  batch.set(actionRef, actionData);
  batch.update(userRef, userUpdate);
  batch.set(groupRef, group);

  return batch
    .commit()
    .then(() => {
      if (imagePath) {
        storage()
          .ref(`${group.uid}/thumbnail`)
          .putFile(imagePath)
          .then(() => {
            group.thumbnailImagePath = `${groupRef.id}/thumbnail`;
            db.collection('groups').doc(groupRef.id).set(group);
          });
      }
    })
    .then(() => group);
};

export default createGroup;
