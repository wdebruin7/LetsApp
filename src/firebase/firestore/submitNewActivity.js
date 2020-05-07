import firestore from '@react-native-firebase/firestore';

const submitNewActivity = (selectedGroups, selectedDateStrings) => {
  const db = firestore();
  const batch = db.batch();
  const timeStamp = firestore.Timestamp;

  selectedGroups.forEach((group) => {
    selectedDateStrings.forEach((dateString) => {
      const date = timeStamp.fromDate(new Date(dateString));
      const docRef = db.collection('activities').doc();
      const data = {
        date,
        description: '',
        groupDocumentID: group.groupDocumentID,
        groupName: group.name,
        participants: [],
        uid: docRef.id,
      };
      batch.set(docRef, data);
    });
  });

  batch
    .commit()
    .then(() => console.log('success!'))
    .catch(() => console.log('Bugger failed :('));
};

export default submitNewActivity;
