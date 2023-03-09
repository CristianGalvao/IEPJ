import { StyleSheet, Dimensions } from "react-native";

const {height, width} = Dimensions.get("screen")

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white'
    },
    logo:{
        width: '40%',
        height: height / 6,
        marginLeft: '30%'
    },
    txt_info:{
        width:'80%',
        fontSize: 19,
        fontWeight: 'bold',
        marginTop: '10%',
        marginLeft: '10%'
    },
    txt_email:{
        color: 'grey',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: '10%',
        textAlign: 'left',
        marginLeft: '10%'
    },
    input:{
         marginTop: '5%',
         borderColor: 'black',
         borderWidth: 1,
         borderRadius: 5,
         height: height / 20,
         width: '80%',
         marginLeft: '10%',
         padding: 5
    },
    button:{
        width: '80%',
        height: height / 18,
        marginLeft: '10%',
        marginTop: '10%',
        backgroundColor: 'orange',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    txt_button:{
        fontWeight: 'bold',
        fontSize: 25
    }

})