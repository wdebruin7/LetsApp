import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/homeScreen';
import ActivityDayScreen from '../screens/activityDayScreen';

const AppNavigation = createStackNavigator(
  {
    Home: HomeScreen,
    ActivityDay: ActivityDayScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

export default AppNavigation;
