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
    if (user.initializing || user.data || !session.user) return;
    const {creationTime} = session.user.metadata;
    const {lastSignInTime} = session.user.metadata;

    setAwaitingMigration(creationTime === lastSignInTime);
  }, [session.user, user.data, user.initializing]);

  if (
    session.initializing ||
    (session.user && user.initializing) ||
    awaitingMigration
  ) {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Initializing" component={Initializing} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else if (!session.user) {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Auth" component={AuthNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else if (!user.data || !user.data.userDataConfirmed) {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="AccountCreate" component={AccountCreation} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else if (user.data && user.data.userDataConfirmed) {
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
