import React, { useState } from "react";
import { View, Text, Button, Image } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import styles from "./style";
import BackgroundImage from './logo_one_heart.png';


export default function Home() {

    return (
        <View style={styles.container}>

                <View style={styles.view_img}>

                    <Image source={BackgroundImage} style={styles.img_background}/>

                </View>

        </View>
    )
}