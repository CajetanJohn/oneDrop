import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './Stacks';
import Settings from '../screens/(drawers)/Settings';
import Monetization from '../screens/(drawers)/Monetization';


const Drawer = createDrawerNavigator();
const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Stack" component={StackNavigator} />
    <Drawer.Screen name="Settings" component={Settings} />
    <Drawer.Screen name="Monetization" component={Monetization} />
  </Drawer.Navigator>
);

export default DrawerNavigator;