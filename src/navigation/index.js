import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import Initial from '../screens/initial';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';

const SwitchNavigator = createSwitchNavigator(
  {
    Initial,
    Auth: AuthNavigation,
    App: AppNavigation,
  },
  {
    initialRouteName: 'Initial',
  },
);

const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer;
