import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    coverImage: { height: 300, width: '100%' },
    profileContainer: {
      // height: 1000,
      backgroundColor: '#fff',
      marginTop: -100,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    profileImageView: { alignItems: 'center', marginTop: -50 },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 100,
      borderWidth: 3,
      borderColor: '#fff',
    },
    nameAndBioView: { alignItems: 'center', marginTop: 10 },
    userFullName: { fontFamily: 'SSBold', fontSize: 26 },
    userBio: {
      fontFamily: 'SSRegular',
      fontSize: 18,
      color: '#333',
      marginTop: 4,
    },
    countsView: { flexDirection: 'row', marginTop: 20 },
    countView: { flex: 1, alignItems: 'center' },
    countNum: { fontFamily: 'SSBold', fontSize: 20 },
    countText: { fontFamily: 'SSRegular', fontSize: 18, color: '#333' },
    interactButtonsView: {
      flexDirection: 'row',
      marginTop: 10,
      paddingHorizontal: 20,
    },
    interactButton: {
      flex: 1,
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: '#4b7bec',
      margin: 5,
      borderRadius: 4,
    },
    interactButtonText: {
      fontFamily: 'SSBold',
      color: '#fff',
      fontSize: 18,
      paddingVertical: 6,
    },
    profileContentButtonsView: {
      flexDirection: 'row',
      borderTopWidth: 2,
      borderTopColor: '#f1f3f6',
    },
    showContentButton: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomColor: '#000',
    },
    showContentButtonText: {
      fontFamily: 'SSRegular',
      fontSize: 18,
    },
})