
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TopTab from './TopNavigation';
import Search from '../screens/Search';

// Create bottom tab navigator
const BottomTabNavigator = createBottomTabNavigator();
const BottomTab = () => (
  <BottomTabNavigator.Navigator>
    <BottomTabNavigator.Screen name="TopTabs" component={TopTab} />
    <BottomTabNavigator.Screen name="Search" component={Search} />
  </BottomTabNavigator.Navigator>
);

export default BottomTab;