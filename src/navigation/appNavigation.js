import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import HomeNavigation from './homeNavigation';
import GroupNavigation from './groupNavigation';
import {dynamicLinkContext} from '../firebase/dynamicLinkContext';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  const dynamicLinkParams = useContext(dynamicLinkContext);
  const {navigate} = useNavigation();

  useEffect(() => {
    if (!dynamicLinkParams) return;
    switch (dynamicLinkParams.type) {
      case 'group':
        navigate('Groups', {
          screen: 'GroupInfo',
          params: {groupUID: dynamicLinkParams.id},
          initial: false,
        });
        break;
      default:
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dynamicLinkParams]);

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeNavigation} />
      <Tab.Screen name="Groups" component={GroupNavigation} />
    </Tab.Navigator>
  );
};

export default AppNavigation;
