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


export default function ProfileScreen1() {

    const [name_user, setName_user] = useState('');
    const [email, setEmail] = useState('')
    const [image, setImage] = useState();
    const [password, setPassword] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState("");
    const [button_save, setButton_save] = useState(false);
    const [disable_field, setDisableField] = useState(false);
    const [login_by, setLoginBy] = useState();

    async function get_user_by_login() {

        const value = await AsyncStorage.getItem('data_user');
        let json = JSON.parse(value);
        setName_user(json.name)
        setEmail(json.email)
        setPassword(json.password)
        setCpf(json.cpf);
        setTelefone(json.whatssap);
        setLoginBy(json.login_by)
    }

    async function get_photo_profile() {

        get_user_by_login()

        let response = await fetch(`${BASE_URL}/user/get_url_photo/${email}`)
            .then(res => res.json())
            .then(
                res => {
                    setImage(res.photo)
                })
    }

    useEffect(
        () => {
            get_user_by_login();
            get_photo_profile();
        }
    )


    function show_button_save() {
        setButton_save(!button_save)
        setDisableField(!disable_field)
    }


    async function update_photo(image) {

        get_user_by_login()

        await fetch(`${BASE_URL}/user/update_photo`, {
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
        fetch(`${BASE_URL}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstParam: 'yourValue',
                secondParam: 'yourOtherValue',
            }),
        });
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
                                <Text style={styles.userFullName}>{name_user}</Text>
                                <Text style={styles.userBio}>{'Verique aqui seus dados'}</Text>
                            </View>


                            <View style={{ width: '90%', marginLeft: "5%", padding: 10, marginTop: '8%' }}>

                                {/* BUTTON EDIT */}
                                <View style={{ width: '100%', alignItems: 'flex-end', display: 'flex', height: 'auto' }}>
                                    <Icon name='edit' color={'red'} size={30} style={{ textAlign: 'right' }} onPress={() => show_button_save()} />
                                </View>

                                <ScrollView>

                                    <View style={styles.searchSection}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Nome"
                                            // onChangeText={(searchString) => { this.setState({ searchString }) }}
                                            underlineColorAndroid="transparent"
                                            value={name_user}
                                            editable={disable_field}
                                        />
                                    </View>

                                    <View style={styles.searchSection}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Email"
                                            value={email}
                                            // onChangeText={(searchString) => { this.setState({ searchString }) }}
                                            underlineColorAndroid="transparent"
                                            editable={false}
                                        />
                                    </View>

                                   {disable_field == true && login_by == 'App' ?  <View style={styles.searchSection}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Nova senha"
                                            onChangeText={(searchString) => { this.setState({ searchString }) }}
                                            underlineColorAndroid="transparent"
                                            editable={disable_field}

                                        />
                                    </View> : null} 


                                    <View style={styles.searchSection}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="CPF"
                                            // onChangeText={(searchString) => { this.setState({ searchString }) }}
                                            underlineColorAndroid="transparent"
                                            editable={false}
                                            value={cpf}
                                        />
                                    </View>

                                    <View style={styles.searchSection}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Telefone"
                                            // onChangeText={(searchString) => { this.setState({ searchString }) }}
                                            underlineColorAndroid="transparent"
                                            editable={disable_field}
                                            value={telefone}
                                        />
                                    </View>

                                    {button_save == false ? null :

                                        <TouchableOpacity style={styles.btn_save}>

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

