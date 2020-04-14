import {createStackNavigator} from 'react-navigation-stack';
import PhoneSignIn from '../screens/phoneSignIn';
import PhoneVerify from '../screens/phoneVerify';

const AuthNavigation = createStackNavigator(
  {
    Phone: PhoneSignIn,
    Verify: PhoneVerify,
  },
  {
    initialRouteName: 'Phone',
  },
);

export default AuthNavigation;
