import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomNavigation';
import Splash from '../screens/Splash';

// Create stack navigator
const Stack = createNativeStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="BottomTabs" component={BottomTab} options={{ headerShown: false }} />
    <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>
  </Stack.Navigator>
);


export default StackNavigator;

