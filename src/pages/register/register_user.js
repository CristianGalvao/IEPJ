import React, { useState } from "react";
import { View, Image, TextInput, ScrollView, Alert, Text, TouchableOpacity } from 'react-native';
import styles from "./styles";
import one_heart_img from './logo_one_heart.png';
import { TextInputMask } from "react-native-masked-text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from '../../config/config'

export default function Register({ navigation }) {

    // DECLARANDO CONSTANTES
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [confirmPassword, setConfirm_password] = useState('');

    // FUNÇÃO VALIDAR EMAIL
    isEmailValid = () => {
        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(String(email).toLowerCase())
    }

    //  FUNÇÃO VALIDAR CPF
    function isValidCPF(cpf) {
        if (typeof cpf !== 'string') return false
        cpf = cpf.replace(/[^\d]+/g, '')
        if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false
        cpf = cpf.split('').map(el => +el)
        const rest = (count) => (cpf.slice(0, count - 12)
            .reduce((soma, el, index) => (soma + el * (count - index)), 0) * 10) % 11 % 10
        return rest(10) === cpf[9] && rest(11) === cpf[10]
    }

    async function createUser() {
        const response = await fetch(`${BASE_URL}/user/create_user`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                name: name,
                password: password,
                cpf: cpf,
                whatssap: telefone,
                status: false,
                photo: 'https://freesvg.org/img/abstract-user-flat-4.png',
                login_by: "App"
            }),
        });

        let json = await response.json();

        if (json === 'cadastrado') {
            Alert.alert("Cadastrado com sucesso!", "Faça Login");
            navigation.navigate("login");
        } else {        
            Alert.alert("Erro", "Não foi possível cadastrar")
        }
    };

    function verify_fields() {
        if (isEmailValid && isValidCPF(cpf) && password.length > 6 && password == confirmPassword) {
            createUser()
        } else {
            Alert.alert("Erro", "Verifique os campos")
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.view_register}>

                <View style={styles.view_img_one_heart}>
                    <Image source={one_heart_img} style={styles.img_one_heart} />
                </View>


                <View style={styles.view_text_input}>

                    <ScrollView style={{ flex: 1 }}>

                        <TextInput
                            style={styles.first_input}
                            placeholder="Nome"
                            placeholderTextColor="#ccc"
                            autoCapitalize="none"
                            keyboardType="default"
                            returnKeyType="next"
                            blurOnSubmit={false}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.txt_input}
                            placeholder="E-mail"
                            placeholderTextColor="#ccc"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            returnKeyType="next"
                            blurOnSubmit={false}
                            onChangeText={setEmail}
                        />

                        {!isEmailValid() && email.length > 0 ? <Text style={{ color: "red" }}>Preencha um e-mail correto</Text> : null}

                        <TextInput
                            style={styles.txt_input}
                            placeholder="Senha"
                            placeholderTextColor="#ccc"
                            autoCapitalize="none"
                            returnKeyType="next"
                            blurOnSubmit={false}
                            onChangeText={setPassword}
                            textContentType="password"
                            secureTextEntry={true}
                        />

                        {password.length < 6 && password.length > 0 ? <Text style={{ color: "red" }}>Digite uma senha com mais de 6 caracteres</Text> : null}

                        <TextInput
                            style={styles.txt_input}
                            placeholder="Confirmar Senha"
                            placeholderTextColor="#ccc"
                            autoCapitalize="none"
                            returnKeyType="next"
                            blurOnSubmit={false}
                            onChangeText={setConfirm_password}
                            textContentType="password"
                            secureTextEntry={true}
                        />

                        {password != confirmPassword ? <Text style={{ color: "red" }}>Senha não coincidem</Text> : null}


                        <TextInputMask
                            type={'cpf'}
                            value={cpf}
                            style={styles.txt_input}
                            placeholder="CPF"
                            placeholderTextColor="#ccc"
                            autoCapitalize="none"
                            returnKeyType="next"
                            blurOnSubmit={false}
                            onChangeText={setCpf}
                        />

                        {!isValidCPF(cpf) && cpf.length > 0 ? <Text style={{ color: 'red', textAlign: 'left', marginLeft: '5%', marginTop: '3%' }}>CPF inválido</Text> : null}

                        <TextInputMask
                            type={'cel-phone'}
                            options={{
                                maskType: 'BRL',
                                withDDD: true,
                                dddMask: '(99) '
                            }}
                            value={telefone}
                            onChangeText={setTelefone}
                            style={styles.txt_input}
                            placeholder="Celular"
                        />

                        <TouchableOpacity onPress={() => verify_fields()} style={styles.button_register}>

                            <Text style={styles.txt_button}>Cadastrar</Text>

                        </TouchableOpacity>

                        <Text style={styles.txt_login}>Já possui cadastro?
                            <Text onPress={
                                () => navigation.navigate('login')} style={{ color: 'red' }}>  Faça login!</Text></Text>

                    </ScrollView>
                </View>
            </View>
        </View>


    )
}