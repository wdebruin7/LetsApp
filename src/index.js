import React from 'react';
import {SafeAreaView, View, ActivityIndicator, Text} from 'react-native';
import AppContainer from './navigation';
import {useAuth} from './firebase/auth';
import {UserProvider} from './firebase/userContext';

const App = () => {
  const {user, initializing} = useAuth();

  if (initializing) {
    return (
      <SafeAreaView>
        <View>
          <ActivityIndicator />
          <Text>Hold on a minute while we get things set up...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <UserProvider value={{user}}>
      <AppContainer />
    </UserProvider>
  );
};

export default App;
