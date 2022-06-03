import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import DisplayJSON from './components/DisplayJSON';
import Credential from './components/Credential';
import colors from './config/colors';
import Home from './screens/Home';
import Profile from './screens/Profile';

const Project = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Profile: {
      screen: Profile,
    },
    Credential: {
      screen: Credential,
    },
    DisplayJSON: {
      screen: DisplayJSON,
    },
  },
  {
    defaultNavigationOptions: () => ({
      cardStyle: {
        backgroundColor: colors.secondary,
      },
      gestureEnabled: false,
      swipeEnabled: false,
    }),
    headerMode: 'none',
  },
);
export default createAppContainer(Project);
