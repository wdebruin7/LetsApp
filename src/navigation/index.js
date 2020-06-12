import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import AuthNavigation from './authNavigation';
import AppNavigation from './appNavigation';
import {useSession} from '../firebase';
import {Initializing, AccountCreation, AccountUpdate} from '../screens';
import onNewAuth from '../firebase/firestore/onNewAuth';
import AddActivityNavigation from './addActivityNavigation';

const Stack = createStackNavigator();

const AppContainer = () => {
  const session = useSession();
  const user = useSelector((state) => state.user);
  const [awaitingMigration, setAwaitingMigration] = useState(false);

  const initiateMigration = async () => {
    try {
      await onNewAuth();
      setAwaitingMigration(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (awaitingMigration) initiateMigration();
  }, [awaitingMigration]);

  useEffect(() => {
    if (user.initializing || user.data !== {} || !session.user) return;
    const {creationTime} = session.user.metadata;
    const {lastSignInTime} = session.user.metadata;
    if (creationTime === lastSignInTime) setAwaitingMigration(true);
  }, [session.user, user.data, user.initializing]);

  const initializing =
    session.initializing ||
    (session.user && user.initializing) ||
    awaitingMigration;

  const loggedOut = !session.user;

  const awaitingAccountCreation =
    !user.data || user.data === {} || !user.data.userDataConfirmed;

  if (initializing) {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Initializing" component={Initializing} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else if (loggedOut) {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Auth" component={AuthNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else if (awaitingAccountCreation) {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="AccountCreate" component={AccountCreation} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none" mode="modal" initialRouteName="App">
          <Stack.Screen
            name="App"
            component={AppNavigation}
            options={{animationEnabled: false}}
          />
          <Stack.Screen name="AccountUpdate" component={AccountUpdate} />
          <Stack.Screen name="AddActivity" component={AddActivityNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default AppContainer;
