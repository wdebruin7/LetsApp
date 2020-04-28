import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const getUserListener = (user, onSnapshot) => {
  if (!user) return () => {};
  const unsubscriber = firestore()
    .collection('users')
    .doc(user.uid)
    .onSnapshot(onSnapshot);

  return () => unsubscriber();
};

const getActivityListener = (userData, onSnapshot) => {
  if (!userData || !userData.groups) return () => {};

  const snapshotListeners = [];
  const groupIDs = userData.groups.map((x) => x.groupDocumentID);

  for (let i = 0; i < groupIDs.length; i += 10) {
    const groupIDSlice = groupIDs.slice(i, i + 10);
    const unsubscriber = firestore()
      .collection('activities')
      .where('groupDocumentID', 'in', groupIDSlice)
      .onSnapshot(
        (querySnapshot) => {
          console.log(querySnapshot);
        },
        (error) => {
          console.log(error);
        },
        (completion) => {
          console.log('completion');
        },
      );
    snapshotListeners.push(() => unsubscriber());
  }

  return () => {
    snapshotListeners.forEach((unsubscriber) => unsubscriber());
  };
};

const getGroupListener = (userData, onSnapshot) => {
  if (!userData || !userData.groups) return () => {};
  const snapshotListeners = [];
  const groupIDs = userData.groups.map((x) => x.groupDocumentID);

  for (let i = 0; i < groupIDs.length; i += 10) {
    const ref = firestore()
      .collection('groups')
      .where('uid', 'in', groupIDs.slice(i, i + 10));
    const unsubscriber = ref.onSnapshot(onSnapshot);
    snapshotListeners.push(() => unsubscriber());
  }

  return () => {
    snapshotListeners.forEach((unsubscriber) => unsubscriber());
  };
};

const initializeUserInDatabase = async (newUserData) => {
  const user = auth().currentUser;
  if (!user) throw new Error('No user currently signed in');
  const userData = {
    displayName: user.displayName,
    creationtime: user.metadata.creationTime,
    phoneNumber: user.phoneNumber,
    uid: user.uid,
    ...newUserData,
  };
  const userDocRef = firestore().collection('users').doc(userData.uid);
  userDocRef.set(userData, {merge: true});
};

const toggleUserIsParticipant = (userData, activityData) => {
  const user = auth().currentUser;
  if (!user) throw new Error('No user currently signed in');

  const userIsParticipant = activityData.participants.some(
    (elem) => elem.uid === userData.uid,
  );

  const batch = firestore().batch();

  const updateUserDoc = () => {
    const userRef = firestore().collection('users').doc(user.uid);
    const {description, uid} = activityData;
    const activity = {description, uid};
    const update = userIsParticipant
      ? firestore.FieldValue.arrayRemove(activity)
      : firestore.FieldValue.arrayUnion(activity);
    batch.update(userRef, {activities: update});
  };

  const updateActivityDoc = () => {
    const activityRef = firestore()
      .collection('activities')
      .doc(activityData.uid);
    const {displayName, uid} = userData;
    const participant = {name: displayName, uid};
    const update = userIsParticipant
      ? firestore.FieldValue.arrayRemove(participant)
      : firestore.FieldValue.arrayUnion(participant);
    batch.update(activityRef, {participants: update});
  };

  updateUserDoc();
  updateActivityDoc();

  batch.commit().then(
    () => {},
    (error) => {
      console.log(error);
    },
  );
};

export {
  getGroupListener,
  getActivityListener,
  initializeUserInDatabase,
  toggleUserIsParticipant,
  getUserListener,
};
