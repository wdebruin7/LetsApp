import React from 'react';
import {SafeAreaView, View, ActivityIndicator, Text} from 'react-native';
import AppContainer from './src/navigation';
import {useAuth} from './src/firebase/auth';
import {UserProvider} from './src/firebase/userContext';

const App = () => {
  const {user, initializing} = useAuth();

  if (initializing) {
    return (
      <SafeAreaView>
        <View>
          <ActivityIndicator />
          <Text>Hold on while we get things set up...</Text>
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
