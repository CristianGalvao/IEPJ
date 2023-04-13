import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    view_config: {
        width: '80%',
        marginTop: '15%',
        marginLeft: '10%',
        height: 'auto'
    },
    txt_title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22
    },

    my_data: {
        width: '100%',
        height: '15%',
        backgroundColor: 'white',
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 25,
        marginTop: '25%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },

    user_settings: {
        width: '100%',
        height: '15%',
        borderRadius: 25,
        marginTop: '10%',
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },

    txt_title_button:{
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
    }
})