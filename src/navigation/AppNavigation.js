import {createSwitchNavigator} from 'react-navigation';
import HomeScreen from '../screens/homeScreen';
import ActivityDayScreen from '../screens/activityDayScreen';
import AccountScreen from '../screens/accountScreen';

const AppNavigation = createSwitchNavigator(
  {
    Account: AccountScreen,
    Home: HomeScreen,
    ActivityDay: ActivityDayScreen,
  },
  {
    initialRouteName: 'Account',
  },
);

export default AppNavigation;
