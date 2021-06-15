import React, {createRef} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Main from '../components/Main';
import CustomDrawer from '../components/CustomDrawer';
import Turniej from '../components/screens/Turniej';
import Team from '../components/screens/Team';
const Drawer = createDrawerNavigator();

const Navigation = () => {
  return (
    <Drawer.Navigator drawerContent={CustomDrawer} initialRouteName="Home">
      <Drawer.Screen name="Home" component={Main} />
      <Drawer.Screen name="Drużyna" component={Team} />
      <Drawer.Screen name="Turnieje" component={Turniej} />
    </Drawer.Navigator>
  );
};
export default Navigation;
