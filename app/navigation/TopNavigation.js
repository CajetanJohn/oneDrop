import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OnlinePlayList from '../screens/(tabs)/OnlinePlayList';
import Music from '../screens/(tabs)/Music';


// Create top tab navigator
const TopTabNavigator = createMaterialTopTabNavigator();
const TopTab = () => (
  <TopTabNavigator.Navigator
    screenOptions={{
      tabBarStyle: {
        borderBottomWidth: 0,
      },
      tabBarLabelStyle: {
        fontWeight: 'bold',
        textTransform: 'none',
        marginHorizontal: 10,
        paddingVertical: 5,
      },
    }}
  >
    <TopTabNavigator.Screen name="Music" component={Music} options={{ tabBarLabel: 'For you' }} />
    <TopTabNavigator.Screen name="OnlinePlayList" component={OnlinePlayList} options={{ tabBarLabel: 'Stream online' }} />
  </TopTabNavigator.Navigator>
);


export default TopTab;