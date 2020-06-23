import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import HomeNavigation from './homeNavigation';
import GroupNavigation from './groupNavigation';
import {dynamicLinkContext} from '../firebase/dynamicLinkContext';
import {Activity} from '../screens';

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
  }, [dynamicLinkParams, navigate]);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Groups') {
            iconName = 'group';
          } else if (route.name === 'Activity') {
            iconName = 'bell';
          }

          return (
            <Icon
              name={iconName}
              type="font-awesome"
              size={size}
              color={color}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: '#000000',
        inactiveTintColor: '#A6A6A6',
      }}>
      <Tab.Screen name="Home" component={HomeNavigation} />
      <Tab.Screen name="Groups" component={GroupNavigation} />
      <Tab.Screen name="Activity" component={Activity} />
    </Tab.Navigator>
  );
};

export default AppNavigation;
