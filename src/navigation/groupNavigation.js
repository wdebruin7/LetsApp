import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Groups, GroupInfo, GroupCreate} from '../screens';

const Stack = createStackNavigator();

const GroupNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="GroupsHome">
      <Stack.Screen
        name="GroupsHome"
        component={Groups}
        options={{headerShown: false}}
        initialParams
      />
      <Stack.Screen name="GroupInfo" component={GroupInfo} />
      <Stack.Screen name="GroupCreate" component={GroupCreate} />
    </Stack.Navigator>
  );
};

export default GroupNavigation;
