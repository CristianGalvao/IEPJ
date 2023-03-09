import React, { useState } from "react";
import { View, Text, Button, TextInput } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import styles from "./style";

export default function Home({route }) {

    return (
        <View style={styles.container}>

            <Text>Bem-Vindo,  </Text>

            <View style={styles.events}>

                <View style={styles.iepj_events}>
                    <Text>NOVIDADE</Text>
                </View>

                <View style={styles.iepj_events}>
                    <Text>P2M</Text>
                </View>

                <View style={styles.iepj_events}>
                    <Text>Culto Celebração</Text>
                </View>

                <View style={styles.iepj_events}>
                    <Text>Oração</Text>
                </View>

            </View>
        </View>
    )
}