import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import InitialScreen from '../screens/initialScreen';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';

const SwitchNavigator = createSwitchNavigator(
  {
    Initial: InitialScreen,
    Auth: AuthNavigation,
    App: AppNavigation,
  },
  {
    initialRouteName: 'Initial',
  },
);

const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer;
