import { StyleSheet, Text, View } from 'react-native';

import Login from './view/Login';
import RegisterUsuario from './view/RegisterUsuario';
import Menu from './view/Menu'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login'  component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='RegisterUsuario' component={RegisterUsuario} options={{ headerShown: false }}/>
        <Stack.Screen name='Menu' component={Menu} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
