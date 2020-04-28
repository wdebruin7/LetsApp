import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';
import {useSession} from '../firebase';
import {InitializingScreen, AccountCreationScreen} from '../screens';

const Stack = createStackNavigator();

const AppContainer = () => {
  const session = useSession();
  const user = useSelector((state) => state.user);
  // const activityDays = useSelector((state) => state.activities);
  // const groups = useSelector((state) => state.groups);
  //
  // console.log('---');
  // console.log(user);
  // console.log(activityDays);
  // console.log(groups);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {session.initializing || user.initializing ? (
          <Stack.Screen name="Initializing" component={InitializingScreen} />
        ) : !session.user ? (
          <Stack.Screen name="Auth" component={AuthNavigation} />
        ) : !user.data ? (
          <Stack.Screen
            name="AccountCreate"
            component={AccountCreationScreen}
          />
        ) : (
          <Stack.Screen name="App" component={AppNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
