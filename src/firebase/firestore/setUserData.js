import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const setUserData = async (newUserData) => {
  const user = auth().currentUser;
  if (!user) {
    throw new Error('No user currently signed in');
  }
  const userRef = firestore().collection('users').doc(user.uid);

  return firestore().runTransaction((transaction) => {
    return transaction.get(userRef).then((document) => {
      const docData = document.exists
        ? {...document.data(), ...newUserData, userDataConfirmed: true}
        : {
            displayName: user.displayName,
            phoneNumber: user.phoneNumber,
            uid: user.uid,
            activities: {},
            groups: {},
            email: user.email,
            photoURL: user.photoURL,
            userDataConfirmed: true,
            ...newUserData,
          };
      transaction.set(userRef, docData);
    });
  });
};

export default setUserData;
