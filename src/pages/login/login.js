import React, { useState } from 'react';
import {
    Alert,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { Icon } from 'react-native-elements';
import BackgroundImage from './logo_one_heart.png';
import styles from './styles';
import logoGoogle from './google.jpg';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from '../../config/config'

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function Login_User() {
        const response = await fetch(`${BASE_URL}/user/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        let json = await response.json();

        if (json == 'user_not_found') {
            Alert.alert("Erro", "Usuário não encontrado")
        }

        if (json == "verify_email") {
            Alert.alert("Por favor", "Verifique seu e-mail")
        }

        if (json == 'error_login') {
            Alert.alert("Erro", "Verifique sua senha")
        }

        if (json.status == 1) {
            console.log(json.status)
            await AsyncStorage.setItem('data_user', JSON.stringify(json));
            navigation.navigate("tabbar");
        }

    }

    //   LOGIN GOOGLE
    GoogleSignin.configure({
        webClientId: '584409978526-54mn0maia7v7i616eq63fb9a4ctavaps.apps.googleusercontent.com',
    });

    async function onGoogleButtonPress() {
        // Get the users ID token
        await GoogleSignin.hasPlayServices();
        const { idToken } = await GoogleSignin.signIn();
        const userInfo = await GoogleSignin.signIn();
        // console.log(userInfo.user)
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        let json = userInfo.user;

        console.log(userInfo.user.email, userInfo.user.givenName)

        async function Register_Google() {
            await fetch(`${BASE_URL}/user/create_user`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userInfo.user.email,
                    photo: userInfo.user.photo,
                    name: userInfo.user.givenName,
                    status: true,
                    login_by: 'Google'
                }),
            });
        }

        await AsyncStorage.setItem('data_user', JSON.stringify(json));
        Register_Google()
        await navigation.navigate('tabbar')
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);


    }


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={{ flex: 1, width: "60%", marginBottom: "60%", resizeMode: 'contain' }}
                        source={BackgroundImage}
                    />
                </View>
                <View style={styles.bottomView}>
                    <Text style={styles.loginText}>Login</Text>
                    <View style={styles.inputView}>
                        <Icon
                            style={styles.inputIcon}
                            name='person'
                            type='ionicons'
                            color='black'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='E-mail'
                            autoCapitalize='none'
                            keyboardType='email-address'
                            textContentType='emailAddress'
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <Icon
                            style={styles.inputIcon}
                            name='lock'
                            type='ionicons'
                            color='black'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Senha'
                            secureTextEntry={true}
                            autoCapitalize='none'
                            onChangeText={setPassword}
                        />
                    </View>
                    <Text onPress={() => navigation.navigate('reset')} style={styles.fpText}>Esqueceu a senha?</Text>
                    <TouchableOpacity onPress={() => { Login_User() }} style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                    <Text onPress={() => navigation.navigate('register')} style={styles.registerText}>
                        Não tem uma conta?
                        <Text style={{ color: 'red' }}>
                            {' Cadastrar'}
                        </Text>
                    </Text>
                </View>

                <View style={styles.EntrarGoogle}>

                    <TouchableOpacity style={styles.buttonGoogle} onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
                    >

                        <Image source={logoGoogle} style={{ width: 36, height: 36 }} />
                        <Text>Google</Text>

                    </TouchableOpacity>

                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

