import React, {useState, useEffect} from "react";
import {View, Text, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import styles from './styles';
import logo_email from './img_logo_email.png';
import { BASE_URL } from "../../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Reset({navigation}){

    const [email, setEmail] = useState();

      // FUNÇÃO VALIDAR EMAIL
    isEmailValid = () => {
        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(String(email).toLowerCase())
    }

    async function passwordReset() {
        if(isEmailValid){
          const response = await fetch(`${BASE_URL}/user/reset_password`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
            }),
        });

        let json = await response.json();
        if (json === 'password_updated') {
          Alert.alert("Enviado!", "Verifique seu e-mail com sua nova senha")
          navigation.navigate("login")
        }else{
          Alert.alert("Erro", "Verifique seu e-mail")
        }


        }else{
          Alert.alert("Erro", "Verifique campo e-mail")
        }

      };

    return(
        <View style={styles.container}>
            <Image source={logo_email} style={styles.logo}/>
            <Text style={styles.txt_info}>Por favor, digite seu e-mail para recuperar por um codigo de segurança</Text>
            <Text style={styles.txt_email}>Endereço de E-mail</Text>
            <TextInput onChangeText={setEmail} placeholder="Digite seu e-mail cadastrado" style={styles.input}/>
            <TouchableOpacity onPress={()=>passwordReset()} style={styles.button}>

                <Text style={styles.txt_button}>Enviar</Text>

            </TouchableOpacity>
        </View>
    )
}