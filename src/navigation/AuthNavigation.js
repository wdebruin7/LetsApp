import {createStackNavigator} from 'react-navigation-stack';
import PhoneSignInScreen from '../screens/phoneSignInScreen';
import PhoneVerifyScreen from '../screens/phoneVerifyScreen';
import AccountCreationScreen from '../screens/accountCreationScreen';

const AuthNavigation = createStackNavigator(
  {
    Phone: PhoneSignInScreen,
    Verify: PhoneVerifyScreen,
    Create: AccountCreationScreen,
  },
  {
    initialRouteName: 'Phone',
  },
);

export default AuthNavigation;
