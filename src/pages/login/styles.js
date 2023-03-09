import React from "react";
import { Dimensions, StyleSheet } from "react-native";

const {width, height} = Dimensions.get('screen')

export default StyleSheet.create({
    container: {
        flex: 1,
      },
      titleText: {
        position: 'absolute',
        top: Dimensions.get('screen').height * 0.1,
        alignSelf: 'center',
        color: '#fff',
        fontSize: 60,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
      },
      bottomView: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 20,
        
      },
      loginText: {
        fontSize: 24,
        marginTop: 12,
        marginBottom: 4,
      },
      inputView: {
        height: 40,
        borderRadius: 10,
        backgroundColor: '#f1f3f6',
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      },
      inputIcon: {
         paddingHorizontal: 11, fontSize: 20 
      },
      input: {
        height: 40,
        flex: 1,
        fontSize: 16,
        color: '#333',
      },
      loginButton: {
        backgroundColor: 'black',
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 20,
      },
      loginButtonText: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 18,
      },
      registerText: {
        alignSelf: 'center',
        marginTop: 15,
        fontSize: 16,
        marginBottom: 50
      },
      fpText: {
        marginTop: 10,
        alignSelf: 'flex-end',
        fontSize: 16,
        color: 'red',
      },
      
      EntrarGoogle:{
        width: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '30%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10
      },

      buttonGoogle:{
        width: '45%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 5,
        padding: 5,
      }
});