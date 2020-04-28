import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from '../screens';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
};

export default AppNavigation;
