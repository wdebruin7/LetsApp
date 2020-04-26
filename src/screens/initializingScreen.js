import React from 'react';
import {SafeAreaView, View, ActivityIndicator, Text} from 'react-native';

const InitializingScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <ActivityIndicator />
        <Text>Hold on a minute while we get things set up...</Text>
      </View>
    </SafeAreaView>
  );
};

export default InitializingScreen;
