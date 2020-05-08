import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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
  await userDocRef.set(userData, {merge: true});
};

export default initializeUserInDatabase;
