import {createStackNavigator} from 'react-navigation-stack';
import PhoneSignIn from '../screens/phoneSignIn';

const AuthNavigation = createStackNavigator(
  {
    Phone: PhoneSignIn,
  },
  {
    initialRouteName: 'Phone',
  },
);

export default AuthNavigation;
