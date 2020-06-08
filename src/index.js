import React, {useEffect, useState} from 'react';
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
  removeAction,
  updateAction,
} from './actions/firestoreActions';
import {getUserListener, getFirestoreListener, listenerTypes} from './firebase';
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
    setUserData(data);
    store.dispatch(updateUser(data));
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

  const onActionSnapshot = (querySnapshot) => {
    querySnapshot.docChanges().forEach((docChange) => {
      const data = docChange.doc.data();
      switch (docChange.type) {
        case 'removed':
          store.dispatch(removeAction(data));
          return;
        default:
          store.dispatch(updateAction(data));
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
    const activityUnsubscriber = getFirestoreListener(
      userData,
      onActivitySnapshot,
      listenerTypes.ACTIVITY,
    );
    const groupUnsubscriber = getFirestoreListener(
      userData,
      onGroupSnapshot,
      listenerTypes.GROUP,
    );
    const actionUnsubscriber = getFirestoreListener(
      userData,
      onActionSnapshot,
      listenerTypes.ACTION,
    );

    return () => {
      activityUnsubscriber();
      groupUnsubscriber();
      actionUnsubscriber();
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
