import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { Entypo } from '@expo/vector-icons';


export default function Config_Screen() {
    return (
        <View style={styles.container}>

            <View style={styles.view_config}>

                <Text style={styles.txt_title}>Olá, qual serviço gostaria de utilizar?</Text>

                {/* MEUS DADOS */}
                <View style={styles.my_data}>

                    <Text style={styles.txt_title_button}> Meus Dados</Text>

                </View>

                {/* Termos */}
                <View style={styles.user_settings}>

                    <Text style={styles.txt_title_button}>Termos</Text>

                </View>

                {/* Botao Sobre nós */}
                <View style={styles.user_settings}>

                    <Text style={styles.txt_title_button}>Sobre nós</Text>

                </View>

                {/* Botao Sair */}
                <View style={styles.user_settings}>

                    <Entypo name="home" size={25} color={'black'}/>

                    <Text style={styles.txt_title_button}>Sair</Text>

                </View>

            </View>

        </View>
    )
}