import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useEffect, useReducer, useState} from 'react';
import {useSession} from './auth';
import activityReducer from '../reducers/activityReducer';
import {updateActivity} from '../actions/activityActions';

const useUser = () => {
  const [userState, setUserState] = useState({user: null, initializing: true});
  const {currentUser} = auth();

  useEffect(() => {
    if (!currentUser) return;
    const unsubscriber = firestore()
      .collection('users')
      .doc(currentUser.uid)
      .onSnapshot(
        (documentSnapshot) => {
          setUserState({user: documentSnapshot.data(), initializing: false});
        },
        (error) => {
          console.log(error);
        },
      );

    return () => unsubscriber();
  }, [currentUser]);

  return userState;
};

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
  useGroups,
  useActivities,
  initializeUserInDatabase,
  toggleUserIsParticipant,
  useUser,
};
