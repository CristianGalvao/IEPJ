import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    ScrollView,
    Alert,
    Image,
    TextInput,
} from 'react-native';
import { LogBox } from "react-native"

LogBox.ignoreAllLogs(true)

import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from 'react-native-elements';

import { BASE_URL } from '../../../config/config';
import { useQuery } from 'react-query';
import axios from 'axios';

import { TextInputMask } from "react-native-masked-text";

export default function ProfileScreen1({ navigation }) {

    axios.defaults.headers.common["Accept"] = "application/json";
    axios.defaults.headers.common["Content-Type"] = "application/json";

    const [name_user, setName_user] = useState('');
    const [email, setEmail] = useState('')
    const [image, setImage] = useState();
    const [password, setPassword] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState("");
    const [button_save, setButton_save] = useState(false);
    const [disable_field, setDisableField] = useState(false);
    const [login_by, setLoginBy] = useState();
    const [user_data, setUser_data] = useState([])


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

    async function get_user_by_login() {

        const value = await AsyncStorage.getItem('data_user');
        let json = JSON.parse(value);
        setEmail(json.email)
        setLoginBy(json.login_by)
    }

    async function get_photo_profile() {
        get_user_by_login()
        const { data } = await axios.get(`${BASE_URL}/user/get_url_photo/${email}`);
        setImage(data.photo)
        console.log(image)
        return image;

    }

    useEffect(
        () => {
            get_user_by_login();
            get_photo_profile();
            fetchPosts()
        }, [email]
    )

    const fetchPosts = async () => {
        get_user_by_login()
        const { data } = await axios.get(`${BASE_URL}/user/get_data_user/${email}`);
        setUser_data(data)
        console.log(user_data)
        setName_user(data.name)
        setTelefone(data.whatssap)
        setCpf(data.cpf)
        return user_data;
    };

    const usePosts = () => useQuery(`post`, fetchPosts);

    async function show_button_save() {
        setButton_save(!button_save)
        setDisableField(!disable_field)
    }


    async function update_photo(image) {

        get_user_by_login()

        const response = await fetch(`${BASE_URL}/user/update_photo`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                photo: image
            })
        });


    }


    const addImage = async () => {

        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            update_photo(result.uri)
        }
    };



    async function update_fields() {

        if (user_data.login_by == 'App') {
            let response = await fetch(`${BASE_URL}/user/update_fields/` + email, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    whatssap: telefone,
                    name: name_user,
                    password: password
                })
            });

            let json = await response.json();
            if (json == "updated_fields") {
                Alert.alert("Sucesso!", "Dados atualizados")
                navigation.navigate('config_screen')
            }
        } else {
            alert("Login Google, fazer o update")
        }
    }



    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <>
                    <View>
                        <Image
                            style={styles.coverImage}
                            source={{ uri: 'https://cdn.pixabay.com/photo/2012/11/20/10/16/cross-66700_1280.jpg' }}
                        />
                    </View>
                    <View style={styles.profileContainer}>
                        {/* Profile Details */}
                        <View>
                            {/* Profile Image */}
                            <View style={styles.profileImageView}>

                                <Image
                                    style={styles.profileImage}
                                    source={{
                                        uri: image,
                                    }}
                                />


                            </View>

                            <Icon name='edit' onPress={addImage} />

                            {/* Profile Name and Bio */}
                            <View style={styles.nameAndBioView}>
                                <Text style={styles.userFullName}>

                                    {user_data.name}

                                </Text>

                                <Text style={styles.userBio}>{'Verique aqui seus dados'}</Text>
                            </View>


                            <View style={{ width: '90%', marginLeft: "5%", padding: 10, marginTop: '8%' }}>

                                {/* BUTTON EDIT */}
                                <View style={{ width: '100%', alignItems: 'flex-end', display: 'flex', height: 'auto' }}>
                                    <Icon name='edit' color={'red'} size={30} style={{ textAlign: 'right' }} onPress={() => show_button_save()} />
                                </View>

                                <ScrollView>

                                    {disable_field == false ?

                                        <View style={styles.searchSection}>
                                            <TextInput
                                                style={styles.input}
                                                value={name_user}
                                                underlineColorAndroid="transparent"
                                                editable={disable_field}

                                            />
                                        </View> :

                                        <View style={styles.searchSection}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Altere seu nome"
                                                onChangeText={setName_user}
                                                underlineColorAndroid="transparent"
                                                editable={disable_field}

                                            />
                                        </View>

                                    }

                                    {disable_field == false ?
                                        <View style={styles.searchSection}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Email"
                                                value={email}
                                                onChangeText={setEmail}
                                                underlineColorAndroid="transparent"
                                                editable={false}
                                            />
                                        </View> : null}

                                    {disable_field == true && login_by == 'App' ? <View style={styles.searchSection}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Nova senha"
                                            onChangeText={setPassword}
                                            underlineColorAndroid="transparent"
                                            editable={disable_field}

                                        />
                                    </View> : null}


                                    {cpf == 'undefined' || cpf == undefined || cpf == '' || cpf == null ?
                                        <View style={styles.searchSection}>
                                            <TextInputMask
                                                type={'cpf'}
                                                value={cpf}
                                                style={styles.input}
                                                placeholder="Insira seu CPF"
                                                placeholderTextColor="#ccc"
                                                autoCapitalize="none"
                                                returnKeyType="next"
                                                blurOnSubmit={false}
                                                onChangeText={setCpf}
                                                editable={disable_field}
                                            />

                                        </View> :

                                        null

                                    }

                                    {disable_field == false && login_by == 'App' ?

                                        <View style={styles.searchSection}>
                                            <TextInputMask
                                                type={'cpf'}
                                                value={cpf}
                                                style={styles.input}
                                                editable={disable_field}
                                            />

                                        </View> :

                                        null

                                    }

                                    {telefone == 'undefined' || telefone == undefined || telefone == '' || telefone == null?

                                        <View style={styles.searchSection}>
                                            <TextInput
                                                style={styles.input}
                                                underlineColorAndroid="transparent"
                                                editable={disable_field}
                                                placeholder="Insira seu telefone"
                                                placeholderTextColor="#ccc"
                                            />
                                        </View>

                                        : null}

                                    {disable_field == false && login_by == 'Google'? 
                                    
                                    <View style={styles.searchSection}>
                                    <TextInput
                                        style={styles.input}
                                        underlineColorAndroid="transparent"
                                        editable={disable_field}
                                        value={telefone}
                                    />
                                </View>
                                    : <View style={styles.searchSection}>
                                    <TextInput
                                        style={styles.input}
                                        underlineColorAndroid="transparent"
                                        editable={disable_field}
                                        onChangeText={setTelefone}
                                        placeholder="Insira seu telefone"
                                        placeholderTextColor="#ccc"
                                    />
                                </View>
                                    }

                                    {button_save == false ? null :

                                        <TouchableOpacity style={styles.btn_save} onPress={() => update_fields()}>

                                            <Text style={styles.txt_btn_save}>Salvar</Text>

                                        </TouchableOpacity>

                                    }


                                </ScrollView>

                            </View>

                        </View>
                    </View>
                </>
            </ScrollView>
        </View>
    );
}

