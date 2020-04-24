import {createSwitchNavigator} from 'react-navigation';
import HomeScreen from '../screens/homeScreen';
import ActivityDayScreen from '../screens/activityDayScreen';
import AccountScreen from '../screens/accountCreationScreen';

const AppNavigation = createSwitchNavigator(
  {
    Home: HomeScreen,
    Account: AccountScreen,
    ActivityDay: ActivityDayScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

export default AppNavigation;
