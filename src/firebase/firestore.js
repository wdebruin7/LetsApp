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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.user]);

  return groupState;
};
const initializeUserInDatabase = (newUserData) => {
  const user = auth().currentUser;
  if (!user) throw new Error('No user currently signed in');
  const userData = {...user, ...newUserData};
  const userDocRef = firestore().collection('users').doc(userData.uid);
  userDocRef.set(userData);
};

const getGroups = async () => {};

export {useGroups, useActivities};
