import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, HomeActiveDate} from '../screens';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Home">
      <Stack.Screen name="HomeList" component={Home} />
      <Stack.Screen name="HomeActiveDate" component={HomeActiveDate} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
