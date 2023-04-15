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
        backgroundColor: 'black',
        borderColor: 'grey',
        borderWidth: 2,
        borderRadius: 25,
        marginTop: '25%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },

    user_settings: {
        width: '100%',
        borderColor: 'grey',
        borderWidth: 2,
        height: '15%',
        borderRadius: 25,
        marginTop: '10%',
        borderRadius: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'black'
    },

    txt_title_button:{
        color: 'white',
        fontSize: 16,
        width: '100%',
        marginLeft: 0,
        marginLeft: 20,
        fontWeight: 'bold',
    }
})