import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeNavigation from './homeNavigation';
import GroupNavigation from './groupNavigation';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeNavigation} />
      <Tab.Screen name="Groups" component={GroupNavigation} />
    </Tab.Navigator>
  );
};

export default AppNavigation;
