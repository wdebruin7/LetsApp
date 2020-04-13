import React from 'react';
import {SafeAreaView, View, ActivityIndicator, Text} from 'react-native';
import AppContainer from './navigation';
import {useAuth} from './firebase/auth';
import {SessionProvider} from './firebase/sessionContext';

const App = () => {
  const session = useAuth();

  if (session.initializing) {
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
    <SessionProvider value={session}>
      <AppContainer />
    </SessionProvider>
  );
};

export default App;
