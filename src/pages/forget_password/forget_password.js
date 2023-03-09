import React, {useState, useEffect} from "react";
import {View, Text, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import styles from './styles';
import logo_email from './img_logo_email.png';
import Parse from "parse/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Reset({navigation}){

    useEffect(()=>{
    Parse.setAsyncStorage(AsyncStorage);
    Parse.initialize('s6GYQMjZMVjWpqxwNA4qqpP8YdPof9koELoA9Hds', '2PeFEOihX2OlZGwTSjy7wFfC7nFPU6FCbyGSWd6p');
    Parse.serverURL = 'https://parseapi.back4app.com'
    },[]);

    const [email, setEmail] = useState('');

    async function passwordReset() {
        // Note that this value come from state variables linked to your text input
        const emailValue = email;
        return await Parse.User.requestPasswordReset(emailValue)
          .then(() => {
            // logIn returns the corresponding ParseUser object
            Alert.alert(
             'Sucesso',
             `Foi enviado um e-mail ${email}, verifique e altere sua senha`
            );
           return navigation.navigate("login")
          })
          .catch((error) => {
            // Error can be caused by lack of Internet connection
            Alert.alert('Error!', error.message);
            return false;
          });
      };

    return(
        <View style={styles.container}>
            <Image source={logo_email} style={styles.logo}/>
            <Text style={styles.txt_info}>Por favor, digite seu e-mail para recuperar por um codigo de segurança</Text>
            <Text style={styles.txt_email}>Endereço de E-mail</Text>
            <TextInput onChangeText={setEmail} placeholder="Digite seu e-mail cadastrado" style={styles.input}></TextInput>
            <TouchableOpacity onPress={()=>passwordReset()} style={styles.button}>

                <Text style={styles.txt_button}>Enviar</Text>

            </TouchableOpacity>
        </View>
    )
}