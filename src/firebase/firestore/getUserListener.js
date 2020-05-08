import firestore from '@react-native-firebase/firestore';

const getUserListener = (user, onSnapshot) => {
  if (!user) return () => {};
  const unsubscriber = firestore()
    .collection('users')
    .doc(user.uid)
    .onSnapshot(onSnapshot);

  return () => unsubscriber();
};

export default getUserListener;
