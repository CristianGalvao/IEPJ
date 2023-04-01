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

import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from 'react-native-elements';


export default function ProfileScreen1() {

    const [name_user, setName_user] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');

    useEffect(
        () => {
            async function get_user_by_login() {
                const value = await AsyncStorage.getItem('data_user');
                let json = JSON.parse(value);
                await setImage(json.photo)
                setName_user(json.name)
                setEmail(json.email)
            }
            get_user_by_login();
        }, []);

    const addImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result)
    };

    useEffect(
        () => {
            if (image === 'undefined' || image === undefined || image === null) {
                setImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAfzeD80cGELjuFc9oC7i3KJG_cw6R-y-F3sH7WVm9uOxu8CQ_XGkqZVx0ctgI2N52Dn0&usqp=CAU')
            } else {
                console.log(image)
            }
        }, [image])

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

                            {/* Profile Name and Bio */}
                            <View style={styles.nameAndBioView}>
                                <Text style={styles.userFullName}>{name_user}</Text>
                                <Text style={styles.userBio}>{'Verique aqui seus dados'}</Text>
                            </View>

                            <View style={{ width: '90%', marginLeft: "5%", padding: 10, marginTop: '8%' }}>

                                <ScrollView>

                                <View style={styles.searchSection}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Nome"
                                        onChangeText={(searchString) => { this.setState({ searchString }) }}
                                        underlineColorAndroid="transparent"
                                        value={name_user}
                                    />
                                </View>

                                <View style={styles.searchSection}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Email"
                                        value={email}
                                        onChangeText={(searchString) => { this.setState({ searchString }) }}
                                        underlineColorAndroid="transparent"
                                    />
                                </View>

                                <View style={styles.searchSection}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Senha"
                                        onChangeText={(searchString) => { this.setState({ searchString }) }}
                                        underlineColorAndroid="transparent"
                                    />
                                </View>

                                <View style={styles.searchSection}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="CPF"
                                        onChangeText={(searchString) => { this.setState({ searchString }) }}
                                        underlineColorAndroid="transparent"
                                    />
                                </View>

                                <View style={styles.searchSection}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Telefone"
                                        onChangeText={(searchString) => { this.setState({ searchString }) }}
                                        underlineColorAndroid="transparent"
                                    />
                                </View>

                                
                                </ScrollView>

                            </View>

                        </View>
                    </View>
                </>
            </ScrollView>
        </View>
    );
}

