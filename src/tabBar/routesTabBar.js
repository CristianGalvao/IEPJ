import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Importando as telas
import Store from "../pages/home/store/store";
import Config_Screen from "../pages/home/config_screen/config_screen";
import Events from "../pages/home/Events/events";
import Home from "../pages/home/home/home";
import Eden from '../pages/home/eden/eden';

//Importando os icones
import { Entypo } from '@expo/vector-icons';

export default function TabBar() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator initialRouteName="home"
        
        screenOptions={{
            tabBarStyle: { borderColor: 'black', borderTopWidth: 3, padding: 2 },
            tabBarLabelStyle: { fontSize: 12, color: 'grey', fontWeight: 'bold' },
            tabBarActiveTintColor: "red",
            tabBarInactiveTintColor: "grey",
            
        }}>

            <Tab.Screen name="store" component={Store} options={{
                headerShown: false, title: "Loja",

                tabBarIcon: ({ color, size }) => (<Entypo name="shopping-cart" size={size} color={color} />)


            }}></Tab.Screen>
            <Tab.Screen name="events" component={Events} options={{
                headerShown: false, title: 'Eventos',

                tabBarIcon: ({ color, size }) => (<Entypo name="spreadsheet" size={size} color={color} />)


            }}></Tab.Screen>
            <Tab.Screen name="home" component={Home} options={{
                headerShown: false, title: "IEPJ",

                tabBarIcon: ({ color, size }) => (<Entypo name="tree" size={size} color={color} />)


            }}></Tab.Screen>
            <Tab.Screen name="eden" component={Eden} options={{
                headerShown: false, title: "Eden",

                tabBarIcon: ({ color, size }) => (<Entypo name="sound-mix" size={size} color={color} />)


            }}></Tab.Screen>

            <Tab.Screen name="config_screen" component={Config_Screen} options={{
                headerShown: false, title: "Ajustes",

                tabBarIcon: ({ color, size }) => (<Entypo name="user" size={size} color={color} />)

            }}></Tab.Screen>


        </Tab.Navigator>
    )
}