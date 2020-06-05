import firestore from '@react-native-firebase/firestore';

const listenerTypes = {
  GROUP: 'groups',
  ACTIVITY: 'activities',
  ACTION: 'actions',
};

const getFirestoreListener = (userData, onSnapshot, listenerType) => {
  if (!userData || !userData.groups) return () => {};

  const snapshotListeners = [];
  const groupIDs = Object.values(userData.groups)
    .map((group) => group.uid)
    .filter((uid) => uid);

  groupIDs.forEach((uid) => {
    const searchField = listenerType === 'groups' ? 'uid' : 'group.uid';
    const unsubscriber = firestore()
      .collection(listenerType)
      .where(searchField, '==', uid)
      .onSnapshot(onSnapshot);
    snapshotListeners.push(() => unsubscriber());
  });

  return () => {
    snapshotListeners.forEach((unsubscriber) => unsubscriber());
  };
};

export {listenerTypes, getFirestoreListener};
