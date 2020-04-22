import firestore from '@react-native-firebase/firestore';
import {useEffect, useReducer} from 'react';
import {useSession} from './auth';
import activityReducer from '../reducers/activityReducer';
import {updateActivity} from '../actions/activityActions';

const useActivities = (startDate, endDate) => {
  const session = useSession();
  const [activityState, activityDispatch] = useReducer(activityReducer, []);

  const activityInRange = (activity) => {
    const activityTime = new Date(activity.date._seconds * 1000);
    return (
      (!startDate || startDate <= activityTime) &&
      (!endDate || endDate >= activityTime)
    );
  };

  const onSnapshot = (querySnapshot) => {
    querySnapshot.forEach((documentSnapshot) => {
      if (activityInRange(documentSnapshot.data())) {
        activityDispatch(
          updateActivity({...documentSnapshot.data(), id: documentSnapshot.id}),
        );
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return activityState;
};

const getGroups = async () => {};

export {getGroups, useActivities};
