import { StyleSheet, Dimensions } from "react-native";
const [height, width] = Dimensions.get("screen")

export default StyleSheet.create({
    container:{
        flex: 1,
    },
    view_img:{
        width: '100%',
        height: height /3,
        backgroundColor: 'red'
    },
    img_background:{
        width: '50%',
        height: '20%'
    }

})