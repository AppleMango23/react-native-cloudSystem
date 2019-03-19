import {createStackNavigator,createAppContainer} from 'react-navigation';
import Login from './src/pages/Login';
import Succeed from './src/pages/Succeed';
import ShowDoc from './src/pages/ShowDoc';
import ShowSearch from './src/pages/ShowSearch';

const AppNavigator = createStackNavigator(
  {
    Login: Login,
    Succeed: Succeed,
    ShowDoc:ShowDoc,
    ShowSearch:ShowSearch,
    
  },
  {
    initialRouteName: "Login"
  }
);
export default createAppContainer(AppNavigator);






