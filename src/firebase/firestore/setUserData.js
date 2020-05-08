import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const setUserData = async (newUserData) => {
  const user = auth().currentUser;
  if (!user) {
    throw new Error('No user currently signed in');
  }
  const userRef = firestore().collection('users').doc(user.uid);
  try {
    await firestore().runTransaction((transaction) => {
      return transaction.get(userRef).then((document) => {
        const docData = !document.exists
          ? {
              displayName: user.displayName,
              creationtime: user.metadata.creationTime,
              phoneNumber: user.phoneNumber,
              uid: user.uid,
            }
          : {...document.data(), ...newUserData};
        transaction.set(userRef, docData);
      });
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default setUserData;
