import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {PhoneSignInScreen, PhoneVerifyScreen} from '../screens';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Phone" component={PhoneSignInScreen} />
      <Stack.Screen name="Verify" component={PhoneVerifyScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
