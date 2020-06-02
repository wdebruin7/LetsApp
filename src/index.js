import React, {useEffect, useState, createContext} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import dynamicLinks from '@react-native-firebase/dynamic-links';
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
import {getSearchParams} from './utils';
import {DynamicLinkProvider} from './firebase/dynamicLinkContext';

const store = createStore(firestoreReducer, initialState());

const App = () => {
  const session = useAuth();
  const [userData, setUserData] = useState(null);
  const [dynamicLinkParams, setDynamicLinkParams] = useState(undefined);

  const handleDynamicLink = (link) => {
    const params = getSearchParams(link.url);
    setDynamicLinkParams(params);
  };

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then((link) => {
        if (link) handleDynamicLink(link);
      });
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    return () => unsubscribe();
  }, []);

  const onUserSnapshot = (documentSnapshot) => {
    const data = documentSnapshot.data();
    if (data) {
      setUserData(data);
      store.dispatch(updateUser(documentSnapshot.data()));
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
    if (!userData || !session.user) return;
    const activityUnsubscriber = getActivityListener(
      userData,
      onActivitySnapshot,
    );
    const groupUnsubscriber = getGroupListener(userData, onGroupSnapshot);
    return () => {
      activityUnsubscriber();
      groupUnsubscriber();
    };
  }, [userData, session]);

  return (
    <SessionProvider value={session}>
      <Provider store={store}>
        <DynamicLinkProvider value={dynamicLinkParams}>
          <AppContainer />
        </DynamicLinkProvider>
      </Provider>
    </SessionProvider>
  );
};

export default App;
