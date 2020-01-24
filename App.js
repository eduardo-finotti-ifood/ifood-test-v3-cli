import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './Login'
import HomeScreen from './Home'

const MainNavigator = createStackNavigator({
  Login: {
    name: 'Login',
    screen: LoginScreen,
    navigationOptions: { headerTransparent: true, header: null } },
  Home: { 
    name: 'Home',
    screen: HomeScreen,
    navigationOptions: { headerTransparent: true, header: null }
  },
});

const App = createAppContainer(MainNavigator, {
  initialRouteName: 'Login'
});
export default App;
