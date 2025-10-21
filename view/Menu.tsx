import * as React from "react";
import { useEffect, useState } from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Home";
import RegisterCompetencia from "./RegisterCompetencia"; 
import ListarCompetencia from "./ListarCompetencia";
import { Usuario } from '../model/Usuario';
import { firestore, auth } from "../firebase";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function CompetenciaStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListarCompetencia" component={ListarCompetencia} />
      <Stack.Screen name="RegisterCompetencia" component={RegisterCompetencia} />
    </Stack.Navigator>
  );
}


export default function Menu () {
    const [usuario, setUsuario] = useState<Partial<Usuario>>({});[]
    useEffect(() => {
        const refUsuario = firestore.collection("Usuario").doc(auth.currentUser?.uid);
        const retorno = refUsuario.onSnapshot( (query) => {
            setUsuario(query.data());
        });
    }, []);

    return(
        <Drawer.Navigator initialRouteName="Página Inicial">
            <Drawer.Screen name="Página Inicial" component={Home}/>
            {usuario.tipo  === "admin" && (
                <>
                
                </>
            )}
            {usuario.tipo  === "estudante" && (
                <>
                    <Drawer.Screen name="Competências" component={CompetenciaStack} />
                </>
            )}
            {usuario.tipo  === "empresa" && (
                <>
                    
                </>
            )}
        </Drawer.Navigator>
    )
}