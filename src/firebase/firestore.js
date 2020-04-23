import firestore from '@react-native-firebase/firestore';
import {useEffect, useReducer} from 'react';
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

const getGroups = async () => {};

export {getGroups, useActivities};
