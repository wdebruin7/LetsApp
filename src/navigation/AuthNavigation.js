import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {PhoneSignIn, PhoneVerify} from '../screens';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Phone" component={PhoneSignIn} />
      <Stack.Screen name="Verify" component={PhoneVerify} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
