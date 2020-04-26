import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuth} from './firebase/auth';
import {SessionProvider} from './firebase/sessionContext';
import {InitializingScreen, AccountCreationScreen} from './screens';
import {AuthNavigation, AppNavigation} from './navigation';

const Stack = createStackNavigator();

const App = () => {
  const session = useAuth();

  return (
    <SessionProvider value={session}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          {session.initializing ? (
            <Stack.Screen name="Initializing" component={InitializingScreen} />
          ) : !session.user ? (
            <Stack.Screen name="Auth" component={AuthNavigation} />
          ) : !session.userData ? (
            <Stack.Screen
              name="AccountCreate"
              component={AccountCreationScreen}
            />
          ) : (
            <Stack.Screen name="App" component={AppNavigation} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SessionProvider>
  );
};

export default App;
