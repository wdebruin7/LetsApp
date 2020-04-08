import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/homeScreen';

const AppNavigation = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

export default AppNavigation;
