import firestore from '@react-native-firebase/firestore';

const getGroupListener = (userData, onSnapshot) => {
  if (!userData || !userData.groups) return () => {};
  const snapshotListeners = [];
  const groupIDs = userData.groups.map((x) => x.groupDocumentID);

  groupIDs.forEach((groupDocumentID) => {
    const unsubscriber = firestore()
      .collection('groups')
      .where('uid', '==', groupDocumentID)
      .onSnapshot(onSnapshot);
    snapshotListeners.push(() => unsubscriber());
  });

  return () => {
    snapshotListeners.forEach((unsubscriber) => unsubscriber());
  };
};

export default getGroupListener;
