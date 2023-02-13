import { View, Text } from 'react-native'
import React, {useContext} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppBar from '../layouts/AppBar'

const Stack = createNativeStackNavigator()

export default function StackRoutes() {
  
  return (
    <Stack.Navigator>
      <Stack.Screen
          name='Meus itens'
          component={() => <></>}
          options={{
            header: () => <AppBar searchLabel={'em meus produtos...'} />,
          }}
        />
      <Stack.Screen name='Editar' component={() => <></>} />
      
    </Stack.Navigator>
  )
}