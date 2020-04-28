import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {useAuth} from './firebase/auth';
import {SessionProvider} from './firebase/sessionContext';
import AppContainer from './navigation';
import {firestoreReducer, initialState} from './reducers/firestoreReducer';
import {
  updateUser,
  updateActivity,
  removeActivity,
  updateGroup,
  removeGroup,
} from './actions/firestoreActions';
import {
  getUserListener,
  getActivityListener,
  getGroupListener,
} from './firebase/firestore';

const store = createStore(firestoreReducer, initialState());

const App = () => {
  const session = useAuth();
  const [userData, setUserData] = useState(null);

  const onUserSnapshot = (documentSnapshot) => {
    const data = documentSnapshot.data();
    if (data) {
      setUserData(data);
      store.dispatch(
        updateUser({data: documentSnapshot.data(), initializing: false}),
      );
    }
  };

  const onActivitySnapshot = (querySnapshot) => {
    querySnapshot.docChanges().forEach((documentChange) => {
      const data = documentChange.doc.data();
      switch (documentChange.type) {
        case 'removed':
          store.dispatch(removeActivity(data));
          return;
        default:
          store.dispatch(updateActivity(data));
      }
    });
  };

  const onGroupSnapshot = (querySnapshot) => {
    querySnapshot.docChanges().forEach((docChange) => {
      const data = docChange.doc.data();
      switch (docChange.type) {
        case 'removed':
          store.dispatch(removeGroup(data));
          return;
        default:
          store.dispatch(updateGroup(data));
      }
    });
  };

  useEffect(() => {
    if (!session.user) return;
    const unsubscribe = getUserListener(session.user, onUserSnapshot);
    return () => unsubscribe();
  }, [session.user]);

  useEffect(() => {
    if (!userData) return;
    const activityUnsubscriber = getActivityListener(
      userData,
      onActivitySnapshot,
    );
    const groupUnsubscriber = getGroupListener(userData, onGroupSnapshot);
    return () => {
      activityUnsubscriber();
      groupUnsubscriber();
    };
  }, [userData]);

  return (
    <SessionProvider value={session}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </SessionProvider>
  );
};

export default App;
