import React from 'react';
import {SafeAreaView, View, ActivityIndicator, Text} from 'react-native';

const Initializing = () => {
  return (
    <SafeAreaView>
      <View>
        <ActivityIndicator />
        <Text>Hold on a minute while we get things set up...</Text>
      </View>
    </SafeAreaView>
  );
};

export default Initializing;
