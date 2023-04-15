import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, NavigationActions } from 'react-native';
import styles from './styles';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';


export default function Config_Screen() {

    const navigation = useNavigation();

    const [login_by, setLoginBy] = useState()

    useEffect(
        () => {
            async function get_user_by_login() {
                const value = await AsyncStorage.getItem('data_user');
                let json = JSON.parse(value);
                setLoginBy(json.login_by)
                console.log(login_by)

                return login_by
            }
            get_user_by_login();
        }, []);

        async function signOutGoogle(){
            await GoogleSignin.signOut();
            console.log("Voce deslogou");
            navigation.navigate("login");
          }
    

        async function SignOut(){
           if(login_by == 'App'){
            navigation.reset({
                index: 0,
                routes: [{name: 'login'}],
              });
           }else{
            signOutGoogle()
           }
        }

    return (
        <View style={styles.container}>

            <View style={styles.view_config}>

                <Text style={styles.txt_title}>Olá, qual serviço gostaria de utilizar?</Text>

                {/* MEUS DADOS */}
                <TouchableOpacity style={styles.my_data} onPress={()=>navigation.navigate('profile')}>

                    <Entypo name="archive" size={25} color={'yellow'} style={{ marginLeft: 30 }} />
                    <Text style={styles.txt_title_button}> Meus Dados</Text>

                </TouchableOpacity>

                {/* Termos */}
                <TouchableOpacity style={styles.user_settings}>

                    <Entypo name="address" size={25} color={'blue'} style={{ marginLeft: 30 }} />
                    <Text style={styles.txt_title_button}>Termos</Text>

                </TouchableOpacity>

                {/* Botao Sobre nós */}
                <TouchableOpacity style={styles.user_settings}>

                    <Entypo name="flow-tree" size={25} color={'green'} style={{ marginLeft: 30 }} />
                    <Text style={styles.txt_title_button}>Sobre nós</Text>

                </TouchableOpacity>

                {/* Botao Sair */}
                <TouchableOpacity style={styles.user_settings} onPress={() =>SignOut()}>

                    <Entypo name="cross" size={25} color={'red'} style={{ marginLeft: 30 }} />

                    <Text style={styles.txt_title_button}>Sair</Text>

                </TouchableOpacity>

            </View>

        </View>
    )
}