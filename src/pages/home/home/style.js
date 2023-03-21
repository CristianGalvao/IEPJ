import { StyleSheet } from "react-native";


export default StyleSheet.create({
    container: {
        flex: 1,
    },
    view_img: {
        width: '100%',
        height: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomLeftRadius: 80,
        borderBottomRightRadius: 80,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.84,
        elevation: 5,
        backgroundColor: 'black'
    },
    img_background: {
        width: '50%',
        height: '50%',
        padding: 5,
    },

    block_cultos: {
        width: '95%',
        marginLeft: '2.5%',
        height: '20%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15
    },
    block_cultos2: {
        width: '95%',
        marginLeft: '2.5%',
        height: '20%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    view_culto: {
        width: '48%',
        height: '80%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.84,
        backgroundColor: 'black',
        elevation: 5,
    },
    txtButon:{
        fontSize: 15,
         marginLeft: 5 ,
         fontWeight: 'bold',
         color: 'white',
         marginTop: 15
    }

})