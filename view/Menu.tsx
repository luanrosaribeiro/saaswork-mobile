import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Home";
import RegisterCompetencia from "./RegisterCompetencia"; 
import ListarCompetencia from "./ListarCompetencia";

const Drawer = createDrawerNavigator();


export default function Menu () {

    return(
        <Drawer.Navigator initialRouteName="Página Inicial">
            <Drawer.Screen name="Página Inicial" component={Home}/>
            <Drawer.Screen name="Registrar Competência" component={RegisterCompetencia}/>
            <Drawer.Screen name="Listar Competência" component={ListarCompetencia}/>
        </Drawer.Navigator>
    )
}