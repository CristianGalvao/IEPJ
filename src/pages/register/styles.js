import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    view_register: {
        width: width / 1.1,
        height: height / 1.2,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 30,
        marginTop: height / 100
    },

    view_img_one_heart: {
        width: '100%',
        height: height / 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 50
    },

    img_one_heart: {
        width: '50%',
        height: height / 8
    },

    view_text_input: {
        width: '95%',
        height: height / 1,
        marginTop: 10,
    },

    first_input: {
        width: '100%',
        height: 20,
        padding: 2,
        borderRadius: 8,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    txt_input: {
        marginTop: 40,
        width: '100%',
        borderRadius: 8,
        padding: 2,
        height: 20,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },

    txt_login: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 50,
        marginTop: 40
    },
    button_register:{
        backgroundColor: 'red',
        width: '60%',
        height: height / 20,
        marginTop: 40,
        marginLeft: '20%',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt_button:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    }
})