import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ActivityDatePicker,
  ActivityGroupPicker,
  ActivityAdder,
} from '../screens';

const Stack = createStackNavigator();

const AddActivityNavigation = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="ActivityAdder">
      <Stack.Screen name="ActivityAdder" component={ActivityAdder} />
      <Stack.Screen name="ActivityDatePicker" component={ActivityDatePicker} />
      <Stack.Screen
        name="ActivityGroupPicker"
        component={ActivityGroupPicker}
      />
    </Stack.Navigator>
  );
};

export default AddActivityNavigation;
