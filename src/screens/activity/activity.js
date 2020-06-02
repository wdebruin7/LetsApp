import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {AppHeader} from '../../components';

const Activity = () => {
  return (
    <SafeAreaView style={styles.safeView}>
      <AppHeader />
      <Text>test</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#FCFEFF',
  },
});

export default Activity;
