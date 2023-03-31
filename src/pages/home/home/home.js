import React, { useEffect, useState } from "react";
import { View, Text, Image } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import styles from "./style";
import BackgroundImage from './logo_one_heart.png';
import AsyncStorage from '@react-native-async-storage/async-storage';


//Importando os icones
import { Entypo } from '@expo/vector-icons';

export default function Home({ route }) {

    const [name_user, setName_user] = useState('');

    useEffect(
        () => {
            async function get_user_by_login() {
                const value = await AsyncStorage.getItem('data_user');
                let json = JSON.parse(value);
                setName_user(json.name)
                return name_user

            }
            get_user_by_login();
        }, []);





    return (
        <View style={styles.container}>

            <View style={styles.view_img}>
                <Image source={BackgroundImage} style={styles.img_background} />
            </View>

            <Text style={{ textAlign: 'center', marginTop: 27, fontWeight: 'bold', fontSize: 18 }}>Bem-Vindo, <Text style={{ color: 'red' }}>{name_user}</Text></Text>
            <View style={styles.block_cultos}>

                <View style={styles.view_culto}>

                    <Entypo name="adjust" size={25} color={'yellow'} />
                    <Text style={styles.txtButon}>Culto de Celebração</Text>

                </View>

                <View style={styles.view_culto}>

                    <Entypo name="battery" size={29} color={'green'} />
                    <Text style={styles.txtButon}>P2M</Text>

                </View>
            </View>

            <View style={styles.block_cultos2}>

                <View style={styles.view_culto}>

                    <Entypo name="basecamp" size={30} color={'white'} />
                    <Text style={styles.txtButon}>Oração</Text>

                </View>

                <View style={styles.view_culto}>

                    <Entypo name="grid" size={35} color={'blue'} />
                    <Text style={styles.txtButon}>Células</Text>

                </View>
            </View>

        </View>
    )
}