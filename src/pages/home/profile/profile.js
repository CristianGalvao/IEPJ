import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Alert,
    Image,
    Dimensions,
} from 'react-native';

import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';



export default function ProfileScreen1() {

    const [name_user, setName_user] = useState('');
    const [user_photo, setUser_photo] = useState('');
    const [image, setImage] = useState('');
    const [id_user, setId_user] = useState('');
    const [readResults,setReadResults] = useState('')

    useEffect(
        () => {
            async function get_user_by_login() {
                const value = await AsyncStorage.getItem('data_user');
                let json = JSON.parse(value);
                await setImage(json.photo)
                setName_user(json.name)
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

                        </View>
                    </View>
                </>
            </ScrollView>
        </View>
    );
}

