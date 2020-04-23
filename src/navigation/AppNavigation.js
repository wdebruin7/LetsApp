import {createSwitchNavigator} from 'react-navigation';
import HomeScreen from '../screens/homeScreen';
import ActivityDayScreen from '../screens/activityDayScreen';

const AppNavigation = createSwitchNavigator(
  {
    Home: HomeScreen,
    ActivityDay: ActivityDayScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

export default AppNavigation;
