import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// IMPORTANDO AS TELAS
import Login from '../pages/login/login';
import Home from '../pages/home/home/home';
import Register from '../pages/register/register_user'
import Reset from "../pages/forget_password/forget_password";

// IMPORTANDO TABBAR
import TabBar from "../tabBar/routesTabBar";

export default function Navigation() {

    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="login">

                <Stack.Screen name="login" component={Login} options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name="home" component={Home} options={{headerShown: false}}></Stack.Screen>
                <Stack.Screen name="tabbar" component={TabBar} options={{headerShown: false}}/>
                <Stack.Screen name="register" component={Register} options={{headerTitle: ''}}/>
                <Stack.Screen name="reset" component={Reset} options={{headerTitle: ''}}/>


            </Stack.Navigator>
        </NavigationContainer>
    )
}