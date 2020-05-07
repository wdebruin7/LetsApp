import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeNavigator from './homeNavigation';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeNavigator} />
    </Tab.Navigator>
  );
};

export default AppNavigation;
