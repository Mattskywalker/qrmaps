import React, { useContext } from 'react'
import AppBar from '../layouts/AppBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Octicons'
import IonIcons from 'react-native-vector-icons/Ionicons'

import StackRoutes from './StackRoutes';
import Home from '../views/Home';
import Map from '../views/Map';

const Tab = createBottomTabNavigator();

export default function Routes() {

  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Mapa' component={Map}
        options={{
          header: () => <AppBar searchLabel='Pesquisar em produtos...' />,
          tabBarIcon: (props) => <IonIcons color={props.color} style={props} size={30} name='map' />,
        }} />

      <Tab.Screen
        name='Leitor' component={Home}
        options={{
          header: () => <AppBar searchLabel='Pesquisar em produtos...' />,
          tabBarIcon: (props) => <IonIcons color={props.color} style={props} size={30} name='qr-code-outline' />,
        }} />
      {/* <Tab.Screen
        name='Meus Itens' component={StackRoutes}
        options={{
          headerShown: false,
          tabBarIcon: (props) => <Icon color={props.color} style={props} size={30} name='checklist' />
        }} /> */}
    </Tab.Navigator>
  )
}
