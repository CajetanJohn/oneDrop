import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PlayList from '../screens/(tabs)/PlayList';
import OnlinePlayList from '../screens/(tabs)/OnlinePlayList';


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
    <TopTabNavigator.Screen name="PlayList" component={PlayList} options={{ tabBarLabel: 'Play List' }} />
    <TopTabNavigator.Screen name="OnlinePlayList" component={OnlinePlayList} options={{ tabBarLabel: 'Online Music' }} />
  </TopTabNavigator.Navigator>
);


export default TopTab;