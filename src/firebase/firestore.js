import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useEffect, useReducer, useState} from 'react';
import {useSession} from './auth';
import activityReducer from '../reducers/activityReducer';
import {updateActivity} from '../actions/activityActions';

const useActivities = () => {
  const session = useSession();
  const [activityState, activityDispatch] = useReducer(activityReducer, []);

  const onSnapshot = (querySnapshot) => {
    querySnapshot.forEach((documentSnapshot) => {
      activityDispatch(
        updateActivity({...documentSnapshot.data(), id: documentSnapshot.id}),
      );
    });
  };

  useEffect(() => {
    if (!session.userData || session.userData.groups === undefined) return;
    const snapshotListeners = [];
    const groupIDs = session.userData.groups.map((x) => x.groupDocumentID);

    for (let i = 0; i < groupIDs.length; i += 10) {
      const ref = firestore()
        .collection('activities')
        .where('groupDocumentID', 'in', groupIDs.slice(i, i + 10));
      const unsubscriber = ref.onSnapshot(onSnapshot);
      snapshotListeners.push(() => unsubscriber());
    }

    return () => {
      snapshotListeners.forEach((unsubscriber) => unsubscriber());
    };
  }, [session]);

  return activityState;
};

const useGroups = () => {
  const session = useSession();
  const [groupState, setGroupState] = useState({});

  const onSnapshot = (querySnapshot) => {
    querySnapshot.forEach((documentSnapshot) => {
      const {id} = documentSnapshot;
      setGroupState((prevState) => {
        const newState = {...prevState};
        newState[id] = documentSnapshot.data();
        return newState;
      });
    });
  };

  useEffect(() => {
    if (!session.user) return;
    const ref = firestore().collection('groups');
    const unsubscribe = ref.onSnapshot(onSnapshot);
    return () => unsubscribe();
  }, [session.user]);

  return groupState;
};

const initializeUserInDatabase = async (newUserData) => {
  const user = auth().currentUser;
  if (!user) throw new Error('No user currently signed in');
  const userData = {...user, ...newUserData};
  const userDocRef = firestore().collection('users').doc(userData.uid);
  try {
    userDocRef.set(userData);
  } catch (error) {
    return {success: false, reason: error};
  }
  return {success: true};
};

const setUserIsParticipant = async (userData, activityData) => {
  const user = auth().currentUser;
  if (!user) throw new Error('No user currently signed in');

  const batch = firestore.batch();

  const updateUserDoc = async () => {
    const userRef = firestore().collection('users').doc(user.uid);
    const {description, uid} = activityData;
    const includeActivity = firestore.FieldValue.arrayUnion([
      {description, uid},
    ]);
    batch.update(userRef, {activities: includeActivity});
  };

  const updateActivityDoc = () => {
    const activityRef = firestore()
      .collection('activities')
      .doc(activityData.uid);
    const {name, uid} = userData.name;
    const includeUser = firestore.FieldValue.arrayUnion([{name, uid}]);
    batch.update(activityRef, {participants: includeUser});
  };

  updateUserDoc();
  updateActivityDoc();

  try {
    await batch.commit();
  } catch (error) {
    return {success: false, reason: error};
  }
  return {success: true};
};

export {
  useGroups,
  useActivities,
  initializeUserInDatabase,
  setUserIsParticipant,
};
