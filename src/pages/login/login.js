import React, {useState} from 'react';
import {
    Alert,
    Text,
    View,
    TextInput,
    Image,
    Dimensions,
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
import Parse from "parse/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from '@react-navigation/native';

export default function Login({ navigation }) {

    Parse.setAsyncStorage(AsyncStorage);
    const PARSE_APPLICATION_ID = 's6GYQMjZMVjWpqxwNA4qqpP8YdPof9koELoA9Hds';
    const PARSE_HOST_URL = 'https://parseapi.back4app.com';
    const PARSE_JAVASCRIPT_ID = '2PeFEOihX2OlZGwTSjy7wFfC7nFPU6FCbyGSWd6p';
    Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_ID);
    Parse.serverURL = PARSE_HOST_URL;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function Login_User() {
        return await Parse.User.logIn(email, password)
            .then(async (loggedInUser) => {
                // logIn returns the corresponding ParseUser object
          
                // To verify that this is in fact the current user, currentAsync can be used
                const currentUser = await Parse.User.currentAsync();
                console.log(loggedInUser === currentUser);
                navigation.navigate('tabbar')
                return true;
            })
            .catch((error) => {
                // Error can be caused by wrong parameters or lack of Internet connection
                Alert.alert('Error!', error.message);
                return false;
            });
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
        var name_user = userInfo.user.name
        navigation.navigate('tabbar', { user: name_user });
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

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
                    <Text onPress={()=>navigation.navigate('reset')} style={styles.fpText}>Esqueceu a senha?</Text>
                    <TouchableOpacity onPress={()=>{Login_User()}} style={styles.loginButton}>
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

