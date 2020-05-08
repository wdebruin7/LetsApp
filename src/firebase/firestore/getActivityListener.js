import firestore from '@react-native-firebase/firestore';

const getActivityListener = (userData, onSnapshot) => {
  if (!userData || !userData.groups) return () => {};

  const snapshotListeners = [];
  const groupIDs = userData.groups
    .map((group) => group.uid)
    .filter((uid) => uid);

  groupIDs.forEach((uid) => {
    const unsubscriber = firestore()
      .collection('activities')
      .where('group.uid', '==', uid)
      .onSnapshot(onSnapshot);
    snapshotListeners.push(() => unsubscriber());
  });

  return () => {
    snapshotListeners.forEach((unsubscriber) => unsubscriber());
  };
};

export default getActivityListener;
